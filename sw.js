
/* =====================================================
   KOPIHUB — SERVICE WORKER
   Versi: 1.0.0

   Fungsi:
   - Menangani Push Notification
   - Menampilkan notifikasi perangkat
   - Menangani klik notifikasi

   Tidak melakukan caching halaman.
   Tidak mengubah sistem pesanan.
   Tidak mengubah suara notifikasi kasir.
===================================================== */

const KOPIHUB_SW_VERSION = "kopihub-sw-v1";

/* =====================================================
   INSTALL
===================================================== */

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
    })()
  );
});

/* =====================================================
   PUSH NOTIFICATION
===================================================== */

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      let payload = {};

      try {
        if (event.data) {
          payload = event.data.json();
        }
      } catch (error) {
        payload = {
          title: "Pesanan Baru KopiHub",
          body: event.data
            ? event.data.text()
            : "Ada pemberitahuan baru."
        };
      }

      const title =
        payload.title || "KopiHub";

      const options = {
        body:
          payload.body ||
          "Ada pemberitahuan baru dari KopiHub.",

        icon: "/kopihub/assets/icon-192.png",

        badge: "/kopihub/assets/icon-192.png",

        tag:
          payload.tag ||
          "kopihub-notification",

        renotify: true,

        data: {
          url:
            payload.url ||
            "/kopihub/kasir.html",

          type:
            payload.type ||
            "general",

          order_id:
            payload.order_id || null
        }
      };

      await self.registration.showNotification(
        title,
        options
      );
    })()
  );
});

/* =====================================================
   NOTIFICATION CLICK
===================================================== */

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    event.waitUntil(
      (async () => {
        const targetUrl =
          event.notification.data?.url ||
          "/kopihub/";

        const target = new URL(
          targetUrl,
          self.location.origin
        );

        if (target.origin !== self.location.origin) {
          return;
        }

        const windows =
          await self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
          });

        for (const client of windows) {
          if ("focus" in client) {
            if (client.url.startsWith(
              self.location.origin + "/kopihub/"
            )) {
              await client.navigate(target.href);
              return client.focus();
            }
          }
        }

        return self.clients.openWindow(
          target.href
        );
      })()
    );
  }
);
