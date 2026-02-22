/**
 * Badge.jsx — Badge Angka Notifikasi (Reusable)
 *
 * Menampilkan bulatan kecil dengan angka di pojok kanan atas ikon.
 * Otomatis tersembunyi jika count === 0.
 *
 * Digunakan di: Navbar.jsx (di atas ikon Cart dan Wishlist)
 *
 * Props:
 * - count: number → jumlah item (cart.length atau wishlist.length)
 */

import React from "react";

const Badge = ({ count }) => {
    if (!count || count === 0) return null;

    return (
        <div className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white px-1">
            {count > 99 ? '99+' : count}
        </div>
    );
}

export default Badge