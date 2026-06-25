import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../db/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { sendPaymentConfirmation } from '../services/email';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Create Razorpay order
router.post('/create-order', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { matterId, amount, currency = 'INR' } = req.body;

    const matter = await prisma.matter.findUnique({
      where: { id: matterId },
      include: { client: true },
    });

    if (!matter) return res.status(404).json({ error: 'Matter not found' });

    const gstAmount = Math.round(amount * 0.18);
    const totalAmount = amount + gstAmount;

    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency,
      receipt: `LEX-${matterId.slice(0, 8)}`,
      notes: {
        matterId,
        clientEmail: matter.client.email,
      },
    });

    const payment = await prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount: totalAmount,
        currency,
        gstAmount,
        matterId,
        userId: req.user!.id,
        description: `Payment for ${matter.title}`,
      },
    });

    res.json({
      orderId: order.id,
      amount: totalAmount,
      currency,
      paymentId: payment.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Payment order error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment webhook
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured') {
      const { order_id, id: paymentId } = payload.payment.entity;

      const payment = await prisma.payment.update({
        where: { razorpayOrderId: order_id },
        data: {
          razorpayPaymentId: paymentId,
          status: 'PAID',
        },
        include: {
          user: true,
          matter: true,
        },
      });

      // Send confirmation
      await sendPaymentConfirmation({
        email: payment.user.email,
        firstName: payment.user.firstName,
        amount: payment.amount,
        currency: payment.currency,
        matterId: payment.matterId,
        matterTitle: payment.matter.title,
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get payment history
router.get('/my', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user!.id },
      include: { matter: { select: { title: true, service: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

export default router;