const CACHE = "cocos-survey-v16-7990cd";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(u => fetch(u + "?b=" + CACHE, {cache: "reload"}).then(r => { if (!r.ok) throw new Error(u); return c.put(u, r); })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    e.respondWith(caches.match("./").then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put("./", cp)); return res; })));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => r)));
});
