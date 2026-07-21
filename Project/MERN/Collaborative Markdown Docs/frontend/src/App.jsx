import {useEffect,useState,useRef} from 'react'; import {io} from 'socket.io-client'; import api from './api.js'
export default function App(){
  const [token,setToken]=useState(localStorage.getItem('token')); const [form,setForm]=useState({name:'',email:'',password:''});
  const [workspaces,setWs]=useState([]); const [pages,setPages]=useState([]); const [wsId,setWsId]=useState(''); const [page,setPage]=useState(null);
  const [presence,setPresence]=useState([]); const socket=useRef(null);
  useEffect(()=>{ if(!token) return; api.get('/docs/workspaces').then(r=>setWs(r.data)); },[token]);
  useEffect(()=>{ if(!page) return; socket.current?.disconnect(); socket.current=io('/',{path:'/socket.io'}); 
    socket.current.emit('join',{pageId:page._id,user:form.email||'user'});
    socket.current.on('presence',setPresence); socket.current.on('content',({content})=>setPage(p=>({...p,content})));
    return ()=>socket.current?.disconnect();
  },[page?._id]);
  if(!token) return <div className="main"><h1>Collaborative Markdown Docs</h1>
    <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
    <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
    <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
    <button onClick={async()=>{const {data}=await api.post('/auth/register',form); localStorage.setItem('token',data.token); setToken(data.token)}}>Register</button>
    <button onClick={async()=>{const {data}=await api.post('/auth/login',form); localStorage.setItem('token',data.token); setToken(data.token)}}>Login</button></div>
  return <div className="wrap"><aside className="side"><h3>Workspaces</h3>
    <button onClick={async()=>{await api.post('/docs/workspaces',{name:'New space'}); setWs((await api.get('/docs/workspaces')).data)}}>+ Workspace</button>
    {workspaces.map(w=><div key={w._id}><button onClick={async()=>{setWsId(w._id); setPages((await api.get('/docs/workspaces/'+w._id+'/pages')).data)}}>{w.name}</button></div>)}
    <h3>Pages</h3>
    <button disabled={!wsId} onClick={async()=>{await api.post('/docs/workspaces/'+wsId+'/pages',{title:'Untitled'}); setPages((await api.get('/docs/workspaces/'+wsId+'/pages')).data)}}>+ Page</button>
    {pages.map(p=><div key={p._id}><button onClick={async()=>setPage((await api.get('/docs/pages/'+p._id)).data)}>{p.title}</button></div>)}
  </aside><main className="main">{page ? <>
    <div className="muted">Online: {presence.map(p=>p.user).join(', ')||'just you'}</div>
    <input value={page.title} onChange={e=>setPage({...page,title:e.target.value})} onBlur={async()=>api.put('/docs/pages/'+page._id,{title:page.title})}/>
    <button onClick={async()=>{const {data}=await api.post('/docs/pages/'+page._id+'/share',{role:'edit'}); alert('Share id: '+data.shareId)}}>Share</button>
    <button onClick={async()=>{const {data}=await api.get('/docs/pages/'+page._id+'/versions'); alert(data.length+' versions')}}>History</button>
    <textarea value={page.content} onChange={e=>{ const content=e.target.value; setPage({...page,content}); socket.current?.emit('content',{pageId:page._id,content,user:form.email}); }}
      onBlur={async()=>api.put('/docs/pages/'+page._id,{content:page.content})}/>
  </> : <p className="muted">Select or create a page</p>}</main></div>
}