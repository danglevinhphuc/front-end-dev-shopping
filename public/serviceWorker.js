let CACHE_NAME = "front-end-dev-shopping";
let urlsToCache = [
  "/",
  "/sign-in",
  'favicon.ico',
  "/static/js/main.385605df.js",
  "/static/css/main.292b39d9.css",
  '/css/nifty.min.css',
  '/css/bootstrap.min.css',
  '/js/jquery.min.js',
  '/js/bootstrap.min.js',
];

// Install a service worker
self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      console.log("Opened fetch");
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  let cacheWhitelist = ["front-end-dev-shopping"];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log("Opened activate");
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
