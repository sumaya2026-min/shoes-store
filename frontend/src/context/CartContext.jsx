import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function getSavedCart() {
  try {
    const saved = window.localStorage.getItem('revone_cart')
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    return parsed.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 1,
      cartItemId: item.cartItemId || `${item.id}-${item.size ?? 'default'}`,
    }))
  } catch {
    window.localStorage.removeItem('revone_cart')
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getSavedCart)

  useEffect(() => {
    window.localStorage.setItem('revone_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1, selectedSize = product.size ?? null) => {
    const cartItemId = `${product.id}-${selectedSize ?? 'default'}`

    setItems((current) => {
      const existing = current.find((item) => item.cartItemId === cartItemId)
      if (existing) {
        return current.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        )
      }

      return [...current, { ...product, size: selectedSize, quantity, cartItemId }]
    })
  }

  const updateQuantity = (cartItemId, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (cartItemId) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId))
  }

  const clearCart = () => {
    setItems([])
  }

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return {
      itemCount,
      subtotal,
      shipping: itemCount ? 12 : 0,
      total: itemCount ? subtotal + 12 : 0,
    }
  }, [items])

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, ...totals }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
