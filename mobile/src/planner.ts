import { POIS, baseForDay, haversineKm, type Poi, type Category } from './data';

export type Plan = Record<string,string[]>;
export type Preferences = { weather:'good'|'rain'|'wind'; drive:'low'|'medium'|'high'; duration:'short'|'half'|'full'; mode:'mixed'|'nature'|'culture'|'beach' };
const KEY='kreta2026plan';
const LOCK='kreta2026locks';
const defaultPrefs:Preferences={weather:'good',drive:'low',duration:'full',mode:'mixed'};

export function loadPlan():Plan { try { return JSON.parse(localStorage.getItem(KEY)||'{}') as Plan; } catch { return {}; } }
export function savePlan(plan:Plan){ localStorage.setItem(KEY,JSON.stringify(plan)); }
export function loadLocks():Record<string,string[]> { try{return JSON.parse(localStorage.getItem(LOCK)||'{}')}catch{return{}} }
export function toggleStop(day:number,id:string){ const l=loadLocks(),k=`D${day}`; l[k]=l[k]||[]; l[k]=l[k].includes(id)?l[k].filter(x=>x!==id):[...l[k],id]; localStorage.setItem(LOCK,JSON.stringify(l)); }

function score(p:Poi,day:number,prefs:Preferences,existing:string[]):number{
 const base=baseForDay(day); const d=haversineKm(base,p); let s=Math.max(0,80-d*1.15);
 if(p.day===day)s+=22; if(existing.includes(p.id))s-=100;
 const cat:p['cat']=p.cat;
 if(prefs.mode==='nature'&&['tura','strand','kilato','barlang'].includes(cat))s+=20;
 if(prefs.mode==='culture'&&['regeszet','varos','kultura'].includes(cat))s+=20;
 if(prefs.mode==='beach'&&cat==='strand')s+=25;
 if(prefs.weather==='rain'&&['regeszet','kultura','barlang','varos'].includes(cat))s+=18;
 if(prefs.weather==='wind'&&cat==='varos')s+=8;
 if(prefs.weather==='good'&&['strand','kilato'].includes(cat))s+=12;
 if(prefs.drive==='low')s-=d*0.45;
 if(prefs.drive==='high')s-=d*0.05;
 return s;
}

export function recommend(day:number,prefs:Preferences=defaultPrefs):Poi[]{ const plan=loadPlan(), existing=plan[`D${day}`]||[]; const selected: Poi[]=[]; const counts:Partial<Record<Category,number>>={}; const locks=loadLocks()[`D${day}`]||[];
 [...POIS].filter(p=>!existing.includes(p.id)).sort((a,b)=>score(b,day,prefs,existing)-score(a,day,prefs,existing)).forEach(p=>{ if(selected.length>=5)return; const c=counts[p.cat]||0; if(c>=2)return; selected.push(p); counts[p.cat]=c+1; }); return selected;
}

export function buildDay(day:number,prefs:Preferences=defaultPrefs):Poi[]{
 const plan=loadPlan(), existing=plan[`D${day}`]||[], locks=loadLocks()[`D${day}`]||[];
 const locked=POIS.filter(p=>locks.includes(p.id));
 const target=prefs.duration==='short'?2:prefs.duration==='half'?3:4;
 const candidates=POIS.filter(p=>!existing.includes(p.id)&&!locks.includes(p.id)).sort((a,b)=>score(b,day,prefs,existing)-score(a,day,prefs,existing));
 const out=[...locked]; const usedCats=new Set(out.map(p=>p.cat));
 for(const p of candidates){ if(out.length>=target)break; if(out.some(x=>x.id===p.id))continue; if(usedCats.has(p.cat)&&out.length<target-1)continue; out.push(p); usedCats.add(p.cat); }
 return out.slice(0,target);
}

export function applyDay(day:number,pois:Poi[]){ const plan=loadPlan(); plan[`D${day}`]=pois.map(p=>p.id); savePlan(plan); }
export function addToDay(day:number,id:string){ const plan=loadPlan(); const k=`D${day}`; plan[k]=plan[k]||[]; if(!plan[k].includes(id))plan[k].push(id); savePlan(plan); }
export function removeFromDay(day:number,id:string){ const plan=loadPlan(),k=`D${day}`; plan[k]=(plan[k]||[]).filter(x=>x!==id); savePlan(plan); }
export function dayPois(day:number):Poi[]{ const plan=loadPlan(); return (plan[`D${day}`]||[]).map(id=>POIS.find(p=>p.id===id)).filter(Boolean) as Poi[]; }
export function routeOrder(day:number):Poi[]{ const points=dayPois(day); const base=baseForDay(day); const locks=loadLocks()[`D${day}`]||[]; if(!points.length)return[]; const ordered:Poi[]=[]; let current=base; const remaining=points.filter(p=>!locks.includes(p.id)); while(remaining.length){ let best=0,bd=Infinity; remaining.forEach((p,i)=>{const d=haversineKm(current,p);if(d<bd){bd=d;best=i;}}); ordered.push(remaining.splice(best,1)[0]); current=ordered.at(-1)!; } return [...points.filter(p=>locks.includes(p.id)),...ordered]; }
export function googleUrl(day:number):string{ const base=baseForDay(day); const pts=routeOrder(day); const end=day===14?{lat:35.531,lon:24.150}:base; const q=[`${base.lat},${base.lon}`,...pts.map(p=>`${p.lat},${p.lon}`),`${end.lat},${end.lon}`].join('/'); return `https://www.google.com/maps/dir/${q}`; }
