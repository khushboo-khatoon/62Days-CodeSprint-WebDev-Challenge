import {Router} from 'express'; import multer from 'multer'; import path from 'path'; import Item from '../models/Item.js'; import Claim from '../models/Claim.js'; import Message from '../models/Message.js'; import {auth, requireRole} from '../middleware/auth.js';
const upload=multer({dest: path.join(process.cwd(),'uploads')});
const r=Router();
function scoreMatch(a,b){ const ta=new Set([...(a.tags||[]), ...(a.title||'').toLowerCase().split(/\s+/)]); const tb=new Set([...(b.tags||[]), ...(b.title||'').toLowerCase().split(/\s+/)]); let inter=0; for(const t of ta) if(tb.has(t)) inter++; const union=new Set([...ta,...tb]).size||1; let score=inter/union; if(a.colorHint && a.colorHint===b.colorHint) score+=0.15; return Math.min(1, Number(score.toFixed(2))); }
r.get('/', async(req,res)=>{ const q={}; if(req.query.tag) q.tags=req.query.tag; if(req.query.type) q.type=req.query.type; if(req.query.q) q.title=new RegExp(req.query.q,'i'); res.json(await Item.find(q).sort({createdAt:-1})); });
r.post('/', auth, upload.single('image'), async(req,res)=>{
  const tags=String(req.body.tags||'').split(',').map(s=>s.trim()).filter(Boolean);
  const item=await Item.create({user:req.user.id, type:req.body.type, title:req.body.title, description:req.body.description, tags, image:req.file?.filename, lat:Number(req.body.lat)||0, lng:Number(req.body.lng)||0, colorHint:req.body.colorHint});
  res.status(201).json(item);
});
r.get('/:id/matches', auth, async(req,res)=>{
  const item=await Item.findById(req.params.id); if(!item) return res.status(404).json({message:'Not found'});
  const others=await Item.find({type: item.type==='lost'?'found':'lost', status:'open'});
  res.json(others.map(o=>({item:o, score:scoreMatch(item,o)})).sort((a,b)=>b.score-a.score).slice(0,10));
});
r.post('/:id/claims', auth, async(req,res)=>res.status(201).json(await Claim.create({item:req.params.id, claimant:req.user.id, note:req.body.note})));
r.post('/:id/messages', auth, async(req,res)=>res.status(201).json(await Message.create({item:req.params.id, from:req.user.id, to:req.body.to, body:req.body.body})));
r.get('/:id/messages', auth, async(req,res)=>res.json(await Message.find({item:req.params.id}).sort({createdAt:1})));
r.patch('/:id/moderate', auth, requireRole('admin'), async(req,res)=>res.json(await Item.findByIdAndUpdate(req.params.id,{moderated:true, status:req.body.status||'open'},{new:true})));
export default r;