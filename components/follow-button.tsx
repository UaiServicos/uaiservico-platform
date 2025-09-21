'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

interface FollowButtonProps {
  providerId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function FollowButton({ 
  providerId, 
  variant = 'default', 
  size = 'default',
  className = ''
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkFollowStatus()
  }, [providerId])

  const checkFollowStatus = async () => {
    try {
      const response = await fetch(`/api/follow/${providerId}`)
      if (response.ok) {
        const { following } = await response.json()
        setIsFollowing(following)
      }
    } catch (error) {
      console.error('Error checking follow status:', error)
    }
  }

  const handleToggleFollow = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/follow/${providerId}`, {
        method: 'POST'
      })

      if (response.ok) {
        const { following } = await response.json()
        setIsFollowing(following)
        toast.success(following ? 'Agora você segue este prestador!' : 'Você parou de seguir este prestador')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao atualizar seguimento')
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
      toast.error('Erro ao atualizar seguimento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : variant}
      size={size}
      onClick={handleToggleFollow}
      disabled={loading}
      className={className}
    >
      {isFollowing ? (
        <>
          <Heart className="w-4 h-4 mr-1 fill-current" />
          Seguindo
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-1" />
          Seguir
        </>
      )}
    </Button>
  )
}