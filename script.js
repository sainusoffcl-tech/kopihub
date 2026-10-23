
document.addEventListener("DOMContentLoaded", () => {
  // Tahun footer mengikuti tahun saat ini.
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Pesan sambutan saat pelanggan membuka menu.
  const menuLinks = document.querySelectorAll(
    'a[href="menu.html"]'
  );

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Pelanggan membuka menu coffee shop.");
    });
  });

  // Tombol daftar mitra: contoh interaksi sementara.
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
