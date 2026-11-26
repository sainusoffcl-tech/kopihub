
/* =========================================================
   KOPIHUB — GLOBAL THEME CONTROLLER
   Versi: 1.1.0

   FUNGSI:
   - Mode Terang dan Mode Gelap
   - Penyimpanan tema per perangkat/browser
   - Sinkronisasi antar-tab browser
   - Kompatibilitas body.dark-mode
   - Penguncian zoom global
   - Menjaga tampilan stabil saat input
   - Tidak menggunakan Supabase
========================================================= */

(() => {
  "use strict";

  const THEME_VERSION = "1.1.0";
  const STORAGE_KEY = "kopihub-theme";
  const DEFAULT_THEME = "light";

  let currentTheme = DEFAULT_THEME;


  /* =======================================================
     1. PENGATURAN VIEWPORT GLOBAL
  ======================================================= */

  function setupViewport() {
    let viewport = document.querySelector(
      'meta[name="viewport"]'
    );

    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      document.head.appendChild(viewport);
    }

    viewport.setAttribute(
      "content",
      [
        "width=device-width",
        "initial-scale=1",
        "maximum-scale=1",
        "minimum-scale=1",
        "user-scalable=no",
        "viewport-fit=cover"
      ].join(", ")
    );
  }


  /* =======================================================
     2. PENGUNCIAN GESTURE ZOOM
  ======================================================= */

  function setupZoomLock() {

    const preventZoomGesture = (event) => {
      event.preventDefault();
    };

    /* Safari iPhone / iPad */

    document.addEventListener(
      "gesturestart",
      preventZoomGesture,
      { passive: false }
    );

    document.addEventListener(
      "gesturechange",
      preventZoomGesture,
      { passive: false }
    );

    document.addEventListener(
      "gestureend",
      preventZoomGesture,
      { passive: false }
    );

    /* Mencegah pinch menggunakan multi-touch */

    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches && event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    /* Mencegah zoom melalui kombinasi tombol Ctrl */

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          (event.ctrlKey || event.metaKey) &&
          ["+", "-", "=", "0"].includes(event.key)
        ) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    /* Mencegah zoom melalui roda mouse + Ctrl */

    document.addEventListener(
      "wheel",
      (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }


  /* =======================================================
     3. NORMALISASI TEMA
  ======================================================= */

  function normalizeTheme(value) {
    return value === "dark" ? "dark" : "light";
  }


  /* =======================================================
     4. MEMBACA TEMA TERSIMPAN
  ======================================================= */

  function readStoredTheme() {
    try {
      return normalizeTheme(
        localStorage.getItem(STORAGE_KEY)
      );
    } catch (error) {
      console.warn(
        "[KopiHub Theme] Tidak dapat membaca tema tersimpan.",
        error
      );

      return DEFAULT_THEME;
    }
  }


  /* =======================================================
     5. MENERAPKAN TEMA
  ======================================================= */

  function applyTheme(value, options = {}) {
    const theme = normalizeTheme(value);
    const root = document.documentElement;

    currentTheme = theme;

    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    if (document.body) {
      document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
      );
    }

    if (options.save !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        console.warn(
          "[KopiHub Theme] Tidak dapat menyimpan tema.",
          error
        );
      }
    }

    window.dispatchEvent(
      new CustomEvent("kopihub:theme-change", {
        detail: {
          theme,
          version: THEME_VERSION
        }
      })
    );

    return theme;
  }


  /* =======================================================
     6. MEMILIH TEMA
  ======================================================= */

  function setTheme(value) {
    return applyTheme(value);
  }


  /* =======================================================
     7. MEMBACA TEMA AKTIF
  ======================================================= */

  function getTheme() {
    return currentTheme;
  }


  /* =======================================================
     8. MENGGANTI TEMA
  ======================================================= */

  function toggleTheme() {
    const nextTheme =
      currentTheme === "dark" ? "light" : "dark";

    return setTheme(nextTheme);
  }


  /* =======================================================
     9. INISIALISASI TEMA
  ======================================================= */

  function initialize() {
    const savedTheme = readStoredTheme();

    applyTheme(savedTheme, {
      save: false
    });
  }


  /* =======================================================
     10. SINKRONISASI BODY
  ======================================================= */

  function syncBodyTheme() {
    if (!document.body) return;

    document.body.classList.toggle(
      "dark-mode",
      currentTheme === "dark"
    );
  }


  /* =======================================================
     11. SINKRONISASI ANTAR-TAB
  ======================================================= */

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;

    const nextTheme = normalizeTheme(event.newValue);

    applyTheme(nextTheme, {
      save: false
    });
  });


  /* =======================================================
     12. PUBLIKASI API GLOBAL
  ======================================================= */

  window.KopiHubTheme = Object.freeze({
    version: THEME_VERSION,
    getTheme,
    setTheme,
    toggleTheme,
    initialize
  });


  /* =======================================================
     13. JALANKAN SAAT SCRIPT DIMUAT
  ======================================================= */

  setupViewport();
  setupZoomLock();
  initialize();

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      syncBodyTheme,
      { once: true }
    );
  } else {
    syncBodyTheme();
  }

})();
