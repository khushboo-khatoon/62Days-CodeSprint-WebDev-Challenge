import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import slotRoutes from './src/routes/slots.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interview_slots')
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Slots API')));
