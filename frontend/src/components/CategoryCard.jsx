import React from "react"
import { Link } from "react-router-dom"

export default function CategoryCard({ category, index }) {
  return (
    <Link to={`/products?category=${category.slug}`} className="category-card">

      {category.image && (
        <img
          src={category.image}
          alt={category.name}
          className="category-orb-image"
        />
      )}

      <p>{category.name}</p>
      <span>{category.label}</span>

    </Link>
  )
}