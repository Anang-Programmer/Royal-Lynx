/**
 * 404.jsx — Halaman Not Found (Catch-All Route)
 *
 * Ditampilkan untuk semua URL yang tidak valid via catch-all route `path="*"`.
 *
 * Menampilkan:
 * - Angka "404" besar dengan ikon SearchX
 * - Judul "Halaman Tidak Ditemukan" + deskripsi
 * - Tombol "Kembali ke Beranda" → navigasi ke /
 * - Tombol "Halaman Sebelumnya" → navigate(-1)
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, SearchX, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

            {/* Ikon & Angka 404 */}
            <div className="relative mb-8">
                <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-indigo-50 p-5 rounded-full shadow-lg shadow-indigo-100">
                        <SearchX size={48} className="text-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Teks */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Halaman Tidak Ditemukan
            </h2>
            <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
                Waduh, halaman yang kamu cari sepertinya tidak ada atau sudah dipindahkan.
                Yuk balik ke halaman utama!
            </p>

            {/* Tombol Navigasi */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                    <Home size={20} />
                    Kembali ke Beranda
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                >
                    <ArrowLeft size={20} />
                    Halaman Sebelumnya
                </button>
            </div>

        </div>
    );
};

export default NotFound;
