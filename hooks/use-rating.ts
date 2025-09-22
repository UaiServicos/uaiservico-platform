"use client"

import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'

interface Contact {
  id: string
  providerId: string
  canReview: boolean
  reviewedAt?: string
  review?: {
    id: string
    rating: number
    comment?: string
    createdAt: string
  }
}

export function useRating() {
  const { user } = useAuth()
  const [pendingRatings, setPendingRatings] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)

  // Verificar se há avaliações pendentes quando o usuário volta ao site
  useEffect(() => {
    if (user && user.userType === 'CLIENT') {
      checkPendingRatings()
    }
  }, [user])

  const checkPendingRatings = async () => {
    if (!user) return

    try {
      setLoading(true)
      const response = await fetch('/api/contacts', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        const pending = data.contacts?.filter((contact: Contact) => 
          contact.canReview && !contact.review
        ) || []
        
        setPendingRatings(pending)
      }
    } catch (error) {
      console.error('Error checking pending ratings:', error)
    } finally {
      setLoading(false)
    }
  }

  const markContactAsMade = async (providerId: string) => {
    if (!user) return

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ providerId })
      })

      if (response.ok) {
        // Verificar novamente as avaliações pendentes
        setTimeout(() => {
          checkPendingRatings()
        }, 1000)
      }
    } catch (error) {
      console.error('Error marking contact:', error)
    }
  }

  const removePendingRating = (providerId: string) => {
    setPendingRatings(prev => 
      prev.filter(contact => contact.providerId !== providerId)
    )
  }

  return {
    pendingRatings,
    loading,
    markContactAsMade,
    removePendingRating,
    checkPendingRatings
  }
}
