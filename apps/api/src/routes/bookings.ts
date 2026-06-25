import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../db/prisma";
import { sendBookingConfirmation } from "../services/email";

const router = Router();

const bookingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  service: z.string().optional(),
  consultType: z.string(),
  message: z.string().optional(),
  region: z.enum(["INDIA", "INTERNATIONAL"]).default("INDIA"),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = bookingSchema.parse(req.body);

    const booking = await prisma.booking.create({ data });

    // Send confirmation email
    await sendBookingConfirmation({
      email: data.email,
      firstName: data.firstName,
      consultType: data.consultType,
    });

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      message: "Booking received. Confirmation sent to your email.",
    });
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return res.status(400).json({ error: error.issues });
    // }
    if (error instanceof z.ZodError) {
      const message = error.issues.map((i) => i.message).join(", ");
      return res.status(400).json({ error: message });
    }
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
