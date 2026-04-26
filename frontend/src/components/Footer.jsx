import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-name brand-name--footer">Bélinda Atelier</span>
        <p>Fashion-forward footwear and accessories designed to feel light, polished, and collectible.</p>
      </div>
      <div>
        <h4>Shop</h4>
        <a href="#/products">New arrivals</a>
        <a href="#/products">Best sellers</a>
        <a href="#/products">Sale edit</a>
      </div>
      <div>
        <h4>Account</h4>
        <a href="#/login">Login</a>
        <a href="#/register">Register</a>
        <a href="#/profile">Profile</a>
      </div>
      <form className="newsletter">
        <label htmlFor="email">Join our newsletter</label>
        <div className="newsletter-row">
          <input id="email" type="email" placeholder="Email address" />
          <button type="button">Subscribe</button>
        </div>
      </form>
    </footer>
  )
}
