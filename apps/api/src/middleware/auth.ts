import { Request, Response, NextFunction } from 'express';
import { createClerkClient, verifyToken } from '@clerk/backend';
import prisma from '../db/prisma';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export interface AuthRequest extends Request {
  user?: {
    id: string;
    clerkId: string;
    role: string;
    email: string;
  };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    if (!payload?.sub) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: payload.sub },
    });

    if (!user) {
      const clerkUser = await clerk.users.getUser(payload.sub);
      user = await prisma.user.create({
        data: {
          clerkId: payload.sub,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
        },
      });
    }

    req.user = {
      id: user.id,
      clerkId: user.clerkId,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const requireLawyer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!['ADMIN', 'LAWYER'].includes(req.user?.role || '')) {
    return res.status(403).json({ error: 'Lawyer access required' });
  }
  next();
};