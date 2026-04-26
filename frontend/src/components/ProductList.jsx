import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({
  products,
  className = 'product-grid',
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleWishlist={onToggleWishlist}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
