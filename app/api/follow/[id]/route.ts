import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return null
  
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId: string }
  } catch {
    return null
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const providerId = params.id

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.userId,
          followingId: providerId
        }
      }
    })

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: user.userId,
            followingId: providerId
          }
        }
      })
      return NextResponse.json({ following: false })
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: user.userId,
          followingId: providerId
        }
      })
      return NextResponse.json({ following: true })
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ following: false })
    }

    const providerId = params.id

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.userId,
          followingId: providerId
        }
      }
    })

    return NextResponse.json({ following: !!follow })
  } catch (error) {
    console.error('Check follow status error:', error)
    return NextResponse.json({ following: false })
  }
}