var CACHE_VERSION=75;
var CURRENT_CACHES={
	main:'PSI-cache-v'+CACHE_VERSION
}; 
var preCacheFiles=[
	"/",
	"cacher.js",
	
	"codes/index.css",
	"codes/communication.js",
	"codes/data-transfer.js",
	"codes/analytics.js"
];

function CatchError(error){
	console.log('Service worker registration failed:',error);
}


self.addEventListener('activate', function(event){
	var expectedCacheNames=Object.values(CURRENT_CACHES);
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if (!expectedCacheNames.includes(cacheName)){
						console.log('Deleting old cache:',cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});


self.addEventListener('message',function handler(event){
	console.log("SW message!",event.data);
	if(event.data.command==='SelectiveCache') {
		caches.open(CURRENT_CACHES.main).then(function(cache){
			return cache.addAll(event.data.parameters);
		}).catch(CatchError);
	}
});


self.addEventListener("install",function(event){
	console.log("installing precache files");
	self.skipWaiting();
	caches.open(CURRENT_CACHES.main).then(function(cache){
		return cache.addAll(preCacheFiles);
	}).catch(CatchError);
});



self.addEventListener("fetch",function(event){
	function SWFetchOrCache(response){
		if(!response){
			return fetch(event.request).then(SWRespond).catch(CatchError);		//Network fetch,...
		}
		return response;
	}

	function SWRespond(response){
		if(!response.clone().ok){
			throw new TypeError('Bad response status');
		}
		caches.open(CURRENT_CACHES.main).then(SWCachePut(response.clone())).catch(CatchError);	//Open from cache,...
		return response;
	}

	function SWCachePut(response){
		return function(cache){													//Save to cache
			cache.put(event.request,response).catch(CatchError);
		};
	}

	var url=event.request.url;
	console.log("Fetching: ",url);
	console.log(event);
	
	event.respondWith(caches.match(event.request).then(SWFetchOrCache).catch(CatchError));

});

self.addEventListener('unhandledrejection',function(event){
	console.log("promise",event.promise);
	console.log("reason",event.reason);
});