import {Router} from 'express'; import jwt from 'jsonwebtoken'; import Service from '../models/Service.js'; import Log from '../models/Log.js'; import User from '../models/User.js'; import {auth} from '../middleware/auth.js';
const r=Router(); const hits=new Map();
r.use('/admin', auth);
r.get('/admin/services', async(req,res)=>res.json(await Service.find({user:req.user.id})));
r.post('/admin/services', async(req,res)=>res.status(201).json(await Service.create({user:req.user.id, name:req.body.name, basePath:req.body.basePath||('/svc/'+Date.now()), routes:req.body.routes||[]})));
r.put('/admin/services/:id', async(req,res)=>res.json(await Service.findOneAndUpdate({_id:req.params.id,user:req.user.id}, req.body, {new:true})));
r.get('/admin/logs', async(req,res)=>{
  const q={user:req.user.id}; if(req.query.status) q.status=Number(req.query.status);
  res.json(await Log.find(q).sort({at:-1}).limit(100));
});
r.all('/proxy/:serviceId/*', async(req,res)=>{
  const started=Date.now(); const svc=await Service.findById(req.params.serviceId); if(!svc) return res.status(404).json({message:'Unknown service'});
  const sub='/'+(req.params[0]||''); const route=svc.routes.find(rt=>rt.path===sub && rt.method.toUpperCase()===req.method.toUpperCase()) || svc.routes.find(rt=>rt.path==='*' );
  if(!route) return res.status(404).json({message:'No route'});
  let policy='allow';
  if(route.requireJwt){ try{ jwt.verify((req.headers.authorization||'').replace('Bearer ',''), process.env.JWT_SECRET||'dev-secret'); policy='jwt-ok'; }catch{ await Log.create({user:svc.user,service:svc.name,path:sub,method:req.method,status:401,policy:'jwt-fail',ms:Date.now()-started}); return res.status(401).json({message:'JWT required'}); } }
  if(route.requireApiKey){ const user=await User.findById(svc.user); if(req.headers['x-api-key']!==user.apiKey){ await Log.create({user:svc.user,service:svc.name,path:sub,method:req.method,status:401,policy:'apikey-fail',ms:Date.now()-started}); return res.status(401).json({message:'API key required'}); } policy='apikey-ok'; }
  if(route.rateLimit>0){ const key=svc._id+sub+(req.ip||''); const arr=(hits.get(key)||[]).filter(t=>Date.now()-t<60000); if(arr.length>=route.rateLimit){ await Log.create({user:svc.user,service:svc.name,path:sub,method:req.method,status:429,policy:'rate-limit',ms:Date.now()-started}); return res.status(429).json({message:'Rate limited'}); } arr.push(Date.now()); hits.set(key,arr); }
  if(route.latencyMs) await new Promise(r=>setTimeout(r, route.latencyMs));
  const status=route.mockStatus||200; await Log.create({user:svc.user,service:svc.name,path:sub,method:req.method,status,policy,ms:Date.now()-started});
  res.status(status).json(route.mockBody||{ok:true, service:svc.name, path:sub});
});
export default r;