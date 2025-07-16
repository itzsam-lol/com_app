import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../middleware/auth';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { stripe } from '../utils/stripe';

const router = Router();
const prisma = new PrismaClient();

// Get all payments for current user
router.get('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const payments = await prisma.payment.findMany({ where: { userId: user.id } });
  res.json(payments);
});

// Get payment history (sorted, latest first)
router.get('/me/history', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const payments = await prisma.payment.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  res.json(payments);
});

// Create a new payment (demo for Starter plan)
router.post('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { plan, amount, currency, periodStart, periodEnd } = req.body;
  const payment = await prisma.payment.create({
    data: { userId: user.id, plan, amount, currency, status: 'success', periodStart, periodEnd },
  });
  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan,
      planExpiry: new Date(periodEnd),
      lastPaymentId: payment.id,
    },
  });
  res.json(payment);
});

// Create Stripe Checkout Session
router.post('/stripe/checkout', firebaseAuth, async (req, res) => {
  const { plan, months } = req.body;
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // TODO: Replace with your real Stripe price IDs
  const priceIdMap: Record<string, string> = {
    premium: 'price_1Hxxxxxxx',     // <-- Replace with your real price ID
    enterprise: 'price_1Hyyyyyyy',  // <-- Replace with your real price ID
  };

  if (!priceIdMap[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIdMap[plan],
          quantity: months || 1,
        },
      ],
      mode: 'payment',
      customer_email: user.email,
      success_url: 'http://localhost:5173/subscribe?success=1',
      cancel_url: 'http://localhost:5173/subscribe?canceled=1',
      metadata: {
        userId: user.id,
        plan,
        months: months || 1,
      },
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Stripe session', details: err });
  }
});

// Stripe webhook for payment success
router.post('/stripe/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Update user plan/payment in DB
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;
    const months = Number(session.metadata?.months || 1);
    if (userId && plan) {
      const now = new Date();
      const periodEnd = new Date(now.getTime() + months * 30 * 24 * 60 * 60 * 1000);
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: plan.toUpperCase(),
          planExpiry: periodEnd,
          lastPaymentId: session.payment_intent as string,
        },
      });
      await prisma.payment.create({
        data: {
          userId,
          plan: plan.toUpperCase(),
          amount: session.amount_total! / 100,
          currency: session.currency!,
          status: 'success',
          periodStart: now,
          periodEnd,
        },
      });
    }
  }
  res.json({ received: true });
});

// Get current plan
router.get('/me/plan', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ plan: user.plan });
});

export default router; 