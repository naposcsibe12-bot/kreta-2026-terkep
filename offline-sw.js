const CACHE='kreta2026-offline-v4';
const STATIC_ASSETS=[
  './offline.html',
  './offline-manifest.webmanifest',
  './offline-assets/maplibre-gl.css',
  './offline-assets/maplibre-gl.js',
  './offline-assets/pmtiles.js',
  './offline-assets/osm-package.json'
];
const PMTILES_URL='./offline-assets/crete.pmtiles';
let pmtilesBufferPromise=null;

async function getPMTilesBuffer(){
  if(!pmtilesBufferPromise){
    pmtilesBufferPromise=(async()=>{
      const cache=await caches.open(CACHE);
      const cached=await cache.match(PMTILES_URL);
      if(cached){
        return await cached.arrayBuffer();
      }
      const r=await fetch(PMTILES_URL,{cache:'no-store'});
      if(!r.ok)throw new Error('PMTiles letöltési hiba: '+r.status);
      const clone=r.clone();
      await cache.put(PMTILES_URL,clone);
      return await r.arrayBuffer();
    })();
  }
  return pmtilesBufferPromise;
}

function parseRange(value,total){
  const m=/bytes=(\d+)-(\d*)/.exec(value||'');
  if(!m)return null;
  const start=Number(m[1]);
  let end=m[2]?Number(m[2]):total-1;
  if(!Number.isFinite(start)||start<0||start>=total)return null;
  if(!Number.isFinite(end)||end>=total)end=total-1;
  if(end<start)return null;
  return {start,end};
}

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(STATIC_ASSETS);
    const r=await fetch(PMTILES_URL,{cache:'no-store'});
    if(!r.ok)throw new Error('PMTiles letöltési hiba: '+r.status);
    await cache.put(PMTILES_URL,r);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.pathname.endsWith('/offline-assets/crete.pmtiles')){
    const range=request.headers.get('Range');
    if(range){
      event.respondWith((async()=>{
        try{
          const buffer=await getPMTilesBuffer();
          const parsed=parseRange(range,buffer.byteLength);
          if(!parsed)return fetch(request);
          const body=buffer.slice(parsed.start,parsed.end+1);
          return new Response(body,{
            status:206,
            statusText:'Partial Content',
            headers:{
              'Content-Type':'application/octet-stream',
              'Content-Length':String(body.byteLength),
              'Content-Range':`bytes ${parsed.start}-${parsed.end}/${buffer.byteLength}`,
              'Accept-Ranges':'bytes'
            }
          });
        }catch(e){
          return fetch(request);
        }
      })());
      return;
    }
  }
  event.respondWith(
    caches.match(request).then(cached=>{
      if(cached)return cached;
      return fetch(request).then(response=>{
        if(response.ok){
          const clone=response.clone();
          caches.open(CACHE).then(c=>c.put(request,clone)).catch(()=>{});
        }
        return response;
      }).catch(()=>caches.match('./offline.html'))
    })
  );
});