import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get current user profile
router.get('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  let user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) {
    // Create user if not exists
    user = await prisma.user.create({
      data: {
        firebaseUid,
        email: req.user.email,
        displayName: req.user.name || req.user.email,
      },
    });
  }
  res.json(user);
});

// Update user plan (after payment)
router.put('/me/plan', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const { plan } = req.body;
  if (!['STARTER', 'PREMIUM', 'ENTERPRISE'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan' });
  }
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if ((user.plan === 'PREMIUM' || user.plan === 'ENTERPRISE') && plan === 'STARTER') {
    return res.status(403).json({ error: 'Downgrade to Starter is not allowed for active Premium/Enterprise users.' });
  }
  const updatedUser = await prisma.user.update({
    where: { firebaseUid },
    data: { plan },
  });
  res.json(updatedUser);
});

// Update current user profile
router.put('/me', firebaseAuth, async (req, res) => {
  const firebaseUid = req.user.uid;
  const { displayName, phone, age, gender, address, emergencyContact } = req.body;
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const updatedUser = await prisma.user.update({
    where: { firebaseUid },
    data: {
      displayName,
      phone,
      age,
      gender,
      address,
      emergencyContact,
    },
  });
  res.json(updatedUser);
});

export default router;