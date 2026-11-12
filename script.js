
document.addEventListener("DOMContentLoaded", () => {
  // Tahun footer otomatis.
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Aktivitas pelanggan membuka menu.
  const menuLinks = document.querySelectorAll(
    'a[href="menu.html"]'
  );

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Pelanggan membuka menu coffee shop.");
    });
  });

  // Tombol pendaftaran mitra.
  const partnerButton = document.querySelector(
    "[data-partner-button]"
  );

  if (partnerButton) {
    partnerButton.addEventListener("click", () => {
      alert(
        "Terima kasih atas minat Anda! Fitur pendaftaran mitra akan segera tersedia."
      );
    });
  }
});

/* ===== KONFIGURASI SUPABASE KOPIHUB ===== */

const KOPIHUB_SUPABASE_URL =
  "https://ozcliasebeydgyvgluht.supabase.co";

const KOPIHUB_SUPABASE_KEY =
  "sb_publishable_X3z6XFroL-eNdwB14y6dYw_81dvj1yN";

/* ===== KLIEN SUPABASE ===== */

if (!window.supabase) {
  console.error("Library Supabase belum dimuat.");
} else {
  const kopihubSupabaseClient =
    window.supabase.createClient(
      KOPIHUB_SUPABASE_URL,
      KOPIHUB_SUPABASE_KEY
    );

  console.log("KopiHub: klien Supabase berhasil dibuat.");

  /* ===== TES KONEKSI DATABASE ===== */

  async function tesKoneksiKopiHub() {
    const status = document.createElement("div");

    status.style.cssText =
      "position:fixed;bottom:12px;left:12px;right:12px;" +
      "z-index:99999;padding:14px;border-radius:10px;" +
      "background:#123b2a;color:white;font:14px sans-serif;" +
      "text-align:center;";

    status.textContent =
      "Memeriksa koneksi database KopiHub...";

    document.body.appendChild(status);

    try {
      const { data, error } =
        await kopihubSupabaseClient
          .from("kh_shops")
          .select("id")
          .limit(1);

      if (error) throw error;

      status.textContent =
        "Tes berhasil: KopiHub dapat membaca tabel kh_shops.";

      status.style.background = "#174c38";

      console.log("Koneksi database berhasil.", data);

    } catch (err) {
      status.textContent =
        "Koneksi database gagal: " +
        (err.message || "Kesalahan tidak diketahui.");

      status.style.background = "#8b2525";

      console.error("Tes koneksi gagal:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      tesKoneksiKopiHub
    );
  } else {
    tesKoneksiKopiHub();
  }
}
