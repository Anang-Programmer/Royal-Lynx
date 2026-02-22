/**
 * Modal.jsx — Modal Konfirmasi (Reusable)
 *
 * Digunakan di Cart.jsx untuk konfirmasi checkout.
 *
 * Props:
 * - isOpen: boolean → tampilkan/sembunyikan modal
 * - onClose: function → handler tombol X dan "Batal"
 * - onConfirm: function → handler tombol "Ya, Bayar Sekarang"
 * - title: string → judul modal
 * - message: string → pesan konfirmasi
 * - total: string → total harga (sudah di-format)
 *
 * UI: backdrop gelap + card putih di tengah dengan ikon AlertTriangle
 */
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, total }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 scale-100 animate-in zoom-in-95 duration-200">

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-amber-500">
                        <AlertTriangle size={24} />
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    {message}
                </p>

                {total && (
                    <div className="bg-gray-50 p-3 rounded-xl mb-6 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Tagihan:</span>
                        <span className="font-bold text-lg text-gray-900">{total}</span>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                    >
                        Ya, Bayar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Modal;