import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ProductList from '../components/ProductList'
import QuickViewModal from '../components/QuickViewModal'
import { getProductById, getRelatedProducts, productSizes } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetails() {
  const { slug } = useParams()
  const [product, setProduct] = useState(undefined)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState('')
  const [selectedSize, setSelectedSize] = useState(productSizes[0])
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  useEffect(() => {
    async function load() {
      try {
        setError('')
        const loadedProduct = await getProductById(slug)
        setProduct(loadedProduct)

        if (loadedProduct) {
          setRelatedProducts(await getRelatedProducts(loadedProduct))
        }
      } catch (loadError) {
        setProduct(null)
        setRelatedProducts([])
        setError(loadError.message || 'Could not load product details.')
      }
    }

    load()
  }, [slug])

  if (product === undefined) {
    return <Loader />
  }

  if (!product) {
    return (
      <main className="page-shell">
        <section className="placeholder-page">
          <p className="eyebrow">Product details</p>
          <h1>Product not found</h1>
          {error ? <p className="dashboard-message dashboard-message--error">{error}</p> : null}
        </section>
      </main>
    )
  }

  const productPrice = Number(product.price ?? 0)

  return (
    <main className="page-shell">
      <section className="details-layout">
        <img className="details-image" src={product.image} alt={product.name} />
        <div className="details-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong>${productPrice.toFixed(2)}</strong>
          <span className={`status-pill status-pill--static ${product.available ? 'status-pill--in' : 'status-pill--out'}`}>
            {product.available ? 'In stock' : 'Out of stock'}
          </span>

          <div className="size-selector">
            <span className="filter-label">Select size</span>
            <div className="size-selector__list">
              {productSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={selectedSize === size ? 'size-chip size-chip--active' : 'size-chip'}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="primary-button"
              disabled={!product.available}
              onClick={() => addToCart(product, 1, selectedSize)}
            >
              {product.available ? `Add to cart - ${selectedSize}` : 'Sold out'}
            </button>
            <button
              type="button"
              className={isWishlisted(product.id) ? 'wishlist-outline-button wishlist-outline-button--active' : 'wishlist-outline-button'}
              onClick={() => toggleWishlist(product.id)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20.8 4.6 13.9a4.8 4.8 0 0 1 6.8-6.8L12 7.7l.6-.6a4.8 4.8 0 1 1 6.8 6.8L12 20.8Z" />
              </svg>
              {isWishlisted(product.id) ? 'Wishlisted' : 'Save for later'}
            </button>
          </div>
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Complete the look</p>
          <h2>Related Products</h2>
        </div>
        <ProductList
          products={relatedProducts.slice(0, 4)}
          className="product-grid"
          onToggleWishlist={toggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={addToCart}
        />
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
      />
    </main>
  )
}
