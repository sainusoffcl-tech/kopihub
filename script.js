
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

  /* ===== TES KONEKSI DATABASE TANPA NOTIFIKASI ===== */

  async function tesKoneksiKopiHub() {
    try {
      const { data, error } =
        await kopihubSupabaseClient
          .from("kh_shops")
          .select("id")
          .limit(1);

      if (error) throw error;

      console.log(
        "Koneksi database berhasil. Tabel kh_shops dapat dibaca.",
        data
      );

    } catch (err) {
      console.error(
        "Tes koneksi database gagal:",
        err.message || "Kesalahan tidak diketahui."
      );
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
