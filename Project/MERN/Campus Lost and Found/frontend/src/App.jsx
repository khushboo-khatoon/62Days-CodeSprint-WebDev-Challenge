import {useEffect,useState} from 'react'; import api from './api.js'
export default function App(){
  const [token,setToken]=useState(localStorage.getItem('token')); const [form,setForm]=useState({name:'',email:'',password:''});
  const [items,setItems]=useState([]); const [title,setTitle]=useState(''); const [type,setType]=useState('lost'); const [tags,setTags]=useState(''); const [matches,setMatches]=useState([]);
  const load=async()=>setItems((await api.get('/items')).data);
  useEffect(()=>{load()},[]);
  useEffect(()=>{
    if(!window.L){ const link=document.createElement('link'); link.rel='stylesheet'; link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
      const s=document.createElement('script'); s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload=drawMap; document.body.appendChild(s);} else drawMap();
  },[items]);
  function drawMap(){ const el=document.getElementById('map'); if(!el||!window.L) return; el.innerHTML=''; const map=L.map(el).setView([28.61,77.21],12); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM'}).addTo(map);
    items.filter(i=>i.lat&&i.lng).forEach(i=>L.marker([i.lat,i.lng]).addTo(map).bindPopup(i.title)); }
  return <div className="wrap"><h1>Campus Lost & Found</h1>
    {!token && <div className="card row"><input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/><input type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={async()=>{const {data}=await api.post('/auth/register',form); localStorage.setItem('token',data.token); setToken(data.token)}}>Register</button>
      <button onClick={async()=>{const {data}=await api.post('/auth/login',form); localStorage.setItem('token',data.token); setToken(data.token)}}>Login</button></div>}
    {token && <div className="card row"><select value={type} onChange={e=>setType(e.target.value)}><option>lost</option><option>found</option></select>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags,comma"/>
      <button onClick={async()=>{await api.post('/items',{type,title,tags,lat:28.61,lng:77.21,colorHint:'blue'}); load()}}>Post pin</button></div>}
    <div className="card"><div id="map"/></div>
    <div className="card">{items.map(i=><div key={i._id} className="row" style={{justifyContent:'space-between'}}><div><strong>{i.type}</strong> {i.title} <span className="muted">{(i.tags||[]).join(', ')}</span></div>
      <button onClick={async()=>setMatches((await api.get('/items/'+i._id+'/matches')).data)}>Match score</button>
      <button onClick={async()=>{await api.post('/items/'+i._id+'/claims',{note:'I think this is mine'}); alert('Claim filed')}}>Claim</button></div>)}
    </div>
    {!!matches.length && <div className="card"><h3>Image/tag match helper</h3>{matches.map(m=><div key={m.item._id} className="muted">{m.item.title} — score {(m.score*100).toFixed(0)}%</div>)}</div>}
  </div>
}