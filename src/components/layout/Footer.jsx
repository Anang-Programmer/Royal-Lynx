/**
 * Footer.jsx — Footer Aplikasi
 *
 * Menampilkan informasi brand, menu navigasi, bantuan, dan kontak.
 *
 * Bagian:
 * 1. Brand: Logo "Royal Lynx" + deskripsi singkat + sosial media (Facebook, Twitter, Instagram)
 * 2. Menu Cepat: link ke Home, Wishlist, Cart, History
 * 3. Bantuan: link ke HelpCenter, Terms, Privacy
 * 4. Hubungi Kami: email, telepon, alamat (static)
 * 5. Copyright bar
 */
import React from 'react';
import { ShoppingBag, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-20">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Kolom 1: Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <ShoppingBag className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
                                Royal Lynx
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Platform belanja online terbaik untuk memenuhi segala kebutuhan gayamu. Aman, Cepat, dan Terpercaya.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" onClick={() => alert("Demo aja, ngga ada facebook juga")} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" onClick={() => alert("Demo saja, ngga punya X saya hehe")} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.instagram.com/jkaprdn_a?igsh=bXllZ2l6OXlvMWEzNzA=" target="_blank" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Menu</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
                            <li><Link to="/cart" className="hover:text-indigo-600 transition-colors">Keranjang</Link></li>
                            <li><Link to="/wishlist" className="hover:text-indigo-600 transition-colors">Wishlist</Link></li>
                            <li><Link to="/history" className="hover:text-indigo-600 transition-colors">Riwayat Pesanan</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Layanan */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Bantuan</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/help" className="hover:text-indigo-600 transition-colors">Pusat Bantuan</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Kebijakan Privasi</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Hubungi Kami</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                                <span>Jl. Beringin Pasar 7 Tembung, Deli Serdang, Sumatera Utara, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-indigo-600 shrink-0" />
                                <span>+62 857 6260 4597</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-indigo-600 shrink-0" />
                                <span>jakaperdana230906@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Royal Lynx by Jaka Perdana. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;