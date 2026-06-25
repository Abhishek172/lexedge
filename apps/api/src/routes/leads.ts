import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../db/prisma";
import { sendQuizResults } from "../services/email";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

const quizSchema = z.object({
  email: z.string().email(),
  score: z.number(),
  percentage: z.number(),
  answers: z.array(z.number()),
  recommendations: z.array(z.string()),
});

// Submit quiz
router.post("/quiz", async (req: Request, res: Response) => {
  try {
    const data = quizSchema.parse(req.body);

    const lead = await prisma.quizLead.upsert({
      where: { email: data.email },
      update: {
        score: data.score,
        percentage: data.percentage,
        answers: data.answers,
        recommendations: data.recommendations,
        followUpDay: 0,
        updatedAt: new Date(),
      },
      create: data,
    });

    // Send results email
    await sendQuizResults({
      email: data.email,
      score: data.percentage,
      recommendations: data.recommendations,
    });

    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return res.status(400).json({ error: error.issues });
    // }
    if (error instanceof z.ZodError) {
      const message = error.issues.map((i) => i.message).join(", ");
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: "Failed to save quiz lead" });
  }
});

// Get all leads (admin)
router.get(
  "/",
  requireAuth,
  requireAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const leads = await prisma.quizLead.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  },
);

export default router;
