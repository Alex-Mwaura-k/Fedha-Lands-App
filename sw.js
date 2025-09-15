self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      const assets = ['/', '/index.html', '/css/styles.css', '/js/script.js', 
                      'icons/appIcon.png', 'icons/standAloneIcon.png','icons/logo.png'];
      return Promise.all(
        assets.map(url => 
          cache.add(url).catch(err => console.warn('Failed to cache', url, err))
        )
      );
    })
  );
});
