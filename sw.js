const CACHE_NAME = 'sonajahi-cache-v18';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './words.json',
  './words_manifest.json',
  './words_algaja_1.json',
  './words_algaja_2.json',
  './words_algaja_3.json',
  './words_algaja_4.json',
  './words_algaja_5.json',
  './words_algaja_6.json',
  './words_algaja_7.json',
  './words_edasijoudnu_1.json',
  './words_edasijoudnu_2.json',
  './words_edasijoudnu_3.json',
  './words_edasijoudnu_4.json',
  './words_ekspert_1.json',
  './words_ekspert_2.json',
  './words_ekspert_3.json'
];
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Network-first for HTML navigations to avoid stale index.html
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept')||'').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for other GETs with background update
  e.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
