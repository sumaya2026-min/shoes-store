import React from 'react'
import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Orders from '../pages/Orders'
import Profile from '../pages/Profile'
import Address from '../pages/Address'
import Contact from '../pages/Contact'
import CategoryPage from '../pages/CategoryPage'
import { Routes, Route } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/address" element={<Address />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
    </Routes>
  )
}
