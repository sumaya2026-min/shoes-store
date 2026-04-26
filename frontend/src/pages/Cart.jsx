import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart()

  return (
    <main className="page-shell">
      <section className="cart-page">
        <p className="eyebrow">Cart</p>
        <h1>{items.length ? 'Review your selected styles' : 'Your cart is empty'}</h1>

        {items.length ? (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <article key={item.cartItemId} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                  <div className="cart-item__content">
                    <div>
                      <p className="eyebrow">{item.category}</p>
                      <h2>{item.name}</h2>
                      {item.size ? <p className="cart-copy">Size {item.size}</p> : null}
                      <p className="cart-copy">{item.description}</p>
                    </div>
                    <div className="cart-item__actions">
                      <label>
                        Qty
                        <select
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.cartItemId, Number(event.target.value))}
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </label>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      <button type="button" className="ghost-button" onClick={() => removeFromCart(item.cartItemId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Order summary</h2>
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
              <a href="#/checkout" className="primary-button cart-summary__button">
                Proceed to checkout
              </a>
            </aside>
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">No items yet</p>
            <h3>Add a few products to continue.</h3>
            <p>Your selected products will appear here with quantity controls and order total.</p>
            <a href="#/products" className="primary-button">
              Browse products
            </a>
          </div>
        )}
      </section>
    </main>
  )
}
