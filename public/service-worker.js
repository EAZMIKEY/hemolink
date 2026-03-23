
// Basic service worker for HemoLink PWA
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
});

self.addEventListener('fetch', (event) => {
  // Simple pass-through for now
});
