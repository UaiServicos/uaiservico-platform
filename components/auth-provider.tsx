"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  userType: 'CLIENT' | 'PROVIDER'
  avatar?: string
  clientProfile?: any
  providerProfile?: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (userData: User) => void
  logout: () => void
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    try {
      const response = await fetch('/api/profile', {
        credentials: 'include'
      })
      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error loading user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
      window.location.href = '/login'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch: loadUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}