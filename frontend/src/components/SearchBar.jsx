import React from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search products' }) {
  return (
    <input
      className="search-input"
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  )
}
