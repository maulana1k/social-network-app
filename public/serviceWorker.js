const CACHE_NAME = 'socialite-web-apps'

const urlsToCache = ['/','/index.html']

self.addEventListener('install',event=>{
	event.waitUntil(Promise.resolve());
	self.skipWaiting();
});
self.addEventListener('activate',event=>{
	event.waitUntil(self.clients.claim())
	self.skipWaiting();
});
self.addEventListener('fetch',event=>{
	event.waitUntil(Promise.resolve());
	self.skipWaiting();
});
// self.addEventListener('install',event=>{
// 	event.waitUntil(cache.open(CACHE_NAME).then(cache=>{
// 		console.log('cache opened')
// 		return cache.addAll(urlsToCache)
// 	}));
// 	self.skipWaiting();
// });

// self.addEventListener('fetch',event=>{
// 	event.respondWith(caches.match(event.request).then(response=>{
// 		if (response) return response
// 		return fetch(event.request)
// 	}));
// });