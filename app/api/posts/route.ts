import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  
  try {
    return jwt.verify(token, 'fallback-secret-key') as { userId: string }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const serviceType = searchParams.get('serviceType')
    const following = searchParams.get('following') === 'true'
    
    const user = getUserFromToken(request)
    
    let whereClause: any = {}
    
    if (region) {
      whereClause.location = { contains: region, mode: 'insensitive' }
    }
    
    if (serviceType) {
      whereClause.serviceType = { contains: serviceType, mode: 'insensitive' }
    }
    
    if (following && user) {
      const followedUsers = await prisma.follow.findMany({
        where: { followerId: user.userId },
        select: { followingId: true }
      })
      whereClause.authorId = { in: followedUsers.map(f => f.followingId) }
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          include: {
            providerProfile: true
          }
        },
        _count: {
          select: {
            comments: true,
            postLikes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    // Parse images from JSON string
    const postsWithParsedImages = posts.map(post => ({
      ...post,
      images: post.images ? JSON.parse(post.images) : []
    }))

    return NextResponse.json({ posts: postsWithParsedImages })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { title, content, images, serviceType, location } = await request.json()

    const post = await prisma.post.create({
      data: {
        title,
        content,
        images: images ? JSON.stringify(images) : null,
        serviceType,
        location,
        authorId: user.userId
      },
      include: {
        author: {
          include: {
            providerProfile: true
          }
        },
        _count: {
          select: {
            comments: true,
            postLikes: true
          }
        }
      }
    })

    // Parse images from JSON string
    const postWithParsedImages = {
      ...post,
      images: post.images ? JSON.parse(post.images) : []
    }

    return NextResponse.json({ post: postWithParsedImages })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}