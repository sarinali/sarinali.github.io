'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "48b2b431bcb1d72ae6448b2549f974c0",
"assets/assets/atlas_32x.png": "d9614d3e30a4fc05cfc3d722c82d41ec",
"assets/assets/carpet.png": "04a9f27e5fc48a141233e50849ddf3e7",
"assets/assets/empireants.mp3": "f1b31800e2773ef5e10e95a1708f7501",
"assets/assets/gallerypic1.jpg": "c3e4f0c566a8c173602d422f23314e3f",
"assets/assets/gallerypic2.jpg": "92da7ac42ac166390aaa18696cc8e201",
"assets/assets/gallerypic3.jpg": "beb3c00fab634e450da9796cc1253e84",
"assets/assets/gallerypic4.jpg": "5cc2f907fba1de909c06c6400d18c439",
"assets/assets/gallerypic5.jpg": "f5351effc2b978c1d65a7f8d9f788c60",
"assets/assets/gallerypic6.jpg": "fc7422b512989cacaea5150a283e1c53",
"assets/assets/gallerypic7.jpg": "8659716280a773e34ecf03a08d7adfbe",
"assets/assets/gallerypic8.jpg": "979befb626ee1d599c564775d0d12141",
"assets/assets/gallerypic9.jpeg": "4a9448ec18b34202e51853d14633af55",
"assets/assets/images/assets.tsx": "3c075bea9369849bdee8aca7885bb5f4",
"assets/assets/images/atlas_32x.tsx": "20f59473edaaa3f1eb5c2f83ba6e9d3e",
"assets/assets/images/room2.json": "a092d115d416650496554a2230d7d39d",
"assets/assets/images/table.tsx": "ae813e6c06dc0b2a98f1df6e508872a6",
"assets/assets/images/test.json": "e841faf11ea2bf7db3df440c430a36b5",
"assets/assets/jaqueline.jpeg": "ec1801ec3663c25b44fd94b1e2123f14",
"assets/assets/me.gif": "d3189c81f5877a7d7d439e6db66a2518",
"assets/assets/needtoknow.mp3": "0b8a5bff775170cfab9283d45c4419cb",
"assets/assets/newyearsday.mp3": "284c9593ce037e487e4871a9435f2d7f",
"assets/assets/odds.mp3": "60754890310733c2ae581aa170c1b684",
"assets/assets/planether.png": "442bdd6fef406285ac9cd590a32109df",
"assets/assets/plasticbeach.jpg": "b96c49fb681a68849f602daf7feaa01e",
"assets/assets/SF-UI-Display-Bold.ttf": "5ef6db5a59a354fd436d16906502b6a8",
"assets/assets/SF-UI-Display-Italic.ttf": "90ad050f9579d382bd5fe2e2b85bba26",
"assets/assets/SF-UI-Display-Regular.ttf": "08397c215a9e579b48e778a2fe9b6214",
"assets/assets/spotify.png": "b962ec2126cab16f799d085b093bebc4",
"assets/assets/table.png": "9682c4dd5778b1382d2dd3d79d743dda",
"assets/assets/wannatakethisdowntown.png": "2ae586547161863e369df28d248bd73d",
"assets/FontManifest.json": "ff45835b928bc9f059c965cc0d57e93a",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "af8de8756250a4de32c46adf63250085",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "cfb913d7463f2d621493b03680a2d23c",
"/": "cfb913d7463f2d621493b03680a2d23c",
"main.dart.js": "f1ed650bb90386806f31e906dd702719",
"manifest.json": "026e90121884c5d57085fba932a29598",
"version.json": "4067e70fbf2ed7f13bbca2d877e719c1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
