// Push event
self.addEventListener('push', event => {
    if (event && event.data) {
        const data = event.data.json();
        if (data.method === "pushMessage") {
            event.waitUntil(self.registration.showNotification("TestApp", {
                body: data.message
            }));
        }
    }
})
// Background Sync
self.addEventListener('sync', event => {
    if (event.tag === 'helloSync') {
        console.log("helloSync [sw.js]");
    }
})
// Fetch Event
self.addEventListener("install", async e => {
    console.log("sw was installed");

    const cache = await caches.open("pwa-static");
    cache.addAll([
        "./",
        "./main.js",
        "./css/index.css"
    ])
})

self.addEventListener("activate", () => {
    console.log("sw activated");
})

self.addEventListener("fetch", function (event) {
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        event.responWidth(cacheFirst(req));
    } else {
        event.responWidth(networkFirst(req))
    }
})

async function cacheFirst(req) {
    return await caches.match(req) || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open("pwa-dynamic");
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedResponse = await cache.match(req);
        return cachedResponse || await caches.match("./noconnection.json")
    }
}