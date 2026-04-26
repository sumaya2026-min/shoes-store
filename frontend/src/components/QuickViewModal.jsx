import React, { useEffect } from 'react'

export default function QuickViewModal({ product, isWishlisted, onClose, onToggleWishlist, onAddToCart }) {
  useEffect(() => {
    if (!product) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [product, onClose])

  if (!product) return null

  const productPrice = Number(product.price ?? 0)

  return (
    <div className="quick-view-backdrop" role="presentation" onClick={onClose}>
      <div
        className="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close-button" aria-label="Close quick view" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </button>

        <div className="quick-view-media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="quick-view-copy">
          <p className="eyebrow">{product.category}</p>
          <h2 id="quick-view-title">{product.name}</h2>
          <strong>${productPrice.toFixed(2)}</strong>
          <p>{product.description}</p>

          <div className="quick-view-actions">
            <button
              type="button"
              className={isWishlisted ? 'wishlist-outline-button wishlist-outline-button--active' : 'wishlist-outline-button'}
              onClick={() => onToggleWishlist(product.id)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20.8 4.6 13.9a4.8 4.8 0 0 1 6.8-6.8L12 7.7l.6-.6a4.8 4.8 0 1 1 6.8 6.8L12 20.8Z" />
              </svg>
              {isWishlisted ? 'Saved' : 'Add to wishlist'}
            </button>
            <button type="button" className="primary-button" disabled={!product.available} onClick={() => onAddToCart(product)}>
              {product.available ? 'Add to cart' : 'Sold out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
