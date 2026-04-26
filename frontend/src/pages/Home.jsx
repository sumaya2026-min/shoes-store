import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import CategoryCard from '../components/CategoryCard'
import ProductList from '../components/ProductList'
import QuickViewModal from '../components/QuickViewModal'
import Loader from '../components/Loader'
import { getCategories, getFeaturedProducts, getHomeContent } from '../services/api'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [content, setContent] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [error, setError] = useState('')
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  useEffect(() => {
    async function load() {
      try {
        setError('')
        setContent(await getHomeContent())
        setCategoryList(await getCategories())
        setFeaturedProducts(await getFeaturedProducts())
      } catch (loadError) {
        setContent(await getHomeContent())
        setCategoryList([])
        setFeaturedProducts([])
        setError(loadError.message || 'Could not load storefront data.')
      }
    }

    load()
  }, [])

  if (!content) {
    return <Loader />
  }

  return (
    <main className="page-shell">
      <Banner {...content.hero} />

      <section className="category-section">
        <div className="section-heading">
          <p className="eyebrow">Shop by category</p>
          <h2>Icons for every occasion</h2>
        </div>
        {error ? <p className="dashboard-message dashboard-message--error">{error}</p> : null}
        <div className="category-row">
          {categoryList.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">New shoe arrivals by look</p>
          <h2>Your shoe checklist starts here</h2>
        </div>
        <ProductList
          products={featuredProducts}
          onToggleWishlist={toggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={addToCart}
        />
      </section>

      <section className="editorial-banner">
        {content.editorials.map((item) => (
          <Link key={item.title} to="/products" className="editorial-card">
            <img src={item.image} alt={item.title} />
            <div className="editorial-copy">
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </section>

      <section className="mosaic-section">
        <div className="section-heading">
          <p className="eyebrow">Why shop with us</p>
          <h2>Quiet luxury, styled for the everyday</h2>
        </div>
        <div className="mosaic-grid">
          <article className="mosaic-tile mosaic-tile--portrait">
            <img className="mosaic-image" src={content.mosaic.clay} alt="Clay toned editorial visual" />
            <div className="mosaic-copy">
              <h3>Soft structure</h3>
              <p>Architectural lines paired with warm, wearable neutrals.</p>
            </div>
          </article>
          <article className="mosaic-tile mosaic-tile--feature">
            <div className="mosaic-copy">
              <p className="eyebrow">Biggest sale of the year</p>
              <h3>Up to 50% off selected styles</h3>
              <a href="#/products" className="primary-button primary-button--light">
                View collection
              </a>
            </div>
          </article>
          <article className="mosaic-tile mosaic-tile--stack">
            <img className="mosaic-image" src={content.mosaic.butter} alt="Butter yellow product mood" />
            <img className="mosaic-image" src={content.mosaic.pearl} alt="Pearl neutral product mood" />
          </article>
        </div>
      </section>

      <section className="best-seller-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Top picks</p>
          <h2>Best Sellers</h2>
        </div>
        <ProductList
          products={featuredProducts.slice(0, 4)}
          className="best-seller-grid"
          onToggleWishlist={toggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={addToCart}
        />
      </section>

      <section className="notes-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Happy clients</p>
          <h2>Elegant details, trusted service</h2>
        </div>
        <div className="notes-grid">
          {content.notes.map((note) => (
            <article key={note.title} className="note-card">
              <span className="rating">{'\u2605'.repeat(5)}</span>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Follow our Instagram</p>
          <h2>@Belinda Atelier</h2>
        </div>
        <div className="gallery-grid">
          {content.gallery.map((item) => (
            <article key={item.label} className="gallery-card">
              <img src={item.image} alt={item.label} />
              <span>{item.label}</span>
            </article>
          ))}
        </div>
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
