/**
 * Hero.jsx — Banner Hero + Fitur Layanan
 *
 * Ditampilkan di halaman Home (disembunyikan saat search aktif).
 *
 * Bagian:
 * 1. Hero Banner: gambar background, judul, subjudul, tombol "Belanja Sekarang"
 *    → smooth scroll ke #catalog-section
 * 2. Fitur Layanan (4 kartu): Gratis Ongkir, Garansi Asli, Pengiriman Cepat, Pembayaran Aman
 *    → Static UI pemanis, tidak terhubung ke logic apapun
 */
import React from "react";
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";


const Hero = () => {
    const scrollToCatalog = () => {
        const catalogSection = document.getElementById("catalog-section");

        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div className="w-full">
            {/* --- BANNER UTAMA --- */}
            <div className="relative bg-gray-900 text-white overflow-hidden rounded-3xl mx-4 mt-4 lg:mx-8 lg:mt-6 h-125 shadow-2xl">
                {/* Background Image Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://img.freepik.com/premium-photo/young-man-woman-wearing-fashionable-outfits-street-fashion-designer-hd-image_822642-932.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Content Text */}
                <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
                    <span className="text-indigo-400 font-bold tracking-wider uppercase mb-4 animate-in slide-in-from-left duration-700">
                        Koleksi Terbaru 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Temukan Gaya Unik <br /> Yang <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Mendefinisikanmu</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                        Eksplorasi pilihan fashion, gadget, dan aksesoris terbaik dengan harga yang pas di kantong. Kualitas premium, garansi resmi.
                    </p>

                    <button
                        onClick={scrollToCatalog}
                        className="cursor-pointer w-fit bg-white text-gray-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95"
                    >
                        Belanja Sekarang
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* --- SERVICE FEATURES (Fitur Layanan) --- */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                            <Truck size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">Gratis Ongkir</h3>
                        <p className="text-xs text-gray-500 mt-1">Tanpa minimal belanja</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-emerald-50 p-3 rounded-full mb-3 text-emerald-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">Garansi Asli</h3>
                        <p className="text-xs text-gray-500 mt-1">100% Produk Original</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-amber-50 p-3 rounded-full mb-3 text-amber-600">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">Pengiriman Cepat</h3>
                        <p className="text-xs text-gray-500 mt-1">Sampai dalam 24 jam</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-rose-50 p-3 rounded-full mb-3 text-rose-600">
                            <CreditCard size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">Pembayaran Aman</h3>
                        <p className="text-xs text-gray-500 mt-1">Dukungan Bank Lokal</p>
                    </div>

                </div>
            </div>
        </div>
    )
};


export default Hero;