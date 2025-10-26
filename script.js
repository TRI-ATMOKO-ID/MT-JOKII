// script.js
function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      Swal.fire({
        title: "Kirim ke WhatsApp?",
        text: "Data akan dikirim ke MT JOKII via WhatsApp.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ff914d",
        cancelButtonColor: "#888",
        confirmButtonText: "Ya, kirim sekarang!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          const randomId = generateRandomId(6);
          const formData = Object.fromEntries(new FormData(form));
          formData.random_id = randomId;

          const message = `Halo MT JOKII, saya ingin memesan:\n
*Identitas Pembeli*
🔑 ID Pelanggan: *#MT-${formData.random_id}*
📌 Nama: ${formData.nama}
📱 No WA: ${formData.no_wa}\n
*Detail Pesanan*
📚 Judul Makalah: ${formData.judul_makalah}
${formData.sub_bab ? `🔹 Sub Bab: ${formData.sub_bab}` : ""}
👨‍🏫 Dosen Pengampu: ${formData.dosen_pengampu}
🎓 Mata Kuliah: ${formData.mata_kuliah}
${
  formData.penyusun_individu
    ? `👤 Penyusun Individu: ${formData.penyusun_individu}`
    : ""
}
${
  formData.penyusun_kelompok
    ? `👥 Penyusun Kelompok: ${formData.penyusun_kelompok}`
    : ""
}
🏫 Asal Sekolah: ${formData.asal_sekolah}
📖 Jurusan: ${formData.jurusan}
${formData.tambahan ? `💡 Tambahan: ${formData.tambahan}` : ""}
*Mohon konfirmasi ketersediaannya. Terima kasih.*`;

          const whatsappUrl = `https://wa.me/6285934861212?text=${encodeURIComponent(
            message
          )}`;
          window.open(whatsappUrl, "_blank");

          form.reset(); // reset tetap dilakukan
        }
      });
    });
  });
});

