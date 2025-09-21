import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const provider = await prisma.providerProfile.findFirst({
      where: { 
        OR: [
          { userId: params.id },
          { id: params.id }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            email: true
          }
        },
        services: {
          include: {
            category: true
          }
        },
        formations: true
      }
    })

    let authorId = params.id
    if (provider) {
      authorId = provider.userId
    }

    const posts = await prisma.post.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        _count: {
          select: {
            postLikes: true,
            comments: true
          }
        }
      }
    })

    // Parse images from JSON string
    const postsWithParsedImages = posts.map(post => ({
      ...post,
      images: post.images ? JSON.parse(post.images) : []
    }))

    if (!provider) {
      return NextResponse.json({ error: 'Prestador não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ provider: { ...provider, posts: postsWithParsedImages } })
  } catch (error) {
    console.error('Get provider error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}