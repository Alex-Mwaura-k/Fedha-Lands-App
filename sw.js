self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      const assets = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/script.js',
  '/js/functional.js',
  '/manifest.json',
  '/icons/icon.png',
  '/icons/sicon.png',
  '/icons/logo.png',
  '/icons/favicon.ico'
];
      return Promise.all(
        assets.map(url => 
          cache.add(url).catch(err => console.warn('Failed to cache', url, err))
        )
      );
    })
  );
});
