/**
 * useShop.js — Custom Hook untuk Akses ShopContext
 *
 * Mempermudah pemanggilan ShopContext di komponen manapun.
 * Tanpa hook ini, setiap komponen perlu: import { useContext } + import { ShopContext }
 * Dengan hook ini, cukup: import { useShop } → const { cart, addToCart } = useShop()
 *
 * Throw error jika dipanggil di luar ShopProvider.
 */

import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context
}
