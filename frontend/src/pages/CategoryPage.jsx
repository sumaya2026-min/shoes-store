import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'

export default function CategoryPage() {
  const { slug } = useParams()
  const [products, setProducts] = useState(undefined)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setError('')
        const data = await getProducts()
        setProducts(data.filter((product) => product.category?.toLowerCase() === slug.toLowerCase()))
      } catch (loadError) {
        setProducts([])
        setError(loadError.message || 'Could not load category products.')
      }
    }

    load()
  }, [slug])

  if (products === undefined) {
    return <Loader />
  }

  return (
    <main className="page-shell">
      <section className="catalog-section">
        <div className="section-heading">
          <p className="eyebrow">Category</p>
          <h1>{slug}</h1>
          {error ? <p className="dashboard-message dashboard-message--error">{error}</p> : null}
        </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </section>
    </main>
  )
}
