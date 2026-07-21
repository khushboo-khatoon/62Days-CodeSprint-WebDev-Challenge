import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import mongoose from 'mongoose'; import path from 'path';
import authRoutes from './src/routes/auth.js'; import itemRoutes from './src/routes/items.js';
const app=express(); app.use(cors()); app.use(express.json()); app.use('/uploads', express.static(path.join(process.cwd(),'uploads')));
app.use('/api/auth',authRoutes); app.use('/api/items',itemRoutes);
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/campus_lost_found').then(()=>app.listen(process.env.PORT||5000,()=>console.log('Lost&Found API')));