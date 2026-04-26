import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import logo from '../assets/images/logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { user, isAuthenticated, logout } = useAuth()

  const handleMenuToggle = () => setIsMenuOpen((current) => !current)
  const handleMenuClose = () => setIsMenuOpen(false)

  return (
    <>
      <div className="top-strip">
        <span>New season arrivals now live</span>
        <span>Structured storefront starter</span>
      </div>
      <header className={`site-header ${isMenuOpen ? 'site-header--menu-open' : ''}`}>
        <div className="brand-lockup">
          <button
            className={`menu-button ${isMenuOpen ? 'menu-button--active' : ''}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={handleMenuToggle}
          >
            <span />
            <span />
          </button>
          <Link className="brand-name" to="/" onClick={handleMenuClose}>
            <img src={logo} alt="massoud center" className="logo" />
          </Link>
        </div>
        <nav id="primary-navigation" className="main-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={handleMenuClose}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-tools">
          <Link to={isAuthenticated ? '/profile' : '/login'} onClick={handleMenuClose}>
            {user?.name || user?.username || 'Account'}
          </Link>
          <span>Wishlist ({wishlistCount})</span>
          <Link to="/cart" onClick={handleMenuClose}>Cart ({itemCount})</Link>
          {isAuthenticated ? (
            <button type="button" className="header-link-button" onClick={() => { logout(); handleMenuClose() }}>
              Logout
            </button>
          ) : (
            <Link to="/register" onClick={handleMenuClose}>Register</Link>
          )}
        </div>
      </header>
    </>
  )
}
