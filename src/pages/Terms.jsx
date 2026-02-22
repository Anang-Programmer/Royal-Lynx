/**
 * Terms.jsx — Halaman Syarat & Ketentuan
 *
 * Menampilkan 5 poin syarat & ketentuan penggunaan layanan Royal Lynx.
 * Konten static — tidak terhubung ke logic atau API apapun.
 */
import React from 'react';
import { ScrollText } from 'lucide-react';

const Terms = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                    <ScrollText className="text-indigo-600" />
                    Syarat & Ketentuan
                </h1>
                <p className="text-gray-500 text-sm">Terakhir diperbarui: 17 Feb 2026</p>
            </div>

            <div className="space-y-8 text-gray-600 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. Pendahuluan</h2>
                    <p>
                        Selamat datang di Royal Lynx. Dengan mengakses dan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh isi Syarat & Ketentuan ini. Jika Anda tidak menyetujui salah satu bagian, mohon untuk tidak melanjutkan penggunaan layanan.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. Akun Pengguna</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Anda wajib memberikan informasi yang akurat saat mendaftar.</li>
                        <li>Anda bertanggung jawab menjaga kerahasiaan password akun Anda.</li>
                        <li>Royal Lynx berhak memblokir akun yang terindikasi melakukan kecurangan.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. Transaksi Pembelian</h2>
                    <p>
                        Harga yang tertera adalah harga final. Kesalahan harga akibat bug sistem akan dikonfirmasi ulang kepada pembeli sebelum pesanan diproses. Pembayaran wajib diselesaikan dalam waktu 1x24 jam.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;