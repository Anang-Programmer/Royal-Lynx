# 🛍️ Royal Lynx — E-Commerce Product Catalog

> **Final Project Submission — GDGoC USU 2025**
> Dibuat oleh **Jaka Perdana**

Aplikasi web katalog produk e-commerce yang dibangun menggunakan **React 19**, **Vite 7**, dan **Tailwind CSS 4**. Aplikasi ini menampilkan fitur lengkap mulai dari katalog produk, keranjang belanja, wishlist, hingga riwayat transaksi dengan cetak struk.

---

## 📸 Gambaran Singkat

| Fitur | Deskripsi |
|-------|-----------|
| **Katalog Produk** | Menampilkan 20 produk dari FakeStore API dalam grid responsif |
| **Keranjang Belanja** | Tambah, hapus, ubah jumlah, dan checkout dengan konfirmasi modal |
| **Wishlist** | Simpan produk favorit dan kelola daftar keinginan |
| **Riwayat Transaksi** | Lihat detail pesanan dengan layout master-detail dan cetak struk (PDF) |
| **Pencarian Produk** | Real-time search yang langsung memfilter produk saat mengetik |
| **Detail Produk** | Halaman detail lengkap dengan rating, deskripsi, dan quantity selector |
| **Profil Pengguna** | Dropdown profil dengan statistik total pesanan dan total belanja |
| **Dark Mode** | Toggle tema gelap/terang dengan transisi halus, disimpan di localStorage |

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Versi |
|----------|-----------|-------|
| **Framework** | React | 19.2.0 |
| **Build Tool** | Vite | 7.3.1 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **Routing** | React Router DOM | 7.13.0 |
| **Icons** | Lucide React | 0.563.0 |
| **Cetak Struk** | react-to-print | 3.2.0 |
| **Linting** | ESLint | 9.39.1 |
| **Package Manager** | pnpm | - |

---

## 📁 Struktur Project

```
Submission_Jaka_Perdana/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   └── react.svg                # Logo React default
│   ├── components/
│   │   ├── features/                # Komponen fitur bisnis
│   │   │   ├── ProductCard.jsx      # Kartu produk (gambar, harga, wishlist, add to cart)
│   │   ├── layout/                  # Komponen tata letak
│   │   │   ├── Footer.jsx           # Footer dengan info brand, menu, bantuan, kontak
│   │   │   ├── Hero.jsx             # Banner hero + fitur layanan (ongkir, garansi, dll)
│   │   │   └── Navbar.jsx           # Navigasi sticky dengan search bar (desktop + mobile), badge, profil
│   │   └── ui/                      # Komponen UI reusable
│   │       ├── Badge.jsx            # Badge angka notifikasi (cart & wishlist)
│   │       ├── Button.jsx           # Tombol reusable multi-variant (primary, secondary, dll)
│   │       ├── LoadingSpinner.jsx   # Animasi loading spinner saat fetch data API
│   │       ├── Modal.jsx            # Modal konfirmasi checkout
│   │       ├── ProfileDropdown.jsx  # Dropdown profil pengguna + statistik
│   │       ├── Receipt.jsx          # Template struk/invoice untuk dicetak
│   │       ├── SkeletonCard.jsx     # Placeholder kartu produk saat loading (animate-pulse)
│   │       └── Toast.jsx            # Notifikasi toast (success, error, info)
│   ├── context/
│   │   └── ShopContext.jsx          # Global state management (produk, cart, wishlist, transaksi)
│   ├── hooks/
│   │   └── useShop.js               # Custom hook untuk akses ShopContext
│   ├── pages/
│   │   ├── home.jsx                 # Halaman utama katalog produk
│   │   ├── Cart.jsx                 # Halaman keranjang belanja + ringkasan checkout
│   │   ├── Wishlist.jsx             # Halaman daftar keinginan
│   │   ├── History.jsx              # Halaman riwayat pesanan (master-detail)
│   │   ├── ProductDetail.jsx        # Halaman detail produk
│   │   ├── SearchResults.jsx        # Overlay hasil pencarian produk
│   │   ├── HelpCenter.jsx           # Halaman pusat bantuan (FAQ)
│   │   ├── Terms.jsx                # Halaman syarat & ketentuan
│   │   ├── Privacy.jsx              # Halaman kebijakan privasi
│   │   └── 404.jsx                  # Halaman 404 Not Found
│   ├── services/
│   │   └── api.js                   # Fungsi fetch data produk dari FakeStore API
│   ├── utils/
│   │   ├── formatters.js            # Utility format mata uang (USD) & tanggal (id-ID)
│   ├── App.jsx                      # Root component dengan routing & search overlay logic
│   ├── main.jsx                     # Entry point React (BrowserRouter + ShopProvider)
│   └── index.css                    # Import Tailwind CSS + Dark Mode CSS overrides
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── pnpm-lock.yaml                   # Lock file pnpm
├── vite.config.js                   # Konfigurasi Vite + plugin React & Tailwind
├── eslint.config.js                 # Konfigurasi ESLint
├── .gitignore                       # File yang diabaikan Git
└── Final Project.txt                # Dokumen brief/requirement project
```

---

## ⚙️ Arsitektur Aplikasi

### State Management

Aplikasi menggunakan **React Context API** (`ShopContext`) sebagai pusat pengelolaan state global. Semua state penting di-manage di satu tempat:

```
ShopContext (context/ShopContext.jsx)
├── products        → Data produk dari API
├── cart             → Item keranjang belanja (localStorage)
├── wishlist         → Item daftar keinginan (localStorage)
├── transactions     → Riwayat transaksi (localStorage)
├── searchQuery      → Kata kunci pencarian aktif
├── notification     → State notifikasi toast
├── loading / error  → Status loading dan error
```

### Data Flow

```
FakeStore API → fetchProducts() → ShopContext → Components/Pages
                                       ↕
                                  localStorage (persistensi data)
```

### Routing

| Path | Halaman | Deskripsi |
|------|---------|-----------|
| `/` | Home | Katalog produk + Hero banner |
| `/product/:id` | ProductDetail | Detail produk dengan qty selector |
| `/cart` | Cart | Keranjang belanja + checkout |
| `/wishlist` | Wishlist | Daftar produk favorit |
| `/history` | History | Riwayat pesanan + cetak struk |
| `/help` | HelpCenter | FAQ / Pusat bantuan |
| `/terms` | Terms | Syarat & Ketentuan |
| `/privacy` | Privacy | Kebijakan Privasi |
| `*` | NotFound (404) | Halaman tidak ditemukan (catch-all) |

> **Catatan:** Saat user mengetik di search bar, halaman secara otomatis menampilkan `SearchResults` sebagai overlay di atas routing biasa.

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** v18 atau lebih baru
- **pnpm** (disarankan) atau npm

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/Anang-Programmer/Royal-Lynx.git
cd Royal-Lynx

# 2. Install dependencies
pnpm install

# 3. Jalankan development server
pnpm run dev

# 4. Buka di browser
# http://localhost:5173
```

### Build untuk Produksi

```bash
# Build project
pnpm run build

# Preview hasil build
pnpm preview
```

---

## ✨ Fitur Detail

### 1. 🏠 Halaman Utama (Home)
- **Hero Banner** dengan gambar background, judul menarik, dan tombol "Belanja Sekarang" (smooth scroll ke katalog)
- **Fitur Layanan**: Gratis Ongkir, Garansi Asli, Pengiriman Cepat, Pembayaran Aman
- **Filter Kategori**: Tombol pills untuk filter produk berdasarkan kategori (Semua, Electronics, Jewelery, dll)
- **Sort Produk**: Dropdown urutkan berdasarkan harga (rendah-tinggi / tinggi-rendah) atau nama (A-Z)
- **Skeleton Loading**: 8 kartu placeholder dengan animasi pulse tampil saat data sedang di-fetch dari API
- **Grid Produk** responsif (2 kolom mobile, 3 kolom tablet, 4 kolom desktop)
- **Empty state** ketika pencarian tidak menemukan hasil

### 2. 🔍 Pencarian Real-Time
- Search bar di Navbar memfilter produk secara langsung
- **Mendukung Mobile**: Tombol search toggle di mobile menampilkan search bar slide-down
- Menggunakan `useMemo` untuk performa optimal
- Menampilkan jumlah produk yang cocok
- Overlay search results menggantikan routing sementara

### 3. 📦 Detail Produk
- Gambar produk besar dengan efek hover zoom
- Informasi kategori, rating, dan jumlah ulasan
- Deskripsi lengkap produk
- **Quantity selector** (plus/minus)
- Tombol "Add to Cart" dengan preview total harga
- Tombol Wishlist (toggle add/remove)
- Info pengiriman cepat & garansi resmi

### 4. 🛒 Keranjang Belanja
- Daftar item dengan gambar, nama, harga satuan
- Kontrol quantity (plus/minus) per item
- Hapus item dari keranjang
- **Ringkasan belanja** (subtotal, pajak, total) dengan sticky sidebar
- Tombol checkout dengan **Modal konfirmasi** pembayaran
- **Empty state** dengan navigasi kembali ke katalog

### 5. ❤️ Wishlist
- Toggle add/remove wishlist dari ProductCard atau ProductDetail
- Menampilkan semua produk favorit dalam grid yang sama
- Badge counter di Navbar
- **Empty state** dengan animasi pulse

### 6. 📋 Riwayat Transaksi
- Layout **master-detail**: daftar pesanan di kiri, detail di kanan
- Informasi Order ID, status, tanggal pesanan
- Detail produk, quantity, dan harga
- **Informasi pengiriman** (nama, alamat, tanggal terima)
- **Rincian pembayaran** (subtotal, biaya layanan, ongkir, total)
- Tombol **"Cetak Struk"** (menggunakan `react-to-print`, menghasilkan PDF invoice)
- Tombol **"Beli Lagi"** (langsung masuk ke keranjang)
- **Empty state** ketika belum ada transaksi

### 7. 🧾 Cetak Struk / Invoice
- Template invoice profesional dengan header toko, Bill To, tabel item, dan total
- Support cetak semua barang dalam satu transaksi (grouped by Order ID)
- Menampilkan subtotal, service fee, dan grand total

### 8. 👤 Profil Pengguna
- Dropdown dari avatar di Navbar
- Menampilkan nama, email, nomor telepon, tanggal bergabung
- Statistik: total pesanan dan total belanja (dihitung real-time)
- Badge "Member Gold"

### 9. 🔔 Notifikasi Toast
- Muncul otomatis saat action berhasil/gagal
- 3 tipe: **success** (hijau), **error** (merah), **info** (biru)
- Animasi slide-in dan auto-dismiss setelah 3 detik

### 10. 📄 Halaman Informasi
- **Pusat Bantuan**: 6 FAQ dengan format Q&A + link chat WhatsApp CS
- **Syarat & Ketentuan**: Informasi legal penggunaan layanan
- **Kebijakan Privasi**: Informasi pengelolaan data pengguna

### 11. 🚫 Halaman 404 (Not Found)
- Angka "404" besar sebagai background dengan ikon pencarian
- Dua tombol navigasi: "Kembali ke Beranda" dan "Halaman Sebelumnya"
- Catch-all route untuk semua URL yang tidak valid

### 12. 🌙 Dark Mode
- **Toggle** tema gelap/terang via tombol Moon/Sun di Navbar
- **CSS-Only Approach**: Tidak menambahkan `dark:` class ke komponen — semua di-handle lewat CSS overrides di `index.css`
- **Swap gray scale**: Warna abu-abu ringan (gray-50 s/d gray-700) diswap untuk dark theme
- **Targeted overrides**: `text-gray-900`, `text-gray-800`, `bg-white` di-override terpisah agar tombol gelap tetap berfungsi
- **Product image fix**: Gambar produk mendapat background putih otomatis di dark mode
- **Smooth transition**: Animasi transisi 0.3 detik saat toggle
- **Persistent**: Preferensi disimpan di `localStorage('theme')`, init sebelum React render (tanpa flash putih)
- **No logic changes**: Semua komponen lain 100% tidak diubah

---

## 🔌 API yang Digunakan

Aplikasi menggunakan [FakeStore API](https://fakestoreapi.com) sebagai sumber data produk.

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/products` | GET | Mengambil seluruh daftar produk (20 produk) |

Setiap objek produk memiliki properti: `id`, `title`, `price`, `description`, `category`, `image`, `rating` (rate & count).

---

## 💾 Persistensi Data

Aplikasi menggunakan **`localStorage`** untuk menyimpan data secara lokal di browser agar tidak hilang saat refresh halaman:

| Key | Data |
|-----|------|
| `shop_cart` | Item keranjang belanja |
| `shop_wishlist` | Item daftar keinginan |
| `shop_transactions` | Riwayat transaksi/pesanan |
| `theme` | Preferensi dark/light mode |

---

## 🎨 Desain & UI/UX

- **Design System**: Tailwind CSS 4 dengan warna utama Indigo & Violet
- **Dark Mode**: CSS-only dark theme via gray scale swap + targeted overrides
- **Responsive**: Mendukung tampilan Mobile (2 kolom), Tablet, dan Desktop
- **Navbar Sticky**: Glassmorphism effect (`backdrop-blur-md`)
- **Animasi & Transisi**: Hover effects, scale, smooth transitions
- **Consistent Styling**: Rounded-xl cards, shadow-sm/lg, border-gray-100
- **Skeleton Loading**: Placeholder animasi pulse saat data sedang di-fetch
- **Empty States**: Ditampilkan ketika data kosong (cart, wishlist, history)
- **Visual Feedback**: Toast notification, badge counter, button active scale
- **Icons**: Semua icon menggunakan Lucide React

---

## 📊 Kompetensi yang Didemonstrasikan

Sesuai dengan requirement GDGoC USU 2025 Final Project:

| No | Kompetensi | Implementasi |
|----|-----------|--------------|
| 1 | React Fundamentals | Components, Props, State, Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`) |
| 2 | State Management | Context API (`ShopContext`) + `localStorage` untuk persistensi |
| 3 | Event Handling | Click, onChange, form interactions, stopPropagation |
| 4 | Responsive Design | Tailwind responsive classes (`sm:`, `md:`, `lg:`) |
| 5 | Project Structure | Terorganisir: components (features/layout/ui), pages, context, hooks, services, utils |

---

## 👤 Author

**Jaka Perdana**
- 📧 Email: jakaperdana230906@gmail.com
- 📱 Telepon: +62 857 6260 4597
- 📍 Lokasi: Deli Serdang, Sumatera Utara, Indonesia
- 📸 Instagram: [@jkaprdn_a](https://www.instagram.com/jkaprdn_a)

---

## 📝 Lisensi

© 2026 Royal Lynx by Jaka Perdana. All rights reserved.
