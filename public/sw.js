// The site no longer ships a service worker. This file replaces the old Workbox
// worker so that browsers which still have it installed unregister it, drop its
// caches and reload from the network. Keep it in place for a long time: a browser
// only picks up this replacement when it re-checks /sw.js.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.navigate(client.url))
    })(),
  )
})
