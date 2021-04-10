/** @format */

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon/android-icon-36x36.png",
  "/favicon/android-icon-48x48.png",
  "/favicon/android-icon-72x72.png",
  "/favicon/android-icon-96x96.png",
  "/favicon/android-icon-144x144.png",
  "/favicon/android-icon-192x192.png",
  "/favicon/apple-icon-57x57.png",
  "/favicon/apple-icon-60x60.png",
  "/favicon/apple-icon-72x72.png",
  "/favicon/apple-icon-76x76.png",
  "/favicon/apple-icon-114x114.png",
  "/favicon/apple-icon-120x120.png",
  "/favicon/apple-icon-144x144.png",
  "/favicon/apple-icon-152x152.png",
  "/favicon/apple-icon-180x180.png",
  "/favicon/apple-icon-precomposed.png",
  "/favicon/apple-icon.png",
  "/favicon/favicon-icon-16x16.png",
  "/favicon/favicon-icon-32x32.png",
  "/favicon/favicon-icon-96x96.png",
  "/favicon/favicon.ico",
  "/favicon/ms-icon-70x70.png",
  "/favicon/ms-icon-144x144.png",
  "/favicon/ms-icon-150x150.png",
  "/favicon/ms-icon-310x310.png",
  "/images/logo-color.png",
  "/images/logo-white.png",
  "/images/pexels-matilda-wormwood-4099325-edit.jpg",
];

const STATIC_CLASSROOM = "static-classroom-v1";
const DATA_CLASSROOM = "data-classroom-v1";

// install
self.addEventListener("install", async (evt)=> {
    // pre cache image data
    evt.waitUntil(
        caches.open(DATA_CLASSROOM).then((cache) => cache.add("/api/"))
    );
        
    // pre cache all static assets
    evt.waitUntil(
        caches.open(STATIC_CLASSROOM).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting()
});

self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== STATIC_CLASSROOM && key !== DATA_CLASSROOM) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );

    self.clients.claim();
  });

  self.addEventListener('fetch', async (evt) => {
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
          caches.open(DATA_CLASSROOM).then(cache => {
            return fetch(evt.request)
              .then(response => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
    
                return response;
              })
              .catch(err => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
          }).catch(err => console.log(err))
        );
    
        return;
      }

        evt.respondWith(
            caches.open(STATIC_CLASSROOM).then(cache => {
              return cache.match(evt.request).then(response => {
                return response || fetch(evt.request);
              });
            })
          );
    })