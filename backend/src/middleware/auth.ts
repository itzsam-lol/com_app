import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include 'user' property
// (declaration merging)
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

admin.initializeApp({
  credential: admin.credential.cert(require('../../serviceAccountKey.json')),
});

export async function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split(' ')[1];
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      req.user = decoded;
      next();
      return;
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  return res.status(401).json({ error: 'No token provided' });
}