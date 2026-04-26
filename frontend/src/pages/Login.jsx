import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const result = await login(form)

    if (!result.ok) {
      setError(result.message || 'Login failed')
      return
    }

    window.location.hash = '/profile'
  }

  return (
    <main className="page-shell">
      <section className="auth-page">
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
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
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="auth-switch">
          Don&apos;t have an account? <a href="#/register">Create one</a>
        </p>
      </section>
    </main>
  )
}
