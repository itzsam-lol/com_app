import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all loyalty events for current user
router.get('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const events = await prisma.loyaltyEvent.findMany({ where: { userId: user.id } });
  res.json(events);
});

// Add loyalty points (demo)
router.post('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { eventType, points, description } = req.body;
  const event = await prisma.loyaltyEvent.create({
    data: { userId: user.id, eventType, points, description },
  });
  // Optionally update user points
  await prisma.user.update({ where: { id: user.id }, data: { loyaltyPoints: { increment: points } } });
  res.json(event);
});

// Get current loyalty points
router.get('/me/points', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ points: user.loyaltyPoints });
});

export default router; 