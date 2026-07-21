import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import http from 'http'; import mongoose from 'mongoose'; import {Server} from 'socket.io';
import authRoutes from './src/routes/auth.js'; import docsRoutes from './src/routes/docs.js';
const app=express(); app.use(cors()); app.use(express.json());
app.use('/api/auth',authRoutes); app.use('/api/docs',docsRoutes);
const server=http.createServer(app); const io=new Server(server,{cors:{origin:'*'}});
const rooms=new Map();
io.on('connection',(socket)=>{
  socket.on('join',({pageId,user})=>{
    socket.join(pageId); const list=rooms.get(pageId)||[]; list.push({id:socket.id,user,x:0,y:0}); rooms.set(pageId,list);
    io.to(pageId).emit('presence', list);
  });
  socket.on('cursor',({pageId,x,y,user})=>{ socket.to(pageId).emit('cursor',{id:socket.id,x,y,user}); });
  socket.on('content',({pageId,content,user})=>{ socket.to(pageId).emit('content',{content,user}); });
  socket.on('disconnect',()=>{ for(const [pageId,list] of rooms){ const next=list.filter(p=>p.id!==socket.id); rooms.set(pageId,next); io.to(pageId).emit('presence', next);} });
});
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/collab_docs').then(()=>server.listen(port,()=>console.log('Docs API',port)));