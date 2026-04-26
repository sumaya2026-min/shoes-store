import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductActionButton({ label, active = false, onClick, children }) {
  return (
    <button
      type="button"
      className={active ? 'product-action-button product-action-button--active' : 'product-action-button'}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function ProductCard({ product, onToggleWishlist, onQuickView, onAddToCart }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const productPath = `/product/${product.slug ?? product.id}`
  const productPrice = Number(product.price ?? 0)
  const wishlisted = isWishlisted(product.id)
  const handleWishlist = () => (onToggleWishlist || toggleWishlist)(product.id)
  const handleQuickView = () => onQuickView?.(product)
  const handleAddToCart = () => {
    if (!product.available) return
    const addItem = onAddToCart || addToCart
    addItem(product)
  }

  return (
    <article className="product-card product-card--storefront">
      <Link className="product-image-wrap" to={productPath}>
        <img className="product-image" src={product.image} alt={product.name} />
        <div className="product-overlay" />
      </Link>
      <div className="product-actions" aria-label={`${product.name} actions`}>
        <ProductActionButton label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} active={wishlisted} onClick={handleWishlist}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.8 4.6 13.9a4.8 4.8 0 0 1 6.8-6.8L12 7.7l.6-.6a4.8 4.8 0 1 1 6.8 6.8L12 20.8Z" />
          </svg>
        </ProductActionButton>
        <ProductActionButton label="Quick view" onClick={handleQuickView}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1.5 12s3.8-6.5 10.5-6.5S22.5 12 22.5 12 18.7 18.5 12 18.5 1.5 12 1.5 12Z" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
        </ProductActionButton>
        <ProductActionButton label={product.available ? 'Add to cart' : 'Out of stock'} onClick={handleAddToCart}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7.4" />
            <circle cx="10" cy="19" r="1.4" />
            <circle cx="18" cy="19" r="1.4" />
          </svg>
        </ProductActionButton>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          {product.isNew ? <span className="new-pill">New</span> : null}
        </div>
        <h3>{product.name}</h3>
        <div className="product-footer">
          <strong>${productPrice.toFixed(2)}</strong>
          <span className={`product-availability ${product.available ? 'product-availability--in' : 'product-availability--out'}`}>
            {product.available ? 'In stock' : 'Sold out'}
          </span>
        </div>
      </div>
    </article>
  )
}
