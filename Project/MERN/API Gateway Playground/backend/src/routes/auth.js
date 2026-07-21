import {Router} from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import {nanoid} from 'nanoid'; import User from '../models/User.js';
const r=Router();
r.post('/register',async(req,res)=>{const user=await User.create({email:req.body.email,password:await bcrypt.hash(req.body.password,10),apiKey:nanoid(20)});
res.json({token:jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET||'dev-secret',{expiresIn:'7d'}), apiKey:user.apiKey});});
r.post('/login',async(req,res)=>{const user=await User.findOne({email:req.body.email}); if(!user||!(await bcrypt.compare(req.body.password||'',user.password)))return res.status(400).json({message:'Invalid'});
res.json({token:jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET||'dev-secret',{expiresIn:'7d'}), apiKey:user.apiKey});});
export default r;