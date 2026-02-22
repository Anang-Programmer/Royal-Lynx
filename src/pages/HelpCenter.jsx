/**
 * HelpCenter.jsx — Halaman Pusat Bantuan (FAQ)
 *
 * Menampilkan 6 pertanyaan umum (FAQ) dengan format Q&A.
 * Termasuk link chat WhatsApp ke Customer Service.
 * Konten static — tidak terhubung ke logic atau API apapun.
 */
import React from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';

const HelpCenter = () => {
  // Data Pertanyaan & Jawaban (Ini Faq Dummy ya kak hehe 😊)
  const faqs = [
    {
      q: "Bagaimana cara melacak pesanan saya?",
      a: "Gampang banget! Buka menu 'Riwayat Pesanan', pilih pesananmu, dan status pengiriman terkini akan muncul di detail pesanan."
    },
    {
      q: "Apakah bisa bayar di tempat (COD)?",
      a: "Tentu bisa. Kami menyediakan fitur COD untuk wilayah Jabodetabek dan kota-kota besar di Indonesia. Pastikan nomor HP aktif ya!"
    },
    {
      q: "Berapa lama pengiriman barang?",
      a: "Untuk dalam kota (Medan) biasanya 1-2 hari. Luar kota estimasi 3-5 hari kerja, tergantung ekspedisi yang kamu pilih pas checkout."
    },
    {
      q: "Barang saya rusak/salah, gimana cara returnya?",
      a: "Tenang, kamu punya waktu 2x24 jam setelah barang sampai. Kirim video unboxing ke CS kami, nanti kami bantu proses tukar baru atau refund."
    },
    {
      q: "Apakah produk di Royal Lynx original?",
      a: "100% Original. Kami cuma ambil barang dari distributor resmi. Kalau terbukti palsu, uang kembali 2x lipat."
    },
    {
      q: "Lupa password akun, harus gimana?",
      a: "Klik tombol 'Lupa Password' di halaman login, masukkan email kamu, dan ikuti link reset yang kami kirim ke email."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">

      {/* Header Halaman */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-indigo-50 rounded-full mb-4">
          <HelpCircle size={40} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pusat Bantuan
        </h1>
        <p className="text-gray-500">
          Cari jawaban dari pertanyaan yang sering diajukan di sini.
        </p>
      </div>

      {/* List FAQ */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                Q
              </span>
              {item.q}
            </h3>
            <div className="flex gap-3 pl-9">
              <div className="w-1 bg-gray-200 rounded-full shrink-0"></div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Kotak Kontak CS (Kalau belum puas) */}
      <div className="mt-12 bg-gray-900 text-white p-8 rounded-3xl text-center shadow-xl">
        <h3 className="text-xl font-bold mb-2">Masih belum nemu jawabannya?</h3>
        <p className="text-gray-400 mb-6 text-sm">Tim support kami siap bantuin kamu sampai tuntas.</p>

        <button
          onClick={() => window.open('https://wa.me/+6285762604597', '_blank')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <MessageCircle size={20} />
          Chat Customer Service
        </button>
      </div>

    </div>
  );
};

export default HelpCenter;