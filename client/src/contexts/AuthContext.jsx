import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiRegister, apiGetMe } from '../services/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'pic2latex_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    apiGetMe(token)
      .then(data => {
        if (data.success) {
          setUser(data.user)
        } else {
          logout()
        }
      })
      .catch(() => logout())
      .finally(() => setLoading(false))
  }, [])

  const login = async (username, password) => {
    const data = await apiLogin(username, password)
    if (data.success) {
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    return data
  }

  const register = async (username, password) => {
    const data = await apiRegister(username, password)
    if (data.success) {
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
