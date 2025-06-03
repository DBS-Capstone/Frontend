// sw.js

const CACHE_NAME = "kicau-finder-cache-v1";
const urlsToCache = [
  "/", // Halaman utama (index.html)
  "/manifest.json",
  // Tambahkan path ke ikon-ikon Anda yang ada di folder public/icons/
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // Anda bisa menambahkan aset statis lain di sini jika ada (misal favicon.ico)
  // '/favicon.ico',
  // '/css/style.css', // Contoh jika Anda punya CSS statis global
  // Untuk file JS dan CSS yang di-bundle oleh Vite dengan hash,
  // strategi caching runtime di event 'fetch' lebih cocok daripada precaching di sini.
];

// Event install: dipanggil saat service worker diinstal
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Membuka cache dan menambahkan file inti");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error(
          "Service Worker: Gagal menambahkan file ke cache saat install",
          error
        );
      })
  );
  self.skipWaiting(); // Memaksa service worker yang menunggu untuk menjadi aktif
});

// Event activate: dipanggil saat service worker diaktifkan
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Hanya cache dengan nama ini yang dipertahankan
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("Service Worker: Menghapus cache lama:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Mengontrol klien yang tidak terkontrol
});

// Event fetch: dipanggil setiap kali aplikasi meminta resource (gambar, script, dll.)
self.addEventListener("fetch", (event) => {
  // Hanya proses request GET
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika resource ada di cache, kembalikan dari cache
      if (cachedResponse) {
        // console.log('Service Worker: Mengambil dari cache:', event.request.url);
        return cachedResponse;
      }

      // Jika tidak ada di cache, ambil dari jaringan
      // console.log('Service Worker: Mengambil dari jaringan:', event.request.url);
      return fetch(event.request)
        .then((networkResponse) => {
          // Periksa apakah kita menerima respons yang valid
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            (networkResponse.type !== "basic" &&
              networkResponse.type !== "opaque")
          ) {
            return networkResponse;
          }

          // Penting: Clone respons. Respons adalah stream dan hanya bisa dikonsumsi sekali.
          // Kita perlu meng-clone-nya agar browser bisa menggunakan respons asli
          // dan kita bisa menyimpan clone-nya ke cache.
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // console.log('Service Worker: Menyimpan ke cache:', event.request.url);
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.error(
            "Service Worker: Gagal mengambil dari jaringan dan cache",
            error
          );
          // Opsional: Kembalikan halaman offline default jika fetch gagal total
          // if (event.request.mode === 'navigate') {
          //   return caches.match('/offline.html'); // Anda perlu membuat file offline.html
          // }
        });
    })
  );
});
