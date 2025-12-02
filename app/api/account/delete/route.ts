import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as { userId: string }
    
    // Deletar em cascata: perfis, posts, follows, etc.
    await prisma.$transaction(async (tx) => {
      // Deletar posts do usuário
      await tx.post.deleteMany({
        where: { authorId: decoded.userId }
      })

      // Deletar relacionamentos de follow
      await tx.follow.deleteMany({
        where: {
          OR: [
            { followerId: decoded.userId },
            { followingId: decoded.userId }
          ]
        }
      })

      // Deletar perfis
      await tx.clientProfile.deleteMany({
        where: { userId: decoded.userId }
      })

      await tx.providerProfile.deleteMany({
        where: { userId: decoded.userId }
      })

      // Deletar usuário
      await tx.user.delete({
        where: { id: decoded.userId }
      })
    })

    // Limpar cookie
    const response = NextResponse.json({ message: 'Conta deletada com sucesso' })
    response.cookies.delete('token')
    
    return response

  } catch (error) {
    console.error('Erro ao deletar conta:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}