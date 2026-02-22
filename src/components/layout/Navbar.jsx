/**
 * Navbar.jsx — Navigasi Sticky (Glassmorphism)
 *
 * Komponen navigasi utama yang selalu terlihat di atas halaman.
 *
 * Fitur:
 * - Logo "Royal Lynx" dengan ikon ShoppingBag (gradient indigo-violet)
 * - Search bar desktop: real-time filter produk via setSearchQuery
 * - Search bar mobile: toggle show/hide dengan tombol Search/X
 * - Link navigasi: Home, History, Cart (+ badge), Wishlist (+ badge)
 * - Dark mode toggle: tombol Moon/Sun yang toggle class "dark" di <html>
 *   - Preferensi disimpan ke localStorage('theme')
 *   - Smooth transition 0.3s via class 'dark-transition'
 * - Profile dropdown: avatar "JP" → ProfileDropdown component
 *
 * Data: wishlist, cart, searchQuery, setSearchQuery dari ShopContext
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, History, Search, User, X, Moon, Sun } from 'lucide-react';
import { useShop } from '../../hooks/useShop';
import Badge from '../ui/Badge';
import { ShoppingCart } from 'lucide-react';
import ProfileDropdown from '../ui/ProfileDropdown';

const Navbar = () => {
    const { wishlist, cart, searchQuery, setSearchQuery } = useShop();
    const location = useLocation();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark');
    });

    const toggleDarkMode = () => {
        document.documentElement.classList.add('dark-transition');
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
        setTimeout(() => document.documentElement.classList.remove('dark-transition'), 300);
    };

    const isActive = (path) => {
        return location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:text-indigo-600 hover:bg-gray-50";
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* 1. LOGO */}
                <Link to="/" className="flex items-center gap-2 group min-w-fit">
                    <div className="bg-indigo-600 p-1.5 rounded-lg transform transition-transform group-hover:rotate-12">
                        <ShoppingBag className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600 hidden sm:block">
                        Royal Lynx
                    </span>
                </Link>

                <div className="flex-1 max-w-md hidden sm:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari produk impian..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-100 text-sm py-2 pl-10 pr-4 rounded-full border-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">

                    <button
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    <Link to="/" className={`p-2 rounded-full transition-all ${isActive('/')}`} title="Catalog">
                        <ShoppingBag size={20} />
                    </Link>

                    <Link to="/history" className={`p-2 rounded-full transition-all ${isActive('/history')}`} title="History">
                        <History size={20} />
                    </Link>

                    <Link
                        to="/cart"
                        className={`relative p-2 rounded-full transition-all ${isActive('/cart')}`}
                        title="My Cart"
                    >
                        <ShoppingCart size={22} />
                        <Badge count={cart.length} />
                    </Link>

                    <Link
                        to="/wishlist"
                        className={`relative p-2 rounded-full transition-all ${isActive('/wishlist')}`}
                        title="My Wishlist"
                    >
                        <Heart size={22} />
                        <Badge count={wishlist.length} />
                    </Link>

                    {/* DARK MODE TOGGLE */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* 4. USER PROFILE (Hiasan) */}
                    <div className="pl-2 ml-2 border-l border-gray-200 relative">
                        {/* 'relative' di sini PENTING agar dropdown posisinya pas di bawah avatar */}

                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle Buka/Tutup
                            className="cursor-pointer flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md transform hover:scale-105 transition-transform">
                                JP
                            </div>
                        </button>

                        {/* 5. Render Dropdown */}
                        <ProfileDropdown
                            isOpen={isProfileOpen}
                            onClose={() => setIsProfileOpen(false)}
                        />
                    </div>

                </div>

            </div>

            {/* 6. MOBILE SEARCH BAR (Muncul di bawah navbar saat tombol search diklik) */}
            {isMobileSearchOpen && (
                <div className="sm:hidden px-4 pb-3 animate-in slide-in-from-top duration-200">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari produk impian..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className="w-full bg-gray-100 text-sm py-2.5 pl-10 pr-4 rounded-full border-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;