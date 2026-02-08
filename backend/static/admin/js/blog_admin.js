(function () {
  "use strict";
  let lastValue = null;

  function syncTabs() {
    const postTypeField = document.getElementById("id_post_type");
    if (!postTypeField) return; // Stops if not on the right page

    const currentVal = postTypeField.value;
    if (currentVal !== lastValue) {
      lastValue = currentVal;

      const articleTab = document.querySelector(
        'a[href="#article-content-tab"]'
      )?.parentElement;
      const videoTab = document.querySelector(
        'a[href="#video-information-tab"]'
      )?.parentElement;
      const generalLink = document.querySelector(
        'a[href="#general-information-tab"]'
      );

      if (currentVal === "video") {
        if (articleTab)
          articleTab.style.setProperty("display", "none", "important");
        if (videoTab)
          videoTab.style.setProperty("display", "block", "important");
        if (
          document
            .querySelector('a[href="#article-content-tab"]')
            ?.classList.contains("active")
        ) {
          generalLink?.click();
        }
      } else {
        if (articleTab)
          articleTab.style.setProperty("display", "block", "important");
        if (videoTab)
          videoTab.style.setProperty("display", "none", "important");
        if (
          document
            .querySelector('a[href="#video-information-tab"]')
            ?.classList.contains("active")
        ) {
          generalLink?.click();
        }
      }
    }
  }

  // Runs every 100ms instead of 16ms (60fps)
  setInterval(syncTabs, 100);
})();
