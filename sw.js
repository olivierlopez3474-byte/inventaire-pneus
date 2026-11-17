// Réseau d'abord (les mises à jour arrivent tout de suite), cache en secours hors-ligne.
// Les logos (stockage public Supabase) sont aussi mis en cache pour l'affichage hors-ligne.
const C='inv-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(u.hostname.endsWith('supabase.co') && !u.pathname.includes('/storage/v1/object/public/')) return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
