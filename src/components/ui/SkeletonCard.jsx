/**
 * SkeletonCard.jsx — Placeholder Kartu Produk saat Loading
 *
 * Menampilkan kartu placeholder dengan animasi pulse (animate-pulse)
 * yang meniru layout ProductCard: gambar, judul, deskripsi, harga, dan 2 tombol.
 *
 * Digunakan di: home.jsx (8 kartu ditampilkan saat loading === true)
 *
 * Responsif: Ukuran elemen mengikuti breakpoint yang sama dengan ProductCard
 * (h-36/h-48 untuk gambar, p-3/p-4 untuk padding, flex-col/flex-row untuk tombol)
 */
import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden animate-pulse">
            {/* Skeleton Gambar */}
            <div className="h-36 sm:h-48 bg-gray-200"></div>

            {/* Skeleton Konten */}
            <div className="p-3 sm:p-4 flex flex-col grow">
                <div className="h-4 sm:h-5 bg-gray-200 rounded-full w-3/4 mb-2 sm:mb-3"></div>
                <div className="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full w-2/3 mb-3 sm:mb-4"></div>

                <div className="h-5 sm:h-7 bg-gray-200 rounded-full w-1/3 mb-3 sm:mb-4"></div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-auto">
                    <div className="h-8 sm:h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-8 sm:h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
