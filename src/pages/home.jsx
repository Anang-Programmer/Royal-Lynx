/**
 * home.jsx — Halaman Utama Katalog Produk
 *
 * Fitur:
 * - Hero Banner (disembunyikan saat search aktif)
 * - Filter kategori: tombol pills dari kategori unik produk (local state, BUKAN ShopContext)
 * - Sort produk: Harga rendah-tinggi, tinggi-rendah, nama A-Z (local state)
 * - Skeleton loading: 8 placeholder card animate-pulse saat API loading
 * - Grid responsif: 2 kolom (mobile), 3 (tablet), 4 (desktop)
 * - Empty state saat tidak ada produk ditemukan
 *
 * Catatan: Filter & sort menggunakan useState + useMemo LOKAL.
 *          ShopContext hanya dipakai untuk filterProducts, searchQuery, dan loading.
 */

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/features/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import { useShop } from "../hooks/useShop";
import Hero from "../components/layout/Hero";


const Home = () => {
  const { filterProducts, searchQuery, loading } = useShop();

  // --- LOCAL STATE untuk filter & sort---
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");

  // Daftar kategori unik dari produk
  const categories = useMemo(() => {
    const cats = filterProducts.map((p) => p.category);
    return ["Semua", ...new Set(cats)];
  }, [filterProducts]);

  // Filter & sort produk secara lokal
  const displayedProducts = useMemo(() => {
    let result = [...filterProducts];

    // Filter by category
    if (selectedCategory !== "Semua") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filterProducts, selectedCategory, sortBy]);

  return (
    <>
      {!searchQuery && <Hero />}

      <div id="catalog-section" className="container mx-auto px-4 py-8">

        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Hasil pencarian: "${searchQuery}"` : "Rekomendasi Pilihan"}
          </h2>
          {!searchQuery && <span className="text-gray-500 text-sm hidden sm:block">Menampilkan {displayedProducts.length} produk terbaik</span>}
        </div>

        {/* FILTER & SORT CONTROLS */}
        {!loading && filterProducts.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all cursor-pointer ${selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {cat === "Semua" ? "Semua" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 min-w-fit">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-gray-100 border-none rounded-lg py-2 px-3 text-gray-700 cursor-pointer focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="default">Urutkan</option>
                <option value="price-asc">Harga: Rendah - Tinggi</option>
                <option value="price-desc">Harga: Tinggi - Rendah</option>
                <option value="name-asc">Nama: A - Z</option>
              </select>
            </div>

          </div>
        )}

        {/* SKELETON LOADING */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-lg">Produk tidak ditemukan bro.</p>
            <p className="text-sm">Coba kata kunci lain ya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Home;