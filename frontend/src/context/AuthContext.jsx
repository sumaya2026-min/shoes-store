import React, { createContext, useContext, useEffect, useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../services/api'

const AuthContext = createContext(null)
const guestUser = { name: 'Guest', email: 'guest@revone.com' }

function normalizeUser(user) {
  if (!user || typeof user !== 'object') {
    return guestUser
  }

  return {
    id: user.id,
    name: user.name || user.first_name || user.username || 'Guest',
    email: user.email || guestUser.email,
    username: user.username || '',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    role: user.role || '',
  }
}

function getSavedUser() {
  try {
    const token = window.localStorage.getItem('revone_token')
    const saved = window.localStorage.getItem('revone_user')
    if (!token || !saved) return guestUser

    const parsed = JSON.parse(saved)
    return normalizeUser(parsed)
  } catch {
    window.localStorage.removeItem('revone_token')
    window.localStorage.removeItem('revone_user')
    return guestUser
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('revone_user', JSON.stringify(user))
  }, [user])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const data = await loginRequest(credentials)
      setUser(normalizeUser(data.user))
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      await registerRequest(payload)
      const result = await login({ username: payload.username, password: payload.password })
      return result
    } catch (error) {
      setLoading(false)
      return { ok: false, message: error.message }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('revone_token')
    window.localStorage.removeItem('revone_user')
    setUser(guestUser)
  }

  const isAuthenticated = user.email !== guestUser.email

  const syncUser = (nextUser) => {
    setUser(normalizeUser(nextUser))
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated, syncUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
