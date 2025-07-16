import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get current user's medical profile
router.get('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid }, include: { medicalProfile: true } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.medicalProfile);
});

// Update or create current user's medical profile
router.put('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { allergies, conditions, medications, history } = req.body;
  let profile = await prisma.medicalProfile.upsert({
    where: { userId: user.id },
    update: { allergies, conditions, medications, history },
    create: { userId: user.id, allergies, conditions, medications, history },
  });
  res.json(profile);
});

export default router; 