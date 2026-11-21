/* =========================================
   KOPIHUB - GLOBAL FOOTER
   Versi: 1.0.3
========================================= */

(() => {
  "use strict";

  const FOOTER_VERSION = "1.0.3";

  const FOOTER_HTML =
    "/kopihub/components/footer.html";

  const FOOTER_CSS =
    "/kopihub/css/footer.css?v=" + FOOTER_VERSION;

  const SUPABASE_URL =
    "https://ozcliasebeydgyvgluht.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_X3z6XFroL-eNdwB14y6dYw_81dvj1yN";


  /* =========================================
     KONFIGURASI TAUTAN RESMI KOPIHUB
  ========================================= */

  const FOOTER_LINKS = {
    instagram: "https://www.instagram.com/USERNAME_INSTAGRAM/",
    email: "mailto:EMAIL_RESMI_KOPIHUB"
  };


  /* =========================================
     MEMUAT CSS
  ========================================= */

  function loadFooterCSS() {
    if (document.querySelector("[data-kopihub-footer-css]")) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FOOTER_CSS;
    link.dataset.kopihubFooterCss = "true";

    document.head.appendChild(link);
  }


  /* =========================================
     MEMUAT LOGO RESMI DARI SUPABASE
  ========================================= */

  async function loadOfficialLogo(footer) {
    const logo = footer.querySelector("#kh-footer-logo-image");

    if (!logo) {
      console.error(
        "KopiHub: Elemen gambar logo tidak ditemukan."
      );
      return;
    }

    try {
      const response = await fetch(
        SUPABASE_URL + "/rest/v1/rpc/kh_get_platform_logo_path",
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": "Bearer " + SUPABASE_KEY,
            "Content-Type": "application/json"
          },
          body: "{}"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal mengambil lokasi logo dari Supabase."
        );
      }

      const logoPath = await response.json();

      if (!logoPath || typeof logoPath !== "string") {
        logo.hidden = true;
        return;
      }

      const encodedPath = logoPath
        .split("/")
        .map(encodeURIComponent)
        .join("/");

      const publicURL =
        SUPABASE_URL +
        "/storage/v1/object/public/platform-assets/" +
        encodedPath;

      logo.onload = () => {
        logo.hidden = false;

        console.info(
          "KopiHub: Logo resmi berhasil ditampilkan."
        );
      };

      logo.onerror = () => {
        logo.hidden = true;

        console.error(
          "KopiHub: Foto logo gagal ditampilkan."
        );
      };

      logo.hidden = true;
      logo.src = publicURL;

    } catch (error) {
      console.error(
        "KopiHub: Logo footer gagal dimuat.",
        error
      );

      logo.hidden = true;
    }
  }


  /* =========================================
     MENGAKTIFKAN TAUTAN INSTAGRAM DAN EMAIL
  ========================================= */

  function setupFooterLinks(footer) {
    const instagram = footer.querySelector(
      '[data-footer-social="instagram"]'
    );

    const email = footer.querySelector(
      '[data-footer-social="email"]'
    );

    if (instagram) {
      instagram.href = FOOTER_LINKS.instagram;
      instagram.target = "_blank";
      instagram.rel = "noopener noreferrer";
      instagram.removeAttribute("aria-disabled");
    }

    if (email) {
      email.href = FOOTER_LINKS.email;
      email.removeAttribute("aria-disabled");
    }
  }


  /* =========================================
     MEMUAT FOOTER HTML
  ========================================= */

  async function loadFooter() {
    const placeholders = document.querySelectorAll(
      "[data-kopihub-footer]"
    );

    if (!placeholders.length) return;

    loadFooterCSS();

    try {
      const response = await fetch(FOOTER_HTML, {
        cache: "no-cache"
      });

      if (!response.ok) {
        throw new Error(
          "File footer.html tidak ditemukan."
        );
      }

      const html = await response.text();

      placeholders.forEach((placeholder) => {
        if (placeholder.dataset.footerLoaded === "true") {
          return;
        }

        placeholder.innerHTML = html;
        placeholder.dataset.footerLoaded = "true";

        const footer = placeholder.querySelector(
          ".kh-global-footer"
        );

        if (!footer) return;

        footer.querySelectorAll("[data-year]").forEach((element) => {
          element.textContent = new Date().getFullYear();
        });

        setupFooterLinks(footer);

        loadOfficialLogo(footer);
      });

    } catch (error) {
      console.error(
        "KopiHub: Footer gagal dimuat.",
        error
      );
    }
  }


  /* =========================================
     MENJALANKAN FOOTER
  ========================================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFooter);
  } else {
    loadFooter();
  }

})();
