
/* =========================================================
   KOPIHUB — GLOBAL NAVIGATION SYSTEM
   Versi: 1.0.0

   Fungsi:
   1. Mengelola riwayat halaman setiap peran.
   2. Mengelola riwayat panel secara terpisah.
   3. Mendukung kembali ke halaman sebelumnya.
   4. Mencegah riwayat antarperan bercampur.
   5. Tidak mengubah fungsi atau data dashboard.
========================================================= */

(() => {
  "use strict";

  const VERSION = "1.0.0";

  const roles = new Map();

  /* =====================================================
     MEMBUAT RUANG NAVIGASI SETIAP PERAN
  ===================================================== */

  function createRoleState(initialPage) {
    return {
      currentPage: initialPage || null,
      pageHistory: [],
      panels: new Map()
    };
  }

  function getRole(role) {
    const key = String(role || "").toLowerCase();

    if (!key) {
      console.warn("[KopiHub Navigation] Peran tidak valid.");
      return null;
    }

    if (!roles.has(key)) {
      roles.set(key, createRoleState(null));
    }

    return roles.get(key);
  }

  /* =====================================================
     INISIALISASI NAVIGASI
  ===================================================== */

  function init(role, initialPage) {
    const state = getRole(role);

    if (!state) return null;

    if (!state.currentPage && initialPage) {
      state.currentPage = initialPage;
    }

    return getState(role);
  }

  /* =====================================================
     RIWAYAT HALAMAN
  ===================================================== */

  function navigate(role, page, options = {}) {
    const state = getRole(role);

    if (!state || !page) return false;

    const target = String(page);
    const current = state.currentPage;

    if (target === current) {
      return true;
    }

    if (options.replace === true) {
      state.pageHistory = [];
    } else if (current) {
      state.pageHistory.push(current);
    }

    state.currentPage = target;

    return true;
  }

  /* =====================================================
     MENGGANTI HALAMAN TANPA MENAMBAH RIWAYAT
  ===================================================== */

  function replace(role, page) {
    return navigate(role, page, {
      replace: true
    });
  }

  /* =====================================================
     KEMBALI KE HALAMAN SEBELUMNYA
  ===================================================== */

  function backPage(role) {
    const state = getRole(role);

    if (!state || state.pageHistory.length === 0) {
      return null;
    }

    const previousPage = state.pageHistory.pop();

    state.currentPage = previousPage;

    return previousPage;
  }

  /* =====================================================
     RIWAYAT PANEL / SUBMENU
     Setiap kelompok memiliki riwayat sendiri.
  ===================================================== */

  function getPanelState(role, group) {
    const state = getRole(role);

    if (!state || !group) return null;

    const key = String(group);

    if (!state.panels.has(key)) {
      state.panels.set(key, {
        currentPanel: null,
        history: []
      });
    }

    return state.panels.get(key);
  }

  /* =====================================================
     MEMBUKA PANEL
  ===================================================== */

  function navigatePanel(role, group, panel, options = {}) {
    const state = getPanelState(role, group);

    if (!state || !panel) return false;

    const target = String(panel);
    const current = state.currentPanel;

    if (target === current) {
      return true;
    }

    if (options.replace === true) {
      state.history = [];
    } else if (current) {
      state.history.push(current);
    }

    state.currentPanel = target;

    return true;
  }

  /* =====================================================
     KEMBALI KE PANEL SEBELUMNYA
  ===================================================== */

  function backPanel(role, group) {
    const state = getPanelState(role, group);

    if (!state || state.history.length === 0) {
      return null;
    }

    const previousPanel = state.history.pop();

    state.currentPanel = previousPanel;

    return previousPanel;
  }

  /* =====================================================
     MENGATUR PANEL TANPA MENAMBAH RIWAYAT
  ===================================================== */

  function replacePanel(role, group, panel) {
    return navigatePanel(role, group, panel, {
      replace: true
    });
  }

  /* =====================================================
     PEMERIKSAAN RIWAYAT
  ===================================================== */

  function canGoBackPage(role) {
    const state = getRole(role);

    return Boolean(
      state && state.pageHistory.length > 0
    );
  }

  function canGoBackPanel(role, group) {
    const state = getPanelState(role, group);

    return Boolean(
      state && state.history.length > 0
    );
  }

  /* =====================================================
     MENGAMBIL STATUS NAVIGASI
  ===================================================== */

  function getState(role) {
    const state = getRole(role);

    if (!state) return null;

    const panels = {};

    state.panels.forEach((panelState, group) => {
      panels[group] = {
        currentPanel: panelState.currentPanel,
        history: [...panelState.history]
      };
    });

    return {
      role: String(role).toLowerCase(),
      currentPage: state.currentPage,
      pageHistory: [...state.pageHistory],
      panels
    };
  }

  /* =====================================================
     RESET RIWAYAT
     Digunakan saat logout atau inisialisasi ulang.
  ===================================================== */

  function reset(role, initialPage = null) {
    const key = String(role || "").toLowerCase();

    if (!key) return;

    roles.set(
      key,
      createRoleState(initialPage)
    );
  }

  /* =====================================================
     API GLOBAL KOPIHUB
  ===================================================== */

  window.KopiHubNavigation = {
    version: VERSION,

    init,
    navigate,
    replace,
    backPage,

    navigatePanel,
    replacePanel,
    backPanel,

    canGoBackPage,
    canGoBackPanel,

    getState,
    reset
  };

  console.info(
    "[KopiHub Navigation] Sistem navigasi global siap.",
    VERSION
  );

})();
