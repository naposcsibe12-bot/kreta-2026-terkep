const CACHE='kreta2026-offline-v2';
const ASSETS=['./offline.html','./offline-manifest.webmanifest','./offline-sw.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{
    const c=x.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return x;
  }).catch(()=>caches.match('./offline.html'))));
});