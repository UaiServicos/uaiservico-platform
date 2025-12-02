import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from "jsonwebtoken"

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key") as { userId: string }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { providerId, rating, comment } = await request.json()

    if (!providerId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    // Verificar se existe contato entre cliente e prestador
    const contact = await prisma.contact.findUnique({
      where: {
        clientId_providerId: {
          clientId: user.userId,
          providerId: providerId
        }
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contato não encontrado' }, { status: 404 })
    }

    if (!contact.canReview) {
      return NextResponse.json({ error: 'Você já avaliou este prestador' }, { status: 400 })
    }

    // Criar avaliação
    const review = await prisma.review.create({
      data: {
        contactId: contact.id,
        reviewerId: user.userId,
        providerId: providerId,
        rating: rating,
        comment: comment || null
      }
    })

    // Atualizar contato para não permitir nova avaliação
    await prisma.contact.update({
      where: { id: contact.id },
      data: {
        canReview: false,
        reviewedAt: new Date()
      }
    })

    // Recalcular rating médio do prestador
    await updateProviderRating(providerId)

    return NextResponse.json({ 
      review,
      message: 'Avaliação enviada com sucesso'
    })

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')

    if (!providerId) {
      return NextResponse.json({ error: 'ID do prestador é obrigatório' }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: {
        providerId: providerId
      },
      include: {
        reviewer: {
          select: {
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ reviews })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

async function updateProviderRating(providerId: string) {
  try {
    // Calcular rating médio
    const reviews = await prisma.review.findMany({
      where: { providerId },
      select: { rating: true }
    })

    if (reviews.length === 0) return

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / reviews.length

    // Atualizar perfil do prestador
    await prisma.providerProfile.update({
      where: { id: providerId },
      data: {
        rating: Math.round(averageRating * 10) / 10, // Arredondar para 1 casa decimal
        totalReviews: reviews.length
      }
    })

  } catch (error) {
    console.error('Error updating provider rating:', error)
  }
}
