/**
 * App.jsx — Root Component & Routing
 *
 * Bertanggung jawab untuk:
 * 1. Menyusun layout utama aplikasi (Navbar → Main → Footer)
 * 2. Mengelola routing dengan React Router (9 halaman + 404 catch-all)
 * 3. Search overlay: jika searchQuery ada, SearchResults menggantikan routing
 * 4. Menampilkan Toast notification dari ShopContext
 *
 * Wrapper: min-h-screen bg-gray-50 flex-col font-sans
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/layout/Navbar';
import History from './pages/History';
import Cart from './pages/Cart';
import Footer from './components/layout/Footer';
import SearchResults from './pages/SearchResults';
import { useShop } from './hooks/useShop';
import Toast from './components/ui/Toast';
import HelpCenter from './pages/HelpCenter';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/404';


function App() {

  const { searchQuery, notification, clearNotification } = useShop();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">

      <Navbar />
      {notification && <Toast message={notification.message} type={notification.type} onClose={clearNotification} />}

      {/* LOGIC UTAMA: SWAPPING CONTENT */}
      <main className="grow">

        {/* Jika ada ketikan di search bar, TINDIH semua halaman dengan SearchResults */}
        {searchQuery && searchQuery.length > 0 ? (
          <SearchResults />
        ) : (
          // Jika kosong, tampilkan halaman aslinya (Router)
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<History />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default App;