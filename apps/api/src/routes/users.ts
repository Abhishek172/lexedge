import { Router, Response } from "express";
import { z } from "zod";
import prisma from "../db/prisma";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

const createUserSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  region: z.enum(["INDIA", "INTERNATIONAL"]).default("INDIA"),
  referralCode: z.string().optional(),
});

// Create user (called after Clerk signup)
router.post("/", async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);

    // Check referral
    let referredBy: string | undefined;
    if (data.referralCode) {
      const referrer = await prisma.user.findFirst({
        where: { referralCode: data.referralCode },
      });
      if (referrer) referredBy = referrer.id;
    }

    const user = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        company: data.company,
        region: data.region,
        referredBy,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return res.status(400).json({ error: error.issues });
    // }
    if (error instanceof z.ZodError) {
      const message = error.issues.map((i) => i.message).join(", ");
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get current user profile
router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        _count: { select: { matters: true, referrals: true } },
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Update profile
router.patch("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, company } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, phone, company },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get all users (admin only)
router.get(
  "/",
  requireAuth,
  requireAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          _count: { select: { matters: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },
);

export default router;
