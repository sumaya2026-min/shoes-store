import React from 'react'

export default function Banner({ image, eyebrow, title, text, primaryHref = '#/products', primaryText = 'Shop now' }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-text">{text}</p>
        <div className="hero-actions">
          <a href={primaryHref} className="primary-button">
            {primaryText}
          </a>
          <a href="#/contact" className="secondary-link">
            Contact Us
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <img src={image} alt={title} />
      </div>
    </section>
  )
}
