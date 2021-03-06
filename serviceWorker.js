const cache_name = 'version-1';
const cached_urls = ['/index.html', '/offline.html', '/notfound.html'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cache_name)
            .then((cache) => {
                // console.log('Opened cache: ', cache_name);
                // console.log('Saving to cache: ', cached_urls);
                return cache.addAll(cached_urls);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    const preCache = true;
    // console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                if (preCache) {
                    // console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
            }
            // console.log('Network request for ', event.request.url);
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    return caches.match('notfound.html');
                }
                return caches.open(cached_urls).then(function(cache) {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
        }).catch(function(error) {
            console.log('Error, ', error);
            return caches.match('offline.html');
        })
    );
});
