/**
 * ProductDetail.jsx — Halaman Detail Produk
 *
 * Menampilkan informasi lengkap satu produk berdasarkan URL param :id
 *
 * Fitur:
 * - Gambar besar dengan hover zoom (object-contain, mix-blend-multiply)
 * - Badge kategori + rating bintang dengan jumlah ulasan
 * - Judul, harga, dan deskripsi lengkap
 * - Quantity selector (plus/minus) dengan state lokal
 * - Tombol "Add to Cart" dengan preview total harga (price × qty)
 * - Tombol Wishlist (toggle add/remove, ikon berubah saat aktif)
 * - Info pengiriman cepat & garansi resmi (static UI pemanis)
 * - Loading state: menampilkan LoadingSpinner saat data belum ready
 * - Guard: menampilkan pesan "Produk tidak ditemukan" jika ID tidak valid
 *
 * Data: products, wishlist, addToCart, addToWishlist, removeFromWishlist dari ShopContext
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, ShoppingBag, Heart, Minus, Plus, Star,
    Truck, ShieldCheck
} from "lucide-react";
import { useShop } from "../hooks/useShop";
import { formatCurrency } from "../utils/formatters";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading, addToWishlist, removeFromWishlist, wishlist, addToCart } = useShop();

    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (products.length > 0) {
            const found = products.find((p) => p.id == id);
            setProduct(found);
        }
    }, [id, products]);

    // --- GUARD ---
    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;

    if (!product && products.length > 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900">Produk tidak ditemukan</h2>
                <button onClick={() => navigate('/')} className="text-indigo-600 mt-4 font-medium hover:underline">
                    Kembali ke Katalog
                </button>
            </div>
        );
    }

    if (!product) return null;

    const isWishlisted = wishlist.some((item) => item.id === product.id);

    // --- HANDLERS ---
    const handleQty = (type) => {
        if (type === "plus") setQty((prev) => prev + 1);
        else if (qty > 1) setQty((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if (!product || !product.id) return;
        addToCart(product, qty);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">

            {/* Tombol Kembali */}
            <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors w-fit"
            >
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="font-medium text-sm">Kembali</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* 1. KOLOM KIRI: GAMBAR (Fokus Besar) */}
                <div className="sticky top-24">
                    <div className="aspect-square bg-gray-50 rounded-3xl p-8 md:p-12 flex items-center justify-center border border-gray-100 relative overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>

                {/* 2. KOLOM KANAN: INFO PRODUK */}
                <div className="flex flex-col h-full py-2">

                    {/* Kategori & Rating */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-amber-700">{product.rating?.rate}</span>
                            <span className="text-xs text-amber-600/60">({product.rating?.count} ulasan)</span>
                        </div>
                    </div>

                    {/* Judul */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {product.title}
                    </h1>

                    {/* Harga */}
                    <div className="flex items-end gap-3 mb-8 border-b border-gray-100 pb-8">
                        <span className="text-4xl font-bold text-gray-900 tracking-tight">
                            {formatCurrency(product.price)}
                        </span>
                        <span className="text-sm text-gray-500 mb-2 font-medium">/ pcs</span>
                    </div>

                    {/* Deskripsi */}
                    <div className="mb-8 space-y-3">
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Deskripsi Produk</h3>
                        <p className="text-gray-500 leading-relaxed text-base">
                            {product.description}
                        </p>
                    </div>

                    {/* Info Tambahan (Static UI - Pemanis) */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <Truck size={20} className="text-gray-400" />
                            <span className="text-sm text-gray-600 font-medium">Pengiriman Cepat</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <ShieldCheck size={20} className="text-gray-400" />
                            <span className="text-sm text-gray-600 font-medium">Garansi Resmi</span>
                        </div>
                    </div>

                    {/* ACTION BUTTONS (Sticky di Mobile biar gampang) */}
                    <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4">

                        {/* Qty Selector */}
                        <div className="flex items-center justify-between bg-white border-2 border-gray-100 rounded-xl px-4 h-14 w-full sm:w-40">
                            <button onClick={() => handleQty('minus')} disabled={qty <= 1} className="p-1 hover:text-indigo-600 disabled:opacity-30 transition-colors">
                                <Minus size={20} />
                            </button>
                            <span className="font-bold text-lg text-gray-900">{qty}</span>
                            <button onClick={() => handleQty('plus')} className="p-1 hover:text-indigo-600 transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>

                        {/* Add to Cart */}
                        {/* Add to Cart / Beli Sekarang */}
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 h-14 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200 active:scale-[0.98]"
                        >
                            <ShoppingBag size={20} />
                            <span>Add to Cart</span>

                            {/* --- INI YANG DITAMBAHKAN LAGI --- */}
                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-normal border border-white/10">
                                {formatCurrency(product.price * qty)}
                            </span>
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                            className={`h-14 w-14 flex items-center justify-center rounded-xl border-2 transition-all shrink-0 ${isWishlisted
                                ? "border-rose-100 bg-rose-50 text-rose-500"
                                : "border-gray-100 text-gray-400 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50"}`}
                        >
                            <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;