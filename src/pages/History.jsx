/**
 * History.jsx — Halaman Riwayat Transaksi (Master-Detail Layout)
 *
 * Fitur:
 * - Daftar pesanan (master): grouped by orderId, gambar produk, nama, tanggal
 * - Detail pesanan (detail): info lengkap produk, pengiriman, rincian pembayaran
 * - Tombol "Cetak Struk" → print invoice PDF via react-to-print
 * - Tombol "Beli Lagi" → addToCart() lalu navigasi ke /cart
 * - Empty state saat belum ada transaksi
 * - Responsive: mobile = full-width list, desktop = 2 kolom master-detail
 *
 * Data: transactions, addToCart dari ShopContext
 */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import {
    History as HistoryIcon,
    Package,
    CheckCircle,
    Calendar,
    MapPin,
    CreditCard,
    Truck,
    ReceiptText,
    ShoppingBag
} from 'lucide-react';
import { useShop } from '../hooks/useShop';
import { formatCurrency, formatDate } from '../utils/formatters';
import Receipt from '../components/ui/Receipt';

const History = () => {
    const { transactions, addToCart } = useShop();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const receiptRef = useRef();

    const navigate = useNavigate();

    const currentOrderGroup = selectedOrder
        ? transactions.filter(t => t.orderId === selectedOrder.orderId)
        : [];

    const groupSubtotal = currentOrderGroup.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const groupTotal = groupSubtotal + 1; // Ditambah service fee $1

    const handlePrint = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: `Invoice-${selectedOrder?.orderId}`,
    });

    const handleBuyAgain = () => {
        if (selectedOrder) {
            addToCart(selectedOrder, selectedOrder.quantity || 1);
            navigate('/cart');
        }
    };




    useEffect(() => {
        if (transactions.length > 0) {
            setSelectedOrder(transactions[0]);
        }
    }, [transactions]);

    if (transactions.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <HistoryIcon size={64} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Belum ada riwayat pesanan
                </h2>
                <p className="text-gray-500 mb-8 max-w-md">
                    Kamu belum belanja apa-apa nih. Yuk checkout barang impianmu sekarang!
                </p>
                <Link to="/" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium transition-all hover:bg-gray-800">
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">


            <div className="hidden">
                <Receipt ref={receiptRef} orderItems={currentOrderGroup} />
            </div>



            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Package className="text-indigo-600" />
                    Riwayat Pesanan
                </h1>
                <p className="text-gray-500 mt-2">
                    Total {transactions.length} transaksi berhasil
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-1 flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                    {transactions.map((order, index) => {
                        const qty = order.quantity || 1;
                        const isSelected = selectedOrder?.orderId === order.orderId;

                        return (
                            <div
                                key={`${order.orderId}-${index}`}
                                onClick={() => setSelectedOrder(order)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex gap-4 items-center group
                                    ${isSelected
                                        ? "bg-white border-indigo-600 ring-1 ring-indigo-600 shadow-md"
                                        : "bg-white border-gray-100 hover:border-indigo-300 hover:shadow-sm"
                                    }`}
                            >
                                {/* Gambar Kecil */}
                                <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 shrink-0 border border-gray-100">
                                    <img src={order.image} alt={order.title} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                {/* Info Singkat */}
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400 mb-0.5">{order.orderId}</p>
                                    <h3 className={`font-bold text-sm truncate ${isSelected ? "text-indigo-700" : "text-gray-900"}`}>
                                        {order.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDate(order.orderDate)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* === KOLOM KANAN: DETAIL PESANAN (KOTAK BIRU KAMU) === */}
                <div className="lg:col-span-2">
                    {selectedOrder ? (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden sticky top-24">

                            {/* Header Detail */}
                            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                    <p className="font-mono font-bold text-gray-900">{selectedOrder.orderId}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-green-100 text-emerald-600 font-bold text-sm shadow-sm">
                                    <CheckCircle size={16} />
                                    Pesanan Selesai
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                {/* Produk Utama */}
                                <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-gray-100">
                                    <div className="w-32 h-32 bg-gray-50 rounded-2xl p-4 border border-gray-100 mx-auto sm:mx-0">
                                        <img src={selectedOrder.image} alt={selectedOrder.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="grow text-center sm:text-left">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedOrder.title}</h2>
                                        <p className="text-gray-500 mb-4">{selectedOrder.category}</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium">
                                                Qty: {selectedOrder.quantity || 1}
                                            </span>
                                            <span className="text-xl font-bold text-indigo-600">
                                                {formatCurrency(selectedOrder.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Pengiriman & Pembayaran */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    {/* Info Pengiriman (Dummy) */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Truck size={18} className="text-gray-400" />
                                            Info Pengiriman
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-3">
                                            <div className="flex gap-3">
                                                <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-gray-900">Jaka Perdana</p>
                                                    <p className="text-gray-500">Jl. Beringin Pasar 7 Tembung, Deli Serdang, Sumatera Utara, Indonesia.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Calendar size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-gray-500">Diterima pada:</p>
                                                    <p className="font-medium text-gray-900">{formatDate(selectedOrder.orderDate)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rincian Pembayaran */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <CreditCard size={18} className="text-gray-400" /> Rincian Pembayaran
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between text-gray-500">
                                                {/* UPDATE: Tampilkan total grup */}
                                                <span>Subtotal Barang ({currentOrderGroup.length} Tipe)</span>
                                                <span>{formatCurrency(groupSubtotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-500">
                                                <span>Biaya Layanan</span>
                                                <span>$1.00</span>
                                            </div>
                                            <div className="flex justify-between text-gray-500">
                                                <span>Ongkos Kirim</span>
                                                <span className="text-emerald-500">Gratis</span>
                                            </div>
                                            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                                                <span className="font-bold text-gray-900">Total Belanja</span>
                                                {/* UPDATE: Tampilkan Final Total Grup */}
                                                <span className="font-bold text-xl text-indigo-600">
                                                    {formatCurrency(groupTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Bantuan */}
                                <div className="flex gap-3">
                                    <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                        <ReceiptText size={20} />
                                        Cetak Struk
                                    </button>
                                    <button onClick={handleBuyAgain} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                                        Beli Lagi
                                    </button>
                                </div>

                            </div>
                        </div>
                    ) : (
                        // State kalau belum ada yang dipilih (biasanya gak muncul krn useEffect)
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-10 text-gray-400">
                            Pilih pesanan untuk melihat detail
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default History;