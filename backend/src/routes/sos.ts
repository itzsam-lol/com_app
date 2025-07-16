import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all SOS events for current user
router.get('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const events = await prisma.sosEvent.findMany({ where: { userId: user.id } });
  res.json(events);
});

// Create new SOS event
router.post('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { type, location } = req.body;
  const event = await prisma.sosEvent.create({
    data: { userId: user.id, type, location },
  });
  res.json(event);
});

// Update SOS event status
router.put('/:id/status', firebaseAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const event = await prisma.sosEvent.update({
    where: { id },
    data: { status },
  });
  res.json(event);
});

export default router; 