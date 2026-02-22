/**
 * SearchResults.jsx — Overlay Hasil Pencarian Produk
 *
 * Ditampilkan MENGGANTIKAN routing biasa saat searchQuery tidak kosong (lihat App.jsx).
 *
 * Fitur:
 * - Menampilkan judul "Hasil pencarian: ..." dengan jumlah produk ditemukan
 * - Grid produk menggunakan ProductCard (2 kolom mobile, 4 desktop)
 * - Empty state jika tidak ada produk yang cocok
 *
 * Data: filterProducts, searchQuery dari ShopContext
 */
import React from 'react';
import { useShop } from '../hooks/useShop';
import ProductCard from '../components/features/ProductCard';
import { Search } from 'lucide-react';

const SearchResults = () => {
    const { filterProducts, searchQuery } = useShop();

    return (
        <div className="container mx-auto px-4 py-8 animate-in fade-in duration-300">

            {/* Header Pencarian */}
            <div className="mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Search className="text-indigo-600" />
                    Hasil Pencarian: "{searchQuery}"
                </h2>
                <p className="text-gray-500 mt-1">
                    Menemukan {filterProducts.length} produk yang cocok.
                </p>
            </div>

            {/* Grid Produk */}
            {filterProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Produk tidak ditemukan</h3>
                    <p className="text-gray-500">Coba gunakan kata kunci lain.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filterProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;