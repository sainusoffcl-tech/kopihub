
/* =========================================
   KOPIHUB - GLOBAL FOOTER
   FOOTER HTML + CSS + OFFICIAL LOGO
========================================= */

(() => {
  "use strict";

  const FOOTER_HTML =
    "/kopihub/components/footer.html";

  const FOOTER_CSS =
    "/kopihub/css/footer.css";

  const SUPABASE_URL =
    "https://ozcliasebeydgyvgluht.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_X3z6XFroL-eNdwB14y6dYw_81dvj1yN";


  /* =========================================
     MEMUAT CSS
  ========================================= */

  function loadFooterCSS() {
    if (
      document.querySelector(
        "[data-kopihub-footer-css]"
      )
    ) {
      return;
    }

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = FOOTER_CSS;
    link.dataset.kopihubFooterCss = "true";

    document.head.appendChild(link);
  }


  /* =========================================
     MEMUAT LOGO RESMI KOPIHUB
  ========================================= */

  async function loadOfficialLogo(footer) {
    const logo = footer.querySelector(
      "#kh-footer-logo-image"
    );

    const fallback = footer.querySelector(
      "#kh-footer-logo-fallback"
    );

    if (!logo || !fallback) {
      return;
    }

    function showFallback() {
      logo.hidden = true;
      logo.removeAttribute("src");
      fallback.hidden = false;
    }

    try {
      const response = await fetch(
        SUPABASE_URL +
        "/rest/v1/rpc/kh_get_platform_logo_path",
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
          "Gagal mengambil alamat logo dari Supabase."
        );
      }

      const logoPath = await response.json();

      if (
        typeof logoPath !== "string" ||
        !logoPath.trim()
      ) {
        showFallback();
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
        fallback.hidden = true;
      };

      logo.onerror = () => {
        console.error(
          "KopiHub: File logo tidak berhasil dimuat."
        );

        showFallback();
      };

      logo.hidden = true;
      fallback.hidden = false;

      logo.src = publicURL;

    } catch (error) {
      console.error(
        "KopiHub: Logo footer gagal dimuat.",
        error
      );

      showFallback();
    }
  }


  /* =========================================
     MEMUAT FOOTER HTML
  ========================================= */

  async function loadFooter() {
    const placeholders = document.querySelectorAll(
      "[data-kopihub-footer]"
    );

    if (!placeholders.length) {
      return;
    }

    loadFooterCSS();

    try {
      const response = await fetch(
        FOOTER_HTML,
        {
          cache: "no-cache"
        }
      );

      if (!response.ok) {
        throw new Error(
          "File components/footer.html tidak ditemukan."
        );
      }

      const html = await response.text();

      placeholders.forEach((placeholder) => {

        if (
          placeholder.dataset.footerLoaded === "true"
        ) {
          return;
        }

        placeholder.innerHTML = html;

        const footer = placeholder.querySelector(
          ".kh-global-footer"
        );

        if (!footer) {
          return;
        }

        placeholder.dataset.footerLoaded = "true";

        /* TAHUN OTOMATIS */

        footer.querySelectorAll(
          "[data-year]"
        ).forEach((element) => {
          element.textContent =
            new Date().getFullYear();
        });

        /* LOGO RESMI */

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

    document.addEventListener(
      "DOMContentLoaded",
      loadFooter
    );

  } else {

    loadFooter();

  }

})();
