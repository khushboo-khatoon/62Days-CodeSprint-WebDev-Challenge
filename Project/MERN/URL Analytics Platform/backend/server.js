import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import linksRoutes, { redirectHandler, apiCreate } from './src/routes/links.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.post('/api/v1/links', apiCreate);
app.get('/r/:slug', redirectHandler);
app.get('/api/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/url_analytics')
  .then(() => app.listen(port, () => console.log('URL Analytics API on', port)))
  .catch((e) => { console.error(e); process.exit(1); });
