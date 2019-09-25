var cacheName = 'v3';
var cacheFiles = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/favicon.ico',
    'https://fonts.googleapis.com/css?family=Roboto+Mono&subset=greek,cyrillic'
]

self.addEventListener('install', e => {
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})
self.addEventListener('activate', e => {
    console.log("[ServiceWorker] Activated");
    e.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(cacheName.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from ", thisCacheName);
                    return caches.delete(thisCacheName);
                } else {
                    console.log("The cache is not change anything");
                }
            }))
        })
    )
})
self.addEventListener('fetch', e => {
    console.log("[ServiceWorker] Fetching", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response) {
                console.log("[ServiceWoker] found in cache", e.request.url);
                return response;
            }
            let requestClone = e.request.clone();
            fetch(requestClone)
                .then(response => {
                    if (!response) {
                        console.log("[ServiceWorker] No response from fetch");
                        return response;
                    }
                    let responseClone = response.clone();
                    caches.open(cacheName).then(function(cache) {
                        cache.put(e.request, responseClone);
                        return response;
                    })
                })
                .catch(err => console.log("[ServiceWorker] Error Fetching", err));
        })
    )
})