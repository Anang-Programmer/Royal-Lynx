/**
 * formatters.js — Utility Functions untuk Format Data
 *
 * formatCurrency(amount)
 * - Input: number (harga dalam USD)
 * - Output: string "$XX.XX" (format US dollar, Intl.NumberFormat)
 * - Contoh: formatCurrency(109.95) → "$109.95"
 *
 * formatDate(dateString)
 * - Input: ISO date string (dari new Date().toISOString())
 * - Output: string tanggal dalam format Indonesia "DD Bulan YYYY pukul HH.MM"
 * - Contoh: formatDate("2026-02-22T06:55:00Z") → "22 Februari 2026 pukul 13.55"
 *
 * Digunakan oleh: Cart, ProductCard, ProductDetail, History, Receipt
 */
export const formatCurrency = (amount) => {
    const value = amount || 0;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(value);
};

export const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};