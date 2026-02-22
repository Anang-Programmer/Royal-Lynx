/**
 * ProductCard.jsx — Kartu Produk (Reusable Component)
 *
 * Digunakan di: Home, SearchResults, Wishlist
 *
 * Menampilkan:
 * - Gambar produk (object-contain, hover zoom)
 * - Tombol Wishlist (heart icon, toggle add/remove)
 * - Judul produk (1 baris, line-clamp-1)
 * - Deskripsi singkat (2 baris, line-clamp-2)
 * - Harga (formatCurrency)
 * - Tombol "Detail" → navigasi ke /product/:id
 * - Tombol "Cart" → addToCart()
 *
 * Responsif:
 * - Mobile: gambar lebih kecil (h-36), tombol stack vertikal, label pendek
 * - Desktop: gambar h-48, tombol horizontal, label lengkap
 *
 * Props: product { id, title, description, price, image, category, rating }
 */

import React from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../hooks/useShop";
import { formatCurrency } from "../../utils/formatters";


const ProductCard = ({ product }) => {

    if (!product) return null

    const navigate = useNavigate();

    const { addToWishlist, removeFromWishlist, wishlist, addToCart } = useShop();
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    const handleWishListClick = () => {
        // e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleDetailProduct = () => {
        navigate(`/product/${product.id}`);
    }



    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden group">

            {/* Bagian Gambar */}

            <div className="relative h-36 sm:h-48 p-3 sm:p-4 bg-white flex items-center justify-center overflow-hidden ">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" />

                {/* Bagian Wishlist */}
                <button
                    onClick={handleWishListClick}
                    className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full shadow-md transition-colors duration-200 ${isWishlisted
                        ? "bg-rose-100 text-rose-500"
                        : "bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                        }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                    <Heart size={16} className={`sm:w-5 sm:h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
            </div>

            {/* Bagian Bawah */}

            <div className="p-3 sm:p-4 flex flex-col grow">

                <h3 className="text-gray-800 font-bold text-sm sm:text-lg leading-tight line-clamp-1 mb-1" title={product.title}>
                    {product.title}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 grow">
                    {product.description}
                </p>

                <div className="mb-3 sm:mb-4">
                    <span className="text-base sm:text-xl font-bold text-gray-900">
                        {formatCurrency(product.price)}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDetailProduct();
                        }}
                        className="cursor-pointer w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-transparent border border-gray-900 text-gray-900 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-transform active:scale-95 hover:bg-gray-800 hover:text-white"
                    >
                        <Eye size={14} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="hidden sm:inline">Detail Product</span>
                        <span className="sm:hidden">Detail</span>
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="cursor-pointer w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-900 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-transform active:scale-95 hover:bg-gray-800"
                    >
                        <ShoppingBag size={14} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Cart</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard