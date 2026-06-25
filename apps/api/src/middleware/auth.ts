import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      clerkId: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { clerkId: decoded.clerkId },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      id: user.id,
      clerkId: user.clerkId,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
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