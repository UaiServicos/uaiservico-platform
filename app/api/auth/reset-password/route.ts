import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token e nova senha são obrigatórios' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 6 caracteres' }, { status: 400 })
    }

    // Buscar usuário pelo token válido
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date() // Token ainda não expirou
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 })
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Atualizar senha e limpar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    })

    return NextResponse.json({ message: 'Senha redefinida com sucesso' })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

