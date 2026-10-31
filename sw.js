const CACHE_NAME = 'baqarah-pwa-v1';
const assetsToCache = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
