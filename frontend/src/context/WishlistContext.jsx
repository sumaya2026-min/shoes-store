import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'revone_wishlist'

function getSavedWishlist() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(getSavedWishlist)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds))
  }, [wishlistIds])

  const value = useMemo(() => {
    const toggleWishlist = (productId) => {
      setWishlistIds((current) =>
        current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
      )
    }

    const isWishlisted = (productId) => wishlistIds.includes(productId)

    return {
      wishlistIds,
      wishlistCount: wishlistIds.length,
      isWishlisted,
      toggleWishlist,
    }
  }, [wishlistIds])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }

  return context
}
