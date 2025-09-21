import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as { userId: string }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError)
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const { avatar } = await request.json()

    if (!avatar) {
      return NextResponse.json({ error: 'Avatar é obrigatório' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatar }
    })

    return NextResponse.json({ 
      success: true, 
      avatar: updatedUser.avatar 
    })
  } catch (error) {
    console.error('Upload avatar error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar foto' }, { status: 500 })
  }
}