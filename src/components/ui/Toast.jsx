/**
 * Toast.jsx — Notifikasi Toast (Pop-up Sementara)
 *
 * Muncul otomatis saat action berhasil/gagal. Auto-dismiss setelah 3 detik.
 *
 * Props:
 * - message: string → teks notifikasi
 * - type: "success" | "error" | "info" → warna dan ikon berbeda
 * - onClose: function → handler saat toast ditutup atau selesai animasi
 *
 * Animasi: slide-in dari kanan (translate-x-full → translate-x-0)
 *          lalu slide-out setelah 2.5 detik
 */
import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        const timer = setTimeout(() => setIsVisible(false), 3000);

        return () => clearTimeout(timer);
    }, []);

    const config = {
        success: { icon: CheckCircle, style: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
        error: { icon: XCircle, style: 'bg-rose-500/10 text-rose-600 border-rose-200' },
        info: { icon: Info, style: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    };

    const { icon: Icon, style } = config[type] || config.info;

    return (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-500 ease-spring ${style} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <Icon size={20} className="stroke-[2.5px]" />
            <p className="text-sm font-medium">{message}</p>

        </div>
    )

}

export default Toast;
