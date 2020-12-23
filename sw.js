var APP_PREFIX = 'PrayingDaily_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_02'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
'/Praying-Daily-With-My-Church-Family/',
'/Praying-Daily-With-My-Church-Family/css/sab-stylesheet.css',
'/Praying-Daily-With-My-Church-Family/css/tooltipster.css',
'/Praying-Daily-With-My-Church-Family/fonts/CharisSILCompact-B.ttf',
'/Praying-Daily-With-My-Church-Family/fonts/CharisSILCompact-R.ttf',
'/Praying-Daily-With-My-Church-Family/icons/apple-touch-icon.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-144.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-192.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-36.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-48.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-512.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-72.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-96.png',
'/Praying-Daily-With-My-Church-Family/icons/icon-adaptive.png',
'/Praying-Daily-With-My-Church-Family/js/app-builder-audio.js',
'/Praying-Daily-With-My-Church-Family/js/app-builder-footnotes.js',
'/Praying-Daily-With-My-Church-Family/js/app-builder-menus.js',
'/Praying-Daily-With-My-Church-Family/js/app-builder-video.js',
'/Praying-Daily-With-My-Church-Family/js/book-names.js',
'/Praying-Daily-With-My-Church-Family/js/jquery-1.11.3.min.js',
'/Praying-Daily-With-My-Church-Family/js/jquery.tooltipster.min.js',
'/Praying-Daily-With-My-Church-Family/js/popcorn-complete.min.js',
'/Praying-Daily-With-My-Church-Family/01-Praying-000.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-001.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-002.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-003.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-004.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-005.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-006.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-007.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-008.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-009.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-010.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-011.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-012.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-013.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-014.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-015.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-016.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-017.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-018.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-019.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-020.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-021.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-022.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-023.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-024.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-025.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-026.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-027.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-028.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-029.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-030.html',
'/Praying-Daily-With-My-Church-Family/01-Praying-031.html',
'/Praying-Daily-With-My-Church-Family/index.html'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
