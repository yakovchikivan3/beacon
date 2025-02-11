// This is the "Offline copy of pages" service worker

const CACHE_NAME = "app-cache-v1";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.routing.registerRoute(
    ({ request }) => true, // Кешировать все запросы
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE_NAME,
    })
  );

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });
} else {
  console.error("Workbox не загрузился");
}
