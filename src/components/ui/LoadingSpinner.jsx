/**
 * LoadingSpinner.jsx — Animasi Loading Spinner
 *
 * Menampilkan spinner animasi putar (border-spin) di tengah layar.
 * Digunakan sebagai fallback loading saat data belum tersedia.
 *
 * Digunakan di: ProductDetail.jsx (saat products belum di-load)
 */
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm font-medium animate-pulse">Memuat Produk...</p>
    </div>
  );
};

export default LoadingSpinner;