import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ── Security middleware ──
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Rate limiting ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Routes ──
import bookingsRouter from './routes/bookings';
import mattersRouter from './routes/matters';
import paymentsRouter from './routes/payments';
import usersRouter from './routes/users';
import documentsRouter from './routes/documents';
import leadsRouter from './routes/leads';

app.use('/api/bookings', bookingsRouter);
app.use('/api/matters', mattersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/leads', leadsRouter);

// ── Health check ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ──
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`LexEdge API running on port ${PORT}`);
});

export default app;