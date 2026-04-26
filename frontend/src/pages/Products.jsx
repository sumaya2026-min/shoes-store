import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import QuickViewModal from '../components/QuickViewModal'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'
import { getCategories, getProducts } from '../services/api'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const priceRanges = [
  { id: 'all', label: 'All prices', min: 0, max: Infinity },
  { id: 'under-90', label: 'Under $90', min: 0, max: 89.99 },
  { id: '90-120', label: '$90 - $120', min: 90, max: 120 },
  { id: '121-plus', label: '$121+', min: 121, max: Infinity },
]

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  useEffect(() => {
    async function load() {
      try {
        setError('')
        setProducts(await getProducts())
        const loadedCategories = await getCategories()
        const categoryNames = loadedCategories.map((category) => category.name)
        const requestedCategory = searchParams.get('category')
        const matchedCategory = loadedCategories.find(
          (category) => category.slug === requestedCategory || category.name.toLowerCase() === requestedCategory?.toLowerCase()
        )

        setCategories(['All', ...categoryNames])

        if (matchedCategory) {
          setSelectedCategory(matchedCategory.name)
        }
      } catch (loadError) {
        setProducts([])
        setCategories(['All'])
        setError(loadError.message || 'Could not load products.')
      }
    }

    load()
  }, [searchParams])

  if (!products) {
    return <Loader />
  }

  const activePrice = priceRanges.find((range) => range.id === selectedPriceRange) || priceRanges[0]

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false
      if (availability === 'in-stock' && !product.available) return false
      if (availability === 'out-of-stock' && product.available) return false
      if (product.price < activePrice.min || product.price > activePrice.max) return false

      const query = search.trim().toLowerCase()
      if (!query) return true

      return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return Number(b.isNew) - Number(a.isNew) || b.id - a.id
    })

  return (
    <main className="page-shell">
      <section className="catalog-section">
        <div className="catalog-hero">
          <div className="catalog-hero__copy">
            <p className="eyebrow">Products page</p>
            <h2>Search, filter, and sort the full collection.</h2>
            <p>Browse all products with category, price, availability, sorting, and live search functionality.</p>
          </div>
          <div className="catalog-hero__stats">
            <article>
              <span className="stat-label">Categories</span>
              <strong>{categories.length - 1}</strong>
            </article>
            <article>
              <span className="stat-label">Available now</span>
              <strong>{products.filter((product) => product.available).length}</strong>
            </article>
            <article>
              <span className="stat-label">New arrivals</span>
              <strong>{products.filter((product) => product.isNew).length}</strong>
            </article>
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="filters-panel">
            <div className="filter-block">
              <label className="filter-label" htmlFor="search">
                Search
              </label>
              <SearchBar value={search} onChange={setSearch} placeholder="Search by name or category" />
            </div>

            <div className="filter-block">
              <p className="filter-label">Category</p>
              <div className="chip-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={selectedCategory === category ? 'chip chip--active' : 'chip'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <p className="filter-label">Price range</p>
              <div className="option-list">
                {priceRanges.map((range) => (
                  <label key={range.id} className="option-row">
                    <input
                      type="radio"
                      name="price-range"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <p className="filter-label">Availability</p>
              <div className="option-list">
                {[
                  ['all', 'All products'],
                  ['in-stock', 'In stock'],
                  ['out-of-stock', 'Out of stock'],
                ].map(([value, label]) => (
                  <label key={value} className="option-row">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === value}
                      onChange={() => setAvailability(value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
                setSelectedPriceRange('all')
                setAvailability('all')
                setSortBy('newest')
              }}
            >
              Reset filters
            </button>
          </aside>

          <section className="results-panel">
            <div className="results-toolbar">
              <div>
                <p className="eyebrow">All products</p>
                <h2>{filteredProducts.length} styles found</h2>
                {error ? <p className="dashboard-message dashboard-message--error">{error}</p> : null}
              </div>
              <label className="sort-control" htmlFor="sort-by">
                <span>Sort by</span>
                <select id="sort-by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>
            </div>

            {filteredProducts.length ? (
              <ProductList
                products={filteredProducts}
                className="catalog-grid"
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickViewProduct}
                onAddToCart={addToCart}
              />
            ) : (
              <div className="empty-state">
                <p className="eyebrow">No match found</p>
                <h3>Try changing your search or filters.</h3>
                <p>We could not find products matching the current combination.</p>
              </div>
            )}
          </section>
        </div>

        <QuickViewModal
          product={quickViewProduct}
          isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
          onClose={() => setQuickViewProduct(null)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      </section>
    </main>
  )
}
