import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key") as { userId: string }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Atualizar lastActivity
    await prisma.user.update({
      where: { id: user.userId },
      data: { lastActivity: new Date() }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Activity update error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
