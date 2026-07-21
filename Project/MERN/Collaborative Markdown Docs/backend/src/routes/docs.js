import {Router} from 'express'; import {nanoid} from 'nanoid'; import Workspace from '../models/Workspace.js'; import Page from '../models/Page.js'; import {auth} from '../middleware/auth.js';
const r=Router();
r.get('/share/:shareId', async(req,res)=>{ const page=await Page.findOne({shareId:req.params.shareId}); if(!page)return res.status(404).json({message:'Not found'}); res.json(page); });
r.use(auth);
r.get('/workspaces', async(req,res)=>res.json(await Workspace.find({$or:[{owner:req.user.id},{'members.user':req.user.id}]})));
r.post('/workspaces', async(req,res)=>res.status(201).json(await Workspace.create({name:req.body.name||'Workspace', owner:req.user.id})));
r.get('/workspaces/:id/pages', async(req,res)=>res.json(await Page.find({workspace:req.params.id}).select('title parentId updatedAt shareId shareRole')));
r.post('/workspaces/:id/pages', async(req,res)=>res.status(201).json(await Page.create({workspace:req.params.id, parentId:req.body.parentId||null, title:req.body.title||'Untitled', content:''})));
r.get('/pages/:id', async(req,res)=>res.json(await Page.findById(req.params.id)));
r.put('/pages/:id', async(req,res)=>{
  const page=await Page.findById(req.params.id); if(!page)return res.status(404).json({message:'Not found'});
  if(typeof req.body.content==='string'){ page.versions.push({content:page.content, by:req.user.email}); page.content=req.body.content; }
  if(req.body.title) page.title=req.body.title;
  await page.save(); res.json(page);
});
r.post('/pages/:id/share', async(req,res)=>{
  const page=await Page.findById(req.params.id); if(!page)return res.status(404).json({message:'Not found'});
  page.shareId=page.shareId||nanoid(10); page.shareRole=req.body.role||'view'; await page.save();
  res.json({shareId:page.shareId, shareRole:page.shareRole});
});
r.get('/pages/:id/versions', async(req,res)=>{ const page=await Page.findById(req.params.id); res.json(page?.versions||[]); });
export default r;