/**
 * Receipt.jsx — Template Struk/Invoice untuk Cetak (PDF)
 *
 * Komponen ini di-render secara tersembunyi dan dijadikan target oleh react-to-print.
 * Menggunakan forwardRef agar ref dari History.jsx bisa mengaksesnya.
 *
 * Props:
 * - orderItems: Array item dalam satu transaksi (grouped by orderId)
 *
 * Menampilkan:
 * - Header toko (logo, nama, alamat)
 * - Info Order ID, tanggal, status
 * - Tabel item: nama, qty, harga satuan, subtotal
 * - Rincian pembayaran: subtotal, service fee, ongkir, grand total
 * - Footer "Terima kasih"
 */
import React, { forwardRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
const Receipt = forwardRef(({ orderItems }, ref) => {
    // Guard: Kalau kosong, jangan render
    if (!orderItems || orderItems.length === 0) return null;

    // Ambil info dasar dari barang pertama (Karena Order ID dan Tanggalnya pasti sama)
    const orderInfo = orderItems[0];

    // Hitung TOTAL SEMUA BARANG di transaksi ini
    const subtotal = orderItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const serviceFee = 1.00; // Misal biaya layanan flat $1
    const grandTotal = subtotal + serviceFee;

    return (
        <div ref={ref} className="p-10 bg-white text-gray-900 w-full max-w-2xl mx-auto print:w-full print:max-w-none">

            {/* HEADER */}
            <div className="border-b-2 border-gray-100 pb-8 mb-8 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gray-900 p-1.5 rounded-lg">
                            <ShoppingBag className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Royal Lynx</span>
                    </div>
                    <p className="text-sm text-gray-500">Jl. Beringin Pasar 7 Tembung, Deli Serdang, Sumatera Utara, Indonesia</p>
                    <p className="text-sm text-gray-500">Deli Serdang, Indonesia 20371</p>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                    <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono text-gray-900 font-medium">#{orderInfo.orderId}</span></p>
                    <p className="text-sm text-gray-500">Date: {formatDate(orderInfo.orderDate)}</p>
                </div>
            </div>

            {/* BILL TO */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tagihan Kepada</h3>
                <p className="font-bold text-gray-900">Jaka Perdana</p>
                <p className="text-sm text-gray-500">Customer</p>
            </div>

            {/* TABLE ITEM (BARU: KITA LOOPING SEMUA BARANG) */}
            <div className="mb-8">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 text-sm font-bold text-gray-600">Deskripsi Item</th>
                            <th className="py-3 text-sm font-bold text-gray-600 text-center">Qty</th>
                            <th className="py-3 text-sm font-bold text-gray-600 text-right">Harga</th>
                            <th className="py-3 text-sm font-bold text-gray-600 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Looping semua barang yang di-checkout bersamaan */}
                        {orderItems.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                                <td className="py-4">
                                    <p className="font-bold text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{item.category}</p>
                                </td>
                                <td className="py-4 text-center">{item.quantity || 1}</td>
                                <td className="py-4 text-right">{formatCurrency(item.price)}</td>
                                <td className="py-4 text-right font-medium">
                                    {formatCurrency(item.price * (item.quantity || 1))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* SUMMARY */}
            <div className="flex justify-end mb-12">
                <div className="w-1/2 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal Barang</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>{formatCurrency(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-3">
                        <span>Ongkos Kirim</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-1">
                        <span>Total Bayar</span>
                        <span>{formatCurrency(grandTotal)}</span>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-center border-t border-gray-100 pt-8 text-sm text-gray-400">
                <p>Terima kasih telah berbelanja di Royal Lynx.</p>
                <p>Simpan struk ini sebagai bukti pembayaran yang sah.</p>
            </div>

        </div>
    );
});

export default Receipt;