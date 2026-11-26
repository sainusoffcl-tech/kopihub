
/* =========================================================
   KOPIHUB — GLOBAL HEADER
   Versi: 1.3.3
   Global Design System v1.3.0
========================================================= */

(() => {
  "use strict";

  const HEADER_VERSION = "1.3.3";
  const BASE_PATH = "/kopihub/";

  const SUPABASE_URL =
    "https://ozcliasebeydgyvgluht.supabase.co";

  const SUPABASE_PUBLIC_KEY =
    "sb_publishable_X3z6XFroL-eNdwB14y6dYw_81dvj1yN";

  /* =====================================================
     DATA IDENTITAS OWNER
  ===================================================== */

  window.KopiHubOwnerShopName =
    window.KopiHubOwnerShopName || "";

  window.KopiHubOwnerShopLogo =
    window.KopiHubOwnerShopLogo || "";

  /* =====================================================
     KONFIGURASI MENU BERDASARKAN PERAN
  ===================================================== */

  const ROLE_CONFIG = {
    admin: {
      label: "ADMIN KOPIHUB",
      title: "Menu Admin",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
        { id: "partners", label: "Kedai Mitra", icon: "store" },
        { id: "applications", label: "Pendaftaran Mitra", icon: "clipboard-check" },
        { id: "users", label: "Pengguna & Akses", icon: "users" },
        { id: "orders", label: "Pesanan Platform", icon: "receipt-text" },
        { id: "transactions", label: "Transaksi Platform", icon: "credit-card" },
        { id: "revenue", label: "Komisi & Pendapatan", icon: "wallet" },
        { id: "settings", label: "Pengaturan Platform", icon: "settings" },
        { id: "audit", label: "Audit Log", icon: "history" },
        { id: "logout", label: "Keluar dari Admin", icon: "log-out", danger: true }
      ]
    },

    owner: {
      label: "OWNER KEDAI",
      title: "Menu Owner",
      items: [
        { id: "home", label: "Dashboard", icon: "layout-dashboard" },
        { id: "menu", label: "Kelola Menu", icon: "coffee" },
        { id: "transactions", label: "Transaksi", icon: "receipt-text" },
        { id: "reports", label: "Laporan Penjualan", icon: "chart-no-axes-combined" },
        { id: "cashiers", label: "Karyawan", icon: "users" },
        { id: "identity", label: "Profil Kedai", icon: "store" },
        { id: "payments", label: "Pembayaran", icon: "wallet" },
        { id: "settings", label: "Pengaturan", icon: "settings" },
        { id: "logout", label: "Keluar", icon: "log-out", danger: true }
      ]
    },

    cashier: {
      label: "KASIR KEDAI",
      title: "Menu Kasir",
      items: [
        { id: "home", label: "Beranda", icon: "layout-dashboard" },
        { id: "orders", label: "Pesanan", icon: "receipt-text" },
        { id: "pos", label: "Buat Pesanan (POS)", icon: "shopping-bag" },
        { id: "profile", label: "Profil Kasir", icon: "user-round" },
        { id: "settings", label: "Pengaturan", icon: "settings" },
        { id: "refresh", label: "Muat Ulang Pesanan", icon: "refresh-cw" },
        { id: "logout", label: "Akhiri Shift", icon: "log-out", danger: true }
      ]
    },

    customer: {
      label: "MENU PELANGGAN",
      title: "Menu",
      items: [
        { id: "shop-home", label: "Beranda Kedai", icon: "store" },
        { id: "customer-orders", label: "Pesanan Saya", icon: "receipt-text" }
      ]
    }
  };

  /* =====================================================
     DESKRIPSI MENU BERDASARKAN PERAN
  ===================================================== */

  const MENU_DESCRIPTIONS = {
    admin: {
      dashboard: "Ringkasan dan pemantauan platform KopiHub",
      partners: "Kelola kedai yang bergabung dengan KopiHub",
      applications: "Periksa dan kelola pendaftaran kedai mitra",
      users: "Kelola akun pengguna dan hak akses platform",
      orders: "Pantau pesanan dari seluruh kedai mitra",
      transactions: "Pantau transaksi pada platform KopiHub",
      revenue: "Kelola komisi dan pendapatan platform",
      settings: "Atur konfigurasi dan pengaturan platform",
      audit: "Lihat catatan aktivitas sistem",
      logout: "Keluar dari akun Admin KopiHub"
    },

    owner: {
      home: "Lihat ringkasan aktivitas dan performa kedai",
      menu: "Tambah, ubah, dan kelola daftar menu kedai",
      transactions: "Pantau dan kelola transaksi kedai",
      reports: "Lihat laporan penjualan dan performa kedai",
      cashiers: "Kelola karyawan dan akun kasir",
      identity: "Kelola identitas, nama, dan logo kedai",
      payments: "Atur metode dan ketentuan pembayaran",
      settings: "Atur preferensi dan operasional kedai",
      logout: "Keluar dari akun Owner"
    },

    cashier: {
      home: "Lihat ringkasan aktivitas kasir",
      orders: "Lihat dan proses pesanan pelanggan",
      pos: "Buat pesanan langsung melalui kasir",
      profile: "Lihat informasi akun dan profil kasir",
      settings: "Atur preferensi dan pemberitahuan kasir",
      refresh: "Perbarui daftar pesanan terbaru",
      logout: "Akhiri sesi dan shift kasir"
    },

    customer: {
      "shop-home": "Lihat informasi dan daftar menu kedai",
      "customer-orders": "Lihat status dan riwayat pesanan Anda"
    }
  };

  /* =====================================================
     PEMETAAN HALAMAN ADMIN
  ===================================================== */

  const ADMIN_PAGE_MAP = {
    dashboard: "dashboard",
    partners: "shops",
    applications: "applications",
    users: "users",
    orders: "orders",
    transactions: "platformTransactions",
    revenue: "commission",
    settings: "settings"
  };

  /* =====================================================
     URL KOMPONEN
  ===================================================== */

  function getBaseUrl() {
    return new URL(BASE_PATH, window.location.origin);
  }

  function getHeaderUrl() {
    return new URL("components/header.html", getBaseUrl()).href;
  }

  function getCssUrl() {
    const url = new URL("css/header.css", getBaseUrl());
    url.searchParams.set("v", HEADER_VERSION);
    return url.href;
  }

  /* =====================================================
     MEMUAT CSS
  ===================================================== */

  function loadStylesheet() {
    const existing = document.querySelector(
      "link[data-kh-header-css]"
    );

    if (existing) {
      existing.href = getCssUrl();
      existing.dataset.khHeaderCss = HEADER_VERSION;
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = getCssUrl();
    link.dataset.khHeaderCss = HEADER_VERSION;

    document.head.appendChild(link);
  }

  /* =====================================================
     ICON LUCIDE
  ===================================================== */

  function refreshIcons(container) {
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons({ root: container });
    }
  }

  /* =====================================================
     NAMA KEDAI OWNER
  ===================================================== */

  function setShopName(root, value) {
    const shopName = root?.querySelector("[data-kh-shop-name]");
    const roleLabel = root?.querySelector("[data-kh-role-label]");

    if (!shopName) return;

    const name = String(value || "").trim();

    shopName.textContent = name;
    shopName.hidden = !name;

    if (roleLabel) {
      roleLabel.hidden = true;
    }
  }

  /* =====================================================
     FOTO PROFIL KEDAI OWNER
  ===================================================== */

  function setShopLogo(root, value) {
    const image = root?.querySelector("[data-kh-shop-logo]");
    const fallback = root?.querySelector("[data-kh-shop-logo-fallback]");

    if (!image || !fallback) return;

    const logoUrl = String(value || "").trim();

    if (!logoUrl) {
      image.removeAttribute("src");
      image.hidden = true;
      fallback.hidden = false;
      return;
    }

    image.onload = () => {
      image.hidden = false;
      fallback.hidden = true;
    };

    image.onerror = () => {
      image.hidden = true;
      fallback.hidden = false;
    };

    image.hidden = true;
    fallback.hidden = false;
    image.src = logoUrl;
  }

  /* =====================================================
     LOGO RESMI KOPIHUB
  ===================================================== */

  async function loadOfficialLogo(root) {
    const image = root.querySelector("[data-kh-logo]");
    const fallback = root.querySelector("[data-kh-logo-fallback]");

    if (!image || !fallback) return;

    function showFallback() {
      image.hidden = true;
      fallback.hidden = false;
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/kh_get_platform_logo_path`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_PUBLIC_KEY,
            "Authorization": `Bearer ${SUPABASE_PUBLIC_KEY}`
          },
          body: "{}"
        }
      );

      if (!response.ok) {
        throw new Error("Logo platform belum dapat dimuat.");
      }

      const path = await response.json();

      if (typeof path !== "string" || !path.trim()) {
        throw new Error("Path logo belum tersedia.");
      }

      const safePath = path
        .split("/")
        .map(segment => encodeURIComponent(segment))
        .join("/");

      const logoUrl =
        `${SUPABASE_URL}/storage/v1/object/public/platform-assets/${safePath}`;

      image.onload = () => {
        image.hidden = false;
        fallback.hidden = true;
      };

      image.onerror = showFallback;
      image.src = logoUrl;

    } catch (error) {
      showFallback();

      console.warn(
        "[KopiHub Header] Logo:",
        error.message
      );
    }
  }

  /* =====================================================
     MEMBUAT DAFTAR MENU
     Format:
     Ikon | Judul + Deskripsi | Panah
  ===================================================== */

  function renderMenu(root, role) {
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.customer;

    const descriptions =
      MENU_DESCRIPTIONS[role] || MENU_DESCRIPTIONS.customer;

    const list = root.querySelector("[data-kh-menu-list]");
    const roleLabel = root.querySelector("[data-kh-role-label]");
    const menuTitle = root.querySelector("[data-kh-menu-title]");

    if (!list) {
      console.warn(
        "[KopiHub Header] Elemen daftar menu tidak ditemukan."
      );
      return;
    }

    if (roleLabel) {
      roleLabel.textContent = config.label;
      roleLabel.hidden = role === "owner";
    }

    if (menuTitle) {
      menuTitle.textContent = config.title;
    }

    list.replaceChildren();

    config.items.forEach(item => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "kh-header-menu-item";
      button.dataset.khAction = item.id;

      if (item.danger) {
        button.classList.add("kh-danger");
      }

      /* IKON DI KIRI */

      const icon = document.createElement("span");
      icon.className = "kh-header-menu-item-icon";

      const iconElement = document.createElement("i");
      iconElement.setAttribute("data-lucide", item.icon);

      icon.appendChild(iconElement);

      /* AREA JUDUL DAN DESKRIPSI */

      const content = document.createElement("span");
      content.className = "kh-header-menu-item-content";

      const label = document.createElement("span");
      label.className = "kh-header-menu-item-label";
      label.textContent = item.label;

      const description = document.createElement("span");
      description.className = "kh-header-menu-item-description";

      description.textContent =
        descriptions[item.id] || `Buka fitur ${item.label}`;

      content.append(label, description);

      /* PANAH DI KANAN */

      const arrow = document.createElement("i");
      arrow.className = "kh-header-menu-item-arrow";
      arrow.setAttribute("data-lucide", "chevron-right");

      /* SUSUNAN KARTU */

      button.append(icon, content, arrow);

      list.appendChild(button);
    });

    refreshIcons(root);
  }

  /* =====================================================
     MEMBUKA MENU
  ===================================================== */

  function openMenu(root) {
    const menu = root.querySelector("[data-kh-menu]");
    const overlay = root.querySelector("[data-kh-overlay]");
    const openButton = root.querySelector("[data-kh-menu-open]");

    if (!menu || !overlay) return;

    if (menu.classList.contains("kh-open")) return;

    overlay.hidden = false;

    requestAnimationFrame(() => {
      overlay.classList.add("kh-visible");
      menu.classList.add("kh-open");
    });

    menu.setAttribute("aria-hidden", "false");
    menu.inert = false;

    openButton?.setAttribute("aria-expanded", "true");

    document.body.classList.add("kh-header-menu-open");
  }

  /* =====================================================
     MENUTUP MENU
  ===================================================== */

  function closeMenu(root) {
    const menu = root.querySelector("[data-kh-menu]");
    const overlay = root.querySelector("[data-kh-overlay]");
    const openButton = root.querySelector("[data-kh-menu-open]");

    if (!menu || !overlay) return;

    menu.classList.remove("kh-open");
    overlay.classList.remove("kh-visible");

    menu.setAttribute("aria-hidden", "true");
    menu.inert = true;

    openButton?.setAttribute("aria-expanded", "false");

    document.body.classList.remove("kh-header-menu-open");

    window.setTimeout(() => {
      if (!menu.classList.contains("kh-open")) {
        overlay.hidden = true;
      }
    }, 350);
  }

  /* =====================================================
     PEMBERITAHUAN AUDIT LOG
  ===================================================== */

  function showAuditNotice(root) {
    closeMenu(root);

    window.alert(
      "Fitur Audit Log belum tersedia. " +
      "Fitur ini akan diaktifkan pada tahap pengembangan berikutnya."
    );
  }

  /* =====================================================
     NAVIGASI DAN LOGOUT
  ===================================================== */

  function sendNavigation(root, role, action) {
    if (action === "audit" && role === "admin") {
      showAuditNotice(root);
      return;
    }

    closeMenu(root);

    if (action === "logout") {
      document.dispatchEvent(
        new CustomEvent("kopihub:logout", {
          detail: { role }
        })
      );
      return;
    }

    let page = action;

    if (role === "admin") {
      page = ADMIN_PAGE_MAP[action];
    }

    if (!page) {
      console.warn(
        "[KopiHub Header] Tujuan menu tidak dikenal:",
        role,
        action
      );
      return;
    }

    document.dispatchEvent(
      new CustomEvent("kopihub:navigate", {
        detail: {
          role,
          page,
          action
        }
      })
    );
  }

  /* =====================================================
     EVENT IDENTITAS OWNER
  ===================================================== */

  function bindOwnerIdentityEvents(root, role) {
    if (role !== "owner") return;

    /* PENANDA LAYOUT OWNER UNTUK CSS */

    root.classList.add("kh-header-owner-layout");

    setShopName(root, window.KopiHubOwnerShopName);
    setShopLogo(root, window.KopiHubOwnerShopLogo);

    const profileButton = root.querySelector(
      "[data-kh-profile-open]"
    );

    if (profileButton) {
      profileButton.hidden = false;

      profileButton.addEventListener("click", () => {
        sendNavigation(root, role, "identity");
      });
    }

    document.addEventListener("kopihub:shop-name", event => {
      setShopName(root, event.detail?.name || "");
    });

    document.addEventListener("kopihub:shop-logo", event => {
      const logo = event.detail?.url || "";

      window.KopiHubOwnerShopLogo = logo;
      setShopLogo(root, logo);
    });
  }

  /* =====================================================
     EVENT MENU
  ===================================================== */

  function bindEvents(root, role) {
    const openButton = root.querySelector("[data-kh-menu-open]");
    const closeButton = root.querySelector("[data-kh-menu-close]");
    const overlay = root.querySelector("[data-kh-overlay]");
    const list = root.querySelector("[data-kh-menu-list]");

    openButton?.addEventListener("click", () => openMenu(root));
    closeButton?.addEventListener("click", () => closeMenu(root));
    overlay?.addEventListener("click", () => closeMenu(root));

    list?.addEventListener("click", event => {
      const button = event.target.closest("[data-kh-action]");

      if (!button || !list.contains(button)) return;

      sendNavigation(root, role, button.dataset.khAction);
    });

    document.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        root.querySelector("[data-kh-menu]")?.classList.contains("kh-open")
      ) {
        closeMenu(root);
      }
    });
  }

  /* =====================================================
     INISIALISASI GLOBAL HEADER
  ===================================================== */

  async function initializeHeader(placeholder) {
    if (
      placeholder.dataset.khHeaderLoaded === "true" ||
      placeholder.dataset.khHeaderLoading === "true"
    ) {
      return;
    }

    placeholder.dataset.khHeaderLoading = "true";

    const role = (
      placeholder.dataset.role || "customer"
    ).toLowerCase();

    loadStylesheet();

    try {
      const response = await fetch(getHeaderUrl(), {
        cache: "no-cache"
      });

      if (!response.ok) {
        throw new Error("File header.html tidak dapat dimuat.");
      }

      placeholder.innerHTML = await response.text();

      const root = placeholder.querySelector("[data-kh-header-root]");

      if (!root) {
        throw new Error("Struktur Global Header tidak ditemukan.");
      }

      renderMenu(root, role);
      bindOwnerIdentityEvents(root, role);
      bindEvents(root, role);

      /* LOGO RESMI HANYA UNTUK NON-OWNER */

      if (role !== "owner") {
        loadOfficialLogo(root);
      }

      refreshIcons(root);

      placeholder.dataset.khHeaderLoaded = "true";

    } catch (error) {
      console.error("[KopiHub Header]", error);

      placeholder.innerHTML = `
        <div style="
          padding:16px;
          color:#FAF9F5;
          background:#123B2C;
          font:600 13px sans-serif;
        ">
          Header KopiHub belum dapat dimuat.
        </div>
      `;

    } finally {
      placeholder.dataset.khHeaderLoading = "false";
    }
  }

  /* =====================================================
     MENJALANKAN GLOBAL HEADER
  ===================================================== */

  function start() {
    document
      .querySelectorAll("[data-kopihub-header]")
      .forEach(placeholder => {
        initializeHeader(placeholder);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {
      once: true
    });
  } else {
    start();
  }

  /* =====================================================
     API GLOBAL HEADER
  ===================================================== */

  window.KopiHubHeader = {
    version: HEADER_VERSION,

    open() {
      const root = document.querySelector("[data-kh-header-root]");
      if (root) openMenu(root);
    },

    close() {
      const root = document.querySelector("[data-kh-header-root]");
      if (root) closeMenu(root);
    },

    setShopName(name) {
      window.KopiHubOwnerShopName = String(name || "");

      const root = document.querySelector("[data-kh-header-root]");

      if (root?.classList.contains("kh-header-owner-layout")) {
        setShopName(root, name);
      }
    },

    setShopLogo(url) {
      window.KopiHubOwnerShopLogo = String(url || "");

      const root = document.querySelector("[data-kh-header-root]");

      if (root?.classList.contains("kh-header-owner-layout")) {
        setShopLogo(root, url);
      }
    }
  };

})();
