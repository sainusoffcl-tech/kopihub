
/* =========================================================
   KOPIHUB — GLOBAL THEME CONTROLLER
   Versi: 1.0.0

   PENGATUR TEMA GLOBAL KOPIHUB

   Digunakan oleh:
   - Dashboard Admin
   - Dashboard Owner
   - Dashboard Kasir
   - Menu Pelanggan
   - Halaman Publik KopiHub

   FUNGSI:
   - Mode Terang dan Mode Gelap
   - Penyimpanan tema per perangkat/browser
   - Sinkronisasi antar-tab browser
   - Kompatibilitas dengan body.dark-mode
   - Tidak menggunakan Supabase
========================================================= */

(() => {
  "use strict";

  const THEME_VERSION = "1.0.0";

  const STORAGE_KEY = "kopihub-theme";

  const DEFAULT_THEME = "light";

  let currentTheme = DEFAULT_THEME;


  /* =======================================================
     1. NORMALISASI TEMA
  ======================================================= */

  function normalizeTheme(value) {
    return value === "dark" ? "dark" : "light";
  }


  /* =======================================================
     2. MEMBACA TEMA TERSIMPAN
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
     3. MENERAPKAN TEMA
  ======================================================= */

  function applyTheme(value, options = {}) {
    const theme = normalizeTheme(value);

    const root = document.documentElement;

    currentTheme = theme;

    /* Atribut utama Global Design System */

    root.setAttribute("data-theme", theme);

    root.style.colorScheme = theme;

    /* Kompatibilitas CSS lama */

    if (document.body) {
      document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
      );
    }

    /* Simpan pilihan perangkat/browser */

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

    /* Beritahu komponen halaman */

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
     4. MEMILIH TEMA
  ======================================================= */

  function setTheme(value) {
    return applyTheme(value);
  }


  /* =======================================================
     5. MEMBACA TEMA AKTIF
  ======================================================= */

  function getTheme() {
    return currentTheme;
  }


  /* =======================================================
     6. MENGGANTI TEMA
  ======================================================= */

  function toggleTheme() {
    const nextTheme =
      currentTheme === "dark" ? "light" : "dark";

    return setTheme(nextTheme);
  }


  /* =======================================================
     7. INISIALISASI TEMA
  ======================================================= */

  function initialize() {
    const savedTheme = readStoredTheme();

    applyTheme(savedTheme, {
      save: false
    });
  }


  /* =======================================================
     8. SINKRONISASI BODY
  ======================================================= */

  function syncBodyTheme() {
    if (!document.body) return;

    document.body.classList.toggle(
      "dark-mode",
      currentTheme === "dark"
    );
  }


  /* =======================================================
     9. SINKRONISASI ANTAR-TAB
  ======================================================= */

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;

    const nextTheme = normalizeTheme(event.newValue);

    applyTheme(nextTheme, {
      save: false
    });
  });


  /* =======================================================
     10. PUBLIKASI API GLOBAL
  ======================================================= */

  window.KopiHubTheme = Object.freeze({
    version: THEME_VERSION,
    getTheme,
    setTheme,
    toggleTheme,
    initialize
  });


  /* =======================================================
     11. JALANKAN SAAT SCRIPT DIMUAT
  ======================================================= */

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
