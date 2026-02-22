/**
 * api.js — Service Layer untuk FakeStore API
 *
 * Endpoint: https://fakestoreapi.com/products
 * Method: GET
 *
 * fetchProducts()
 * - Mengambil seluruh daftar produk (20 item) dari FakeStore API
 * - Return: Array of { id, title, price, description, category, image, rating }
 * - Error handling: catch error → log ke console → return array kosong
 *
 * Digunakan oleh: ShopContext.jsx (di-fetch saat component mount)
 */

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};