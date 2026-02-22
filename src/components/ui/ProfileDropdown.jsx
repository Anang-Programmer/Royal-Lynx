/**
 * ProfileDropdown.jsx — Dropdown Profil Pengguna
 *
 * Ditampilkan saat avatar "JP" di Navbar diklik.
 *
 * Menampilkan:
 * - Nama, email, nomor telepon (static/hardcoded)
 * - Badge "Member Gold"
 * - Tanggal bergabung
 * - Statistik real-time: total pesanan dan total belanja (dihitung dari transactions)
 *
 * Props:
 * - isOpen: boolean → tampilkan/sembunyikan dropdown
 * - onClose: function → tutup dropdown (click outside)
 *
 * Data: transactions dari ShopContext (untuk statistik)
 */
import React from 'react';
import { Mail, Phone, Calendar, Award } from 'lucide-react';
import { useShop } from '../../hooks/useShop';
import { formatCurrency } from '../../utils/formatters';

const ProfileDropdown = ({ isOpen, onClose }) => {
    const { transactions } = useShop();

    if (!isOpen) return null;

    const totalSpent = transactions.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);


    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            />

            <div className="absolute top-14 right-0 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 animate-in slide-in-from-top-2 duration-200 overflow-hidden">

                <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold border-2 border-white/30 shadow-inner">
                            JP
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">Jaka Perdana</h3>
                            <div className="flex items-center gap-1 text-xs text-blue-900 bg-yellow-300 px-2 py-0.5 rounded-full w-fit mt-1 border border-white/10">
                                <Award size={10} /> Member Gold
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-3">
                    {/* Kartu Total Order */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Total Pesanan</p>
                        <p className="font-bold text-gray-900 text-xl">{transactions.length}</p>
                    </div>

                    {/* Kartu Total Uang Keluar */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Total Belanja</p>
                        <p className="font-bold text-indigo-600 text-lg truncate">
                            {formatCurrency(totalSpent)}
                        </p>
                    </div>
                </div>

                {/* INFO USER (Statis Aja) */}
                <div className="px-6 py-2 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail size={16} className="text-gray-400" />
                        <span className="truncate">jakaperdana230906@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone size={16} className="text-gray-400" />
                        <span>+62 85762604597</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <span>Bergabung sejak Feb 2026</span>
                    </div>
                </div>

                {/* FOOTER: Tombol Logout */}
                <div className="p-4 border-t border-gray-100 mt-2">
                    <button
                        onClick={onClose}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-2.5 rounded-xl font-bold hover:bg-rose-100 transition-colors active:scale-95"
                    >
                        Tutup
                    </button>
                </div>

            </div>
        </>
    );
};

export default ProfileDropdown;