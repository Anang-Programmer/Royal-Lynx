/**
 * Privacy.jsx — Halaman Kebijakan Privasi
 *
 * Menampilkan 5 poin kebijakan pengelolaan data pengguna.
 * Konten static — tidak terhubung ke logic atau API apapun.
 */
import React from 'react';
import { Shield } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                    <Shield className="text-indigo-600" />
                    Kebijakan Privasi
                </h1>
                <p className="text-gray-500 text-sm">Kami menghargai privasi data Anda.</p>
            </div>

            <div className="space-y-8 text-gray-600 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. Data yang Kami Kumpulkan</h2>
                    <p>
                        Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, alamat pengiriman, dan nomor telepon saat Anda mendaftar atau melakukan pembelian.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. Penggunaan Data</h2>
                    <p>Data Anda digunakan semata-mata untuk:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Memproses dan mengirimkan pesanan Anda.</li>
                        <li>Mengirimkan notifikasi terkait status transaksi.</li>
                        <li>Meningkatkan layanan dan pengalaman pengguna di website kami.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. Keamanan</h2>
                    <p>
                        Kami menggunakan enkripsi standar industri untuk melindungi informasi sensitif Anda selama transmisi data. Kami tidak akan pernah menjual data pribadi Anda kepada pihak ketiga.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;