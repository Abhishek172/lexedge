import { Router, Response } from "express";
import { z } from "zod";
import prisma from "../db/prisma";
import { requireAuth, requireLawyer, AuthRequest } from "../middleware/auth";
import { sendMatterUpdate } from "../services/email";

const router = Router();

const createMatterSchema = z.object({
  clientId: z.string(),
  title: z.string().min(1),
  service: z.string(),
  description: z.string().optional(),
  fee: z.number().positive(),
  slaHours: z.number().default(48),
  dueDate: z.string().optional(),
  lawyerId: z.string().optional(),
  region: z.enum(['INDIA', 'INTERNATIONAL']).default('INDIA'),
  internalNotes: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum([
    "RECEIVED",
    "IN_REVIEW",
    "DRAFT_READY",
    "REVISIONS",
    "FINAL_DELIVERED",
    "CLOSED",
  ]),
  note: z.string().optional(),
});

// Get all matters (admin/lawyer)
router.get(
  "/",
  requireAuth,
  requireLawyer,
  async (req: AuthRequest, res: Response) => {
    try {
      const matters = await prisma.matter.findMany({
        include: {
          client: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              company: true,
            },
          },
          lawyer: { select: { firstName: true, lastName: true } },
          payments: true,
          _count: { select: { documents: true, messages: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      res.json(matters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch matters" });
    }
  },
);

// Get client's own matters
router.get("/my", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const matters = await prisma.matter.findMany({
      where: { clientId: req.user!.id },
      include: {
        lawyer: { select: { firstName: true, lastName: true } },
        payments: true,
        documents: {
          select: { id: true, name: true, createdAt: true, isClientDoc: true },
        },
        _count: { select: { messages: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(matters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matters" });
  }
});

// Get single matter
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const matter = await prisma.matter.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            company: true,
            phone: true,
          },
        },
        lawyer: { select: { firstName: true, lastName: true, email: true } },
        payments: true,
        documents: true,
        messages: {
          include: {
            sender: { select: { firstName: true, lastName: true, role: true } },
          },
          where: req.user?.role === "CLIENT" ? { isInternal: false } : {},
          orderBy: { createdAt: "asc" },
        },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!matter) return res.status(404).json({ error: "Matter not found" });

    if (req.user?.role === "CLIENT" && matter.clientId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(matter);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matter" });
  }
});

// Create matter (admin only)
router.post(
  "/",
  requireAuth,
  requireLawyer,
  async (req: AuthRequest, res: Response) => {
    try {
      const data = createMatterSchema.parse(req.body);

      const matter = await prisma.matter.create({
        data: {
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
          statusHistory: {
            create: { status: "RECEIVED", note: "Matter created" },
          },
        },
        include: { client: true },
      });

      await sendMatterUpdate({
        email: matter.client.email,
        firstName: matter.client.firstName,
        matterId: matter.id,
        title: matter.title,
        status: "RECEIVED",
      });

      res.status(201).json(matter);
    } catch (error) {
      // if (error instanceof z.ZodError) {
      //   return res.status(400).json({ error: error.issues });
      // }
      if (error instanceof z.ZodError) {
        const message = error.issues.map((i) => i.message).join(", ");
        return res.status(400).json({ error: message });
      }
      res.status(500).json({ error: "Failed to create matter" });
    }
  },
);

// Update matter status
router.patch(
  "/:id/status",
  requireAuth,
  requireLawyer,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const { status, note } = updateStatusSchema.parse(req.body);

      const matter = await prisma.matter.update({
        where: { id },
        data: {
          status,
          statusHistory: {
            create: { status, note },
          },
        },
        include: { client: true },
      });

      await sendMatterUpdate({
        email: matter.client.email,
        firstName: matter.client.firstName,
        matterId: matter.id,
        title: matter.title,
        status,
      });

      res.json(matter);
    } catch (error) {
      // if (error instanceof z.ZodError) {
      //   return res.status(400).json({ error: error.issues });
      // }
      if (error instanceof z.ZodError) {
        const message = error.issues.map((i) => i.message).join(", ");
        return res.status(400).json({ error: message });
      }
      res.status(500).json({ error: "Failed to update status" });
    }
  },
);

// Update internal notes
router.patch(
  "/:id/notes",
  requireAuth,
  requireLawyer,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const { notes } = req.body;
      const matter = await prisma.matter.update({
        where: { id },
        data: { internalNotes: notes },
      });
      res.json(matter);
    } catch (error) {
      res.status(500).json({ error: "Failed to update notes" });
    }
  },
);

// Send message on matter
router.post(
  "/:id/messages",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const { content, isInternal = false } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "Message content required" });
      }

      // Clients cannot send internal messages
      if (req.user?.role === "CLIENT" && isInternal) {
        return res.status(403).json({ error: "Access denied" });
      }

      const message = await prisma.message.create({
        data: {
          content,
          isInternal,
          matterId: id,
          senderId: req.user!.id,
        },
        include: {
          sender: { select: { firstName: true, lastName: true, role: true } },
        },
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  },
);

export default router;
