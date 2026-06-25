import { Router, Response } from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { requireAuth, AuthRequest } from '../middleware/auth';
import prisma from '../db/prisma';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;

// Get presigned upload URL
router.post('/upload-url', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { matterId, fileName, mimeType, sizeBytes } = req.body;

    const matter = await prisma.matter.findUnique({ where: { id: matterId as string } });
    if (!matter) return res.status(404).json({ error: 'Matter not found' });
    if (req.user?.role === 'CLIENT' && matter.clientId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const s3Key = `matters/${matterId}/${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      ContentType: mimeType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 600 });

    const document = await prisma.document.create({
      data: {
        name: fileName,
        s3Key,
        s3Bucket: BUCKET,
        mimeType,
        sizeBytes,
        matterId,
        uploadedBy: req.user!.id,
        isClientDoc: req.user?.role === 'CLIENT',
      },
    });

    res.json({ uploadUrl, documentId: document.id, s3Key });
  } catch (error) {
    console.error('Upload URL error:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Get presigned download URL
router.get('/:documentId/download', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const documentId = req.params.documentId as string;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { matter: true },
    });

    if (!document) return res.status(404).json({ error: 'Document not found' });

    if (req.user?.role === 'CLIENT' && document.matter.clientId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const command = new GetObjectCommand({
      Bucket: document.s3Bucket,
      Key: document.s3Key,
    });

    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    res.json({ downloadUrl, fileName: document.name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

// Get all documents for a matter
router.get('/matter/:matterId', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const matterId = req.params.matterId as string;

    const matter = await prisma.matter.findUnique({ where: { id: matterId } });
    if (!matter) return res.status(404).json({ error: 'Matter not found' });
    if (req.user?.role === 'CLIENT' && matter.clientId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const documents = await prisma.document.findMany({
      where: {
        matterId,
        ...(req.user?.role === 'CLIENT' ? { isClientDoc: true } : {}),
      },
      include: {
        uploader: { select: { firstName: true, lastName: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

export default router;