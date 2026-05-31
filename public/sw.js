/* 泡芙日记 Service Worker — 离线缓存 */

const CACHE_NAME = 'paofu-diary-v1'
const ASSETS = [
  '/paofu-diary/',
  '/paofu-diary/index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // 跳过 Supabase API 请求（走 NetworkFirst，由 workbox runtimeCaching 处理）
  if (request.url.includes('supabase.co')) return

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      return cached || fetchPromise
    })
  )
})
