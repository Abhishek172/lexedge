import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Webhook } from 'svix';
import prisma from '../db/prisma';
import { requireAuth, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

const createUserSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  region: z.enum(['INDIA', 'INTERNATIONAL']).default('INDIA'),
  referralCode: z.string().optional(),
});

// Clerk webhook — create user on signup
router.post('/webhook', async (req: Request, res: Response) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(400).json({ error: 'Webhook secret not configured' });
  }

  const svixId = req.headers['svix-id'] as string;
  const svixTimestamp = req.headers['svix-timestamp'] as string;
  const svixSignature = req.headers['svix-signature'] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  try {
    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(JSON.stringify(req.body), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as { type: string; data: any };

    if (evt.type === 'user.created') {
      const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
          firstName: first_name || '',
          lastName: last_name || '',
          phone: phone_numbers?.[0]?.phone_number || null,
        },
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook verification failed' });
  }
});

// Create user manually
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.parse(req.body);

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
    if (error instanceof z.ZodError) {
      const message = error.issues.map(i => i.message).join(', ');
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get current user
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        _count: { select: { matters: true, referrals: true } },
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update profile
router.patch('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, company } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, phone, company },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get all users (admin)
router.get('/', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { _count: { select: { matters: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;