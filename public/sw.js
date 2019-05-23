const cacheName = 'core-cache'
const cacheInstall = [
  '/',
  '/offline',
  '/css/main.css',
  '/js/main.js'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
    .open('core-cache')
    .then(cache => {
      return cache.addAll(cacheInstall)
    })
    .then(() => {
      self.skipWaiting()
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log(`Activate event`);
})

self.addEventListener('fetch', (e) => {
  console.log('fetch');
  e.respondWith(
    caches
    .match(e.request)
    .then(response => {
      if (response){
        return response
      }
      return fetch(e.request)
        .catch(() => caches.match('/offline'))
    })

  )
})
