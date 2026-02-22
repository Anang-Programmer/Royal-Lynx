/**
 * main.jsx — Entry Point Aplikasi React
 *
 * Menyusun hierarki provider:
 * StrictMode → ShopProvider → BrowserRouter → App
 *
 * - StrictMode: Mendeteksi potensi masalah di development
 * - ShopProvider: Menyediakan ShopContext (global state) ke seluruh aplikasi
 * - BrowserRouter: Menyediakan routing berbasis URL
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopProvider>
  </StrictMode>,
)
