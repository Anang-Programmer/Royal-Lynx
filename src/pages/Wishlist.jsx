/**
 * Wishlist.jsx — Halaman Daftar Keinginan
 *
 * Menampilkan semua produk yang sudah di-wishlist oleh pengguna.
 *
 * Fitur:
 * - Grid produk wishlist menggunakan ProductCard (2 kolom mobile, 4 desktop)
 * - Badge counter jumlah wishlist
 * - Empty state dengan animasi pulse jika wishlist kosong
 * - Tombol "Mulai Belanja" untuk kembali ke katalog
 *
 * Data: wishlist dari ShopContext
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useShop } from '../hooks/useShop';
import ProductCard from '../components/features/ProductCard';

const Wishlist = () => {
  const { wishlist } = useShop();

  // --- STATE 1: KALAU WISHLIST KOSONG ---
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-rose-50 p-6 rounded-full mb-6 animate-pulse">
          <Heart size={64} className="text-rose-300 fill-rose-100" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Wishlist kamu masih kosong
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Kayaknya kamu belum nemu barang idaman nih. Yuk cari produk keren di katalog!
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1"
        >
          <ArrowLeft size={20} />
          Kembali Belanja
        </Link>
      </div>
    );
  }

  // --- STATE 2: KALAU ADA ISINYA ---
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-gray-500 mt-1">
            Ada {wishlist.length} barang yang kamu impikan
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft size={18} />
          Lanjut Belanja
        </Link>
      </div>

      {/* Grid Produk */}
      {/* Kita reuse ProductCard karena fiturnya sama persis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;