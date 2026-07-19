self.addEventListener('install', event => {
  console.log('Service Worker install');
  self.skipWaiting(); // 立即進入 activate
});

self.addEventListener('activate', event => {
  console.log('Service Worker activate');
  event.waitUntil(clients.claim()); // 接管所有頁面
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const response = await fetch(event.request);
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          const cache = await caches.open(String(Date.now()));
          cache.put(event.request, clone);
        }
        return response;
      } catch {
        const fallback = await caches.match('./index.html');
        return fallback || new Response('Offline', { status: 503 });
      }
    })()
  );
});*/

const display = "minimal-ui, browser, standalone, fullscreen"; 
