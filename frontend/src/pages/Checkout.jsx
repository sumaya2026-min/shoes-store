import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { isAuthenticated, user } = useAuth()
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const [form, setForm] = useState({
    fullName: user.name === 'Guest' ? '' : user.name,
    email: user.email === 'guest@revone.com' ? '' : user.email,
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    paymentMethod: 'cash-on-delivery',
  })
  const [placed, setPlaced] = useState(false)

  function handlePlaceOrder(event) {
    event.preventDefault()
    if (!isAuthenticated) {
      window.location.hash = '/login'
      return
    }

    setPlaced(true)
    clearCart()
  }

  return (
    <main className="page-shell">
      <section className="checkout-page">
        <p className="eyebrow">Checkout</p>
        <h1>{placed ? 'Your order has been placed' : 'Complete your order'}</h1>

        {placed ? (
          <div className="empty-state">
            <p className="eyebrow">Order confirmed</p>
            <h3>Thank you for shopping with Revone.</h3>
            <p>Your order summary has been captured and the cart has been cleared.</p>
            <a href="#/orders" className="primary-button">
              View orders
            </a>
          </div>
        ) : !items.length ? (
          <div className="empty-state">
            <p className="eyebrow">No items</p>
            <h3>Add products before checking out.</h3>
            <p>The checkout page appears here once your cart has products.</p>
            <a href="#/products" className="primary-button">
              Shop now
            </a>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              {!isAuthenticated ? (
                <div className="notice-box">
                  <p>You need to login before placing the order.</p>
                  <a href="#/login" className="primary-button">
                    Go to login
                  </a>
                </div>
              ) : null}

              <div className="form-grid">
                <label>
                  Full name
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <div className="form-grid">
                <label>
                  Phone
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    required
                  />
                </label>
                <label>
                  Postal code
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(event) => setForm((current) => ({ ...current, postalCode: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <label>
                Address
                <input
                  type="text"
                  value={form.address}
                  onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                  required
                />
              </label>

              <div className="form-grid">
                <label>
                  City
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                    required
                  />
                </label>
                <label>
                  Country
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <label>
                Payment method
                <select
                  value={form.paymentMethod}
                  onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))}
                >
                  <option value="cash-on-delivery">Cash on delivery</option>
                  <option value="card-mock">Credit card (mock)</option>
                </select>
              </label>

              <button type="submit" className="primary-button" disabled={!isAuthenticated}>
                Place order
              </button>
            </form>

            <aside className="cart-summary">
              <h2>Order summary</h2>
              {items.map((item) => (
                <div key={item.id} className="summary-product">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>${shipping.toFixed(2)}</strong>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
