/**
 * Cart.jsx — Halaman Keranjang Belanja
 *
 * Fitur:
 * - Daftar item keranjang dengan gambar, nama, harga satuan
 * - Kontrol quantity per item (plus/minus) via updateCartQty()
 * - Hapus item via removeFromCart()
 * - Ringkasan belanja: subtotal, pajak, total (sticky sidebar di desktop)
 * - Tombol checkout membuka Modal konfirmasi → checkoutCart() → redirect ke /history
 * - Empty state dengan tombol "Mulai Belanja" jika keranjang kosong
 *
 * Data: Semua dari ShopContext (cart, removeFromCart, updateCartQty, checkoutCart)
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../hooks/useShop';
import { formatCurrency } from '../utils/formatters';
import Modal from '../components/ui/Modal';

const Cart = () => {
    const { cart, removeFromCart, updateCartQty, checkoutCart } = useShop();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleConfirmCheckout = () => {
        checkoutCart();
        setIsModalOpen(false);
        navigate('/history');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <ShoppingCart size={64} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
                <p className="text-gray-500 mb-8">Belum ada barang nih. Yuk jajan dulu!</p>
                <Link to="/" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium">
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ShoppingCart className="text-indigo-600" />
                Keranjang Belanja
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">

                <div className="grow flex flex-col gap-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 p-2 rounded-xl">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>

                            <div className="grow text-center sm:text-left">
                                <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{formatCurrency(item.price)}</p>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
                                <button onClick={() => updateCartQty(item.id, 'minus')} className="cursor-pointer p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                                    <Minus size={14} />
                                </button>
                                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                                <button onClick={() => updateCartQty(item.id, 'plus')} className="cursor-pointer p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                                    <Plus size={14} />
                                </button>
                            </div>

                            <div className="font-bold text-gray-900 w-24 text-center">
                                {formatCurrency(item.price * item.quantity)}
                            </div>

                            <button onClick={() => removeFromCart(item.id)} className="cursor-pointer p-2 text-gray-400 hover:text-rose-500 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-80 h-fit">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-24">
                        <h3 className="text-lg font-bold mb-4">Ringkasan</h3>

                        <div className="flex justify-between mb-2 text-gray-500">
                            <span>Subtotal ({cart.length} item)</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-gray-500">
                            <span>Pajak (0%)</span>
                            <span>-</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-xl text-indigo-600">{formatCurrency(totalAmount)}</span>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-gray-900/20"
                        >
                            Checkout Sekarang <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCheckout}
                title="Konfirmasi Pembayaran"
                message="Apakah kamu yakin ingin memproses pesanan ini?"
                total={formatCurrency(totalAmount)}
            />

        </div>
    );
};

export default Cart;