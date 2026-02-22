/**
 * ShopContext.jsx — Global State Management (React Context API)
 *
 * Menyediakan seluruh state dan fungsi utama aplikasi e-commerce:
 *
 * STATE:
 * - products      → Data produk dari FakeStore API (di-fetch saat mount)
 * - loading       → Status loading saat fetch API
 * - error         → Pesan error jika fetch gagal
 * - searchQuery   → Kata kunci pencarian aktif (digunakan oleh Navbar & SearchResults)
 * - notification  → State notifikasi toast { message, type }
 * - cart          → Array item keranjang (persisted di localStorage)
 * - wishlist      → Array item wishlist (persisted di localStorage)
 * - transactions  → Array riwayat transaksi (persisted di localStorage)
 *
 * COMPUTED:
 * - filterProducts → Produk yang sudah difilter berdasarkan searchQuery (useMemo)
 *
 * ACTIONS:
 * - addToCart(product, qty)     → Tambah produk ke keranjang (qty default 1)
 * - updateCartQty(id, type)    → Update quantity item (type: "plus" / "minus")
 * - removeFromCart(id)         → Hapus item dari keranjang
 * - checkoutCart()             → Proses checkout: pindahkan cart → transactions, kosongkan cart
 * - addToWishlist(product)     → Tambah produk ke wishlist
 * - removeFromWishlist(id)     → Hapus produk dari wishlist
 * - placeOrder(product)        → Buat single order langsung (bypass cart)
 * - showNotification(msg, type) → Tampilkan toast notification (auto-dismiss 3 detik)
 * - clearNotification()         → Tutup notifikasi secara manual
 */
import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchProducts } from "../services/api";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // --- STATE ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filterProducts = useMemo(() => {
        return products.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [products, searchQuery]);


    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("shop_cart");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem("shop_wishlist");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    });

    const [transactions, setTransactions] = useState(() => {
        try {
            const saved = localStorage.getItem("shop_transactions");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    });

    // --- HELPER ---
    const showNotification = useCallback((message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }, []);

    // --- EFFECTS ---

    useEffect(() => {
        localStorage.setItem("shop_cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
                showNotification("Gagal memuat produk", "error");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [showNotification]);

    useEffect(() => {
        localStorage.setItem("shop_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem("shop_transactions", JSON.stringify(transactions));
    }, [transactions]);

    // --- ACTIONS ---

    // 1. Tambah ke Keranjang (VERSI ANTI ERROR)
    const addToCart = (product, qty = 1) => {
        if (!product || !product.id) {
            console.log("Mencegah produk error masuk keranjang");
            return;
        }

        setCart((prev) => {
            const cleanCart = prev.filter(item => item && item.id);
            const existingItem = cleanCart.find((item) => item.id === product.id);

            if (existingItem) {
                showNotification("Jumlah barang diupdate di keranjang", "info");
                return cleanCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            } else {
                showNotification("Berhasil masuk Keranjang", "success");
                return [...cleanCart, { ...product, quantity: qty }];
            }
        });
    };

    const updateCartQty = (productId, type) => {
        setCart((prev) => prev.map((item) => {
            if (item.id === productId) {
                const newQty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty < 1 ? 1 : newQty };
            }
            return item;
        }))
    }

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const checkoutCart = () => {
        const checkoutId = `ORD-${Date.now()}`;
        const date = new Date().toISOString();

        const newOrders = cart.map(item => ({
            ...item,
            orderId: checkoutId,
            orderDate: date,
            status: "Success"
        }));

        setTransactions(prev => [...newOrders, ...prev]);
        setCart([]);
        showNotification("Checkout Berhasil! Terima kasih.", "success");
    };




    const addToWishlist = (product) => {
        setWishlist((prev) => {
            const isExist = prev.find((item) => item.id === product.id);
            if (isExist) {
                showNotification("Produk sudah ada di Wishlist!", "info");
                return prev;
            }
            showNotification("Berhasil masuk Wishlist", "success");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const placeOrder = (product) => {
        const newOrder = {
            ...product,
            orderId: `ORD-${Date.now()}`,
            orderDate: new Date().toISOString(),
        };

        setTransactions((prev) => [newOrder, ...prev]);

        const isInWishlist = wishlist.some((item) => item.id === product.id);
        if (isInWishlist) {
            removeFromWishlist(product.id);
        }

        showNotification("Order berhasil dibuat!", "success");
    };

    const clearNotification = () => setNotification(null);

    const value = {
        products,
        filterProducts,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        wishlist,
        transactions,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        checkoutCart,
        notification,
        clearNotification,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};