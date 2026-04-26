import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="app-shell">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
