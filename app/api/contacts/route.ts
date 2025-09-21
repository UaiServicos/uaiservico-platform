import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from "jsonwebtoken"

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (!token) return null

  try {
    return jwt.verify(token, "fallback-secret-key") as { userId: string }
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

    const { providerId } = await request.json()

    if (!providerId) {
      return NextResponse.json({ error: 'ID do prestador é obrigatório' }, { status: 400 })
    }

    // Verificar se o contato já existe
    const existingContact = await prisma.contact.findUnique({
      where: {
        clientId_providerId: {
          clientId: user.userId,
          providerId: providerId
        }
      }
    })

    if (existingContact) {
      return NextResponse.json({ 
        contact: existingContact,
        message: 'Contato já registrado'
      })
    }

    // Criar novo contato
    const contact = await prisma.contact.create({
      data: {
        clientId: user.userId,
        providerId: providerId,
        canReview: true
      }
    })

    return NextResponse.json({ 
      contact,
      message: 'Contato registrado com sucesso'
    })

  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')

    if (providerId) {
      // Buscar contato específico
      const contact = await prisma.contact.findUnique({
        where: {
          clientId_providerId: {
            clientId: user.userId,
            providerId: providerId
          }
        },
        include: {
          review: true
        }
      })

      return NextResponse.json({ contact })
    } else {
      // Buscar todos os contatos do usuário
      const contacts = await prisma.contact.findMany({
        where: {
          clientId: user.userId
        },
        include: {
          provider: {
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true
                }
              }
            }
          },
          review: true
        },
        orderBy: {
          contactedAt: 'desc'
        }
      })

      return NextResponse.json({ contacts })
    }

  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
