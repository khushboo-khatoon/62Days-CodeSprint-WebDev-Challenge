import {useEffect,useState} from 'react'; import api from './api.js'
export default function App(){
  const [token,setToken]=useState(localStorage.getItem('token')); const [apiKey,setApiKey]=useState(localStorage.getItem('apiKey')||'');
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [services,setServices]=useState([]); const [logs,setLogs]=useState([]); const [name,setName]=useState('orders-svc');
  const load=async()=>{ setServices((await api.get('/gateway/admin/services')).data); setLogs((await api.get('/gateway/admin/logs')).data); };
  useEffect(()=>{if(token)load()},[token]);
  if(!token) return <div className="wrap"><h1>API Gateway Playground</h1><div className="card row">
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
    <button onClick={async()=>{const {data}=await api.post('/auth/register',{email,password}); localStorage.setItem('token',data.token); localStorage.setItem('apiKey',data.apiKey); setToken(data.token); setApiKey(data.apiKey)}}>Register</button>
    <button onClick={async()=>{const {data}=await api.post('/auth/login',{email,password}); localStorage.setItem('token',data.token); localStorage.setItem('apiKey',data.apiKey); setToken(data.token); setApiKey(data.apiKey)}}>Login</button></div></div>
  return <div className="wrap"><h1>Gateway Console</h1><p className="muted">API key: {apiKey}</p>
    <div className="card row"><input value={name} onChange={e=>setName(e.target.value)}/>
      <button onClick={async()=>{await api.post('/gateway/admin/services',{name, routes:[{path:'/health',method:'GET',mockBody:{status:'up'},latencyMs:200,requireApiKey:true,rateLimit:10},{path:'/secure',method:'GET',mockBody:{secret:true},requireJwt:true}]}); load()}}>Create demo service</button>
      <button onClick={load}>Refresh</button></div>
    {services.map(s=><div className="card" key={s._id}><strong>{s.name}</strong> <span className="muted">{s._id}</span>
      <div className="row"><button onClick={async()=>{const {data}=await api.get('/gateway/proxy/'+s._id+'/health',{headers:{'x-api-key':apiKey}}); alert(JSON.stringify(data))}}>Hit /health (API key)</button>
      <button onClick={async()=>{try{const {data}=await api.get('/gateway/proxy/'+s._id+'/secure'); alert(JSON.stringify(data))}catch(e){alert(e.response?.data?.message)}}}>Hit /secure (JWT)</button></div></div>)}
    <div className="card"><h3>Request logs</h3>{logs.map(l=><div key={l._id} className="muted">{l.at} {l.method} {l.path} → {l.status} [{l.policy}] {l.ms}ms</div>)}</div>
  </div>
}