/* Tripitaka service worker: offline app shell, cached texts and thumbnails. */
const VERSION = "v2";
const SHELL = `shell-${VERSION}`;
const STATIC = `static-${VERSION}`;
const TEXTS = "texts"; // SuttaCentral API responses (kept across versions)
const MEDIA = "media";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(["/", "/manifest.webmanifest"])).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => (k.startsWith("shell-") || k.startsWith("static-")) && !k.endsWith(VERSION)).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pages: network first, fall back to cache, then home.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match("/")) || Response.error()),
    );
    return;
  }

  // Next.js static assets: cache first.
  if (url.origin === self.location.origin && (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/pwa/") || url.pathname.startsWith("/sc/"))) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(STATIC).then((c) => c.put(req, copy));
            return res;
          }),
      ),
    );
    return;
  }

  // SuttaCentral texts: network first so texts stay fresh, cached for offline.
  if ((url.hostname === "suttacentral.net" && url.pathname.startsWith("/api/")) || (url.origin === self.location.origin && url.pathname.startsWith("/api/sc/"))) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(TEXTS).then((c) => c.put(req, copy).then(() => trim(TEXTS, 600)));
          }
          return res;
        })
        .catch(async () => (await caches.match(req)) || Response.error()),
    );
    return;
  }

  // Video thumbnails & book covers: cache first.
  if (url.hostname === "i.ytimg.com" || url.hostname === "rerukanemahanahimi.lk") {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(MEDIA).then((c) => c.put(req, copy).then(() => trim(MEDIA, 300)));
            return res;
          }),
      ),
    );
  }
});
