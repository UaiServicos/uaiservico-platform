import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as { userId: string, userType: string }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        clientProfile: true,
        providerProfile: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    let updatedProfile
    let newStatus

    if (user.userType === 'CLIENT' && user.clientProfile) {
      newStatus = !user.clientProfile.active
      updatedProfile = await prisma.clientProfile.update({
        where: { userId: user.id },
        data: { active: newStatus }
      })
    } else if (user.userType === 'PROVIDER' && user.providerProfile) {
      newStatus = !user.providerProfile.active
      updatedProfile = await prisma.providerProfile.update({
        where: { userId: user.id },
        data: { active: newStatus }
      })
    } else {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      active: newStatus,
      message: newStatus ? 'Perfil ativado com sucesso!' : 'Perfil desativado com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao alterar status:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}