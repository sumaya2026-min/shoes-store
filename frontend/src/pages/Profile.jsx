import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, updateProfile } from '../services/api'
import { useAuth } from '../context/AuthContext'

function buildForm(profile) {
  return {
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
  }
}

export default function Profile() {
  const { isAuthenticated, syncUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState(buildForm(null))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadProfile() {
      if (!isAuthenticated) {
        setLoading(false)
        setError('Please log in to view your profile.')
        return
      }

      setLoading(true)
      setError('')

      try {
        const data = await getProfile()
        if (cancelled) return
        setProfile(data)
        setForm(buildForm(data))
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || 'We could not load your profile right now.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const updated = await updateProfile(form)
      setProfile(updated)
      setForm(buildForm(updated))
      syncUser(updated)
      setSuccess('Your profile has been updated.')
    } catch (saveError) {
      setError(saveError.message || 'We could not save your profile right now.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="page-shell">
        <section className="profile-page">
          <div className="profile-hero">
            <p className="eyebrow">Profile</p>
            <h1>Loading your account</h1>
            <p>Fetching your personal details now.</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="profile-page">
        <div className="profile-hero">
          <p className="eyebrow">Profile</p>
          <h1>{profile?.first_name || profile?.username || 'Your account'}</h1>
          <p>Update your details here so checkout and account screens stay current.</p>
          {error ? <p className="dashboard-message dashboard-message--error">{error}</p> : null}
          {success ? <p className="profile-message profile-message--success">{success}</p> : null}
          {!isAuthenticated ? (
            <p className="dashboard-message">
              <Link to="/login">Go to login</Link>
            </p>
          ) : null}
        </div>

        <div className="profile-grid">
          <article className="profile-panel">
            <h2>Account details</h2>
            <form className="auth-form profile-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  First name
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(event) => setForm((current) => ({ ...current, first_name: event.target.value }))}
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(event) => setForm((current) => ({ ...current, last_name: event.target.value }))}
                  />
                </label>
              </div>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </label>

              <div className="profile-actions">
                <button type="submit" className="primary-button" disabled={!isAuthenticated || saving}>
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </article>

          <aside className="profile-panel">
            <h2>Account summary</h2>
            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Username</strong>
                <span>{profile?.username || 'Not available'}</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Email</strong>
                <span>{profile?.email || 'Not available'}</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Role</strong>
                <span>{profile?.role || 'customer'}</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Full name</strong>
                <span>{`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Not provided'}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
