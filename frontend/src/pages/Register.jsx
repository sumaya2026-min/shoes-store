import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register, loading } = useAuth()
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const result = await register(form)

    if (!result.ok) {
      setError(result.message || 'Registration failed')
      return
    }

    window.location.hash = '/profile'
  }

  return (
    <main className="page-shell">
      <section className="auth-page">
        <p className="eyebrow">Register</p>
        <h1>Create your account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              First name
              <input
                type="text"
                value={form.first_name}
                onChange={(event) => setForm((current) => ({ ...current, first_name: event.target.value }))}
                required
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                value={form.last_name}
                onChange={(event) => setForm((current) => ({ ...current, last_name: event.target.value }))}
                required
              />
            </label>
          </div>
          <label>
            Username
            <input
              type="text"
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
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
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <a href="#/login">Login</a>
        </p>
      </section>
    </main>
  )
}
