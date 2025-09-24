import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, generateEmailTemplate } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }

    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Por segurança, retornar sucesso mesmo se o email não existir
      return NextResponse.json({ 
        message: 'Se o email existir em nosso sistema, você receberá instruções para redefinir sua senha.' 
      })
    }

    // Gerar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Salvar token no banco
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires
      }
    })

    // Enviar email
    const emailHtml = generateEmailTemplate('password-reset', {
      name: user.name,
      token: resetToken
    })

    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Redefinir Senha - UAIServiço',
      html: emailHtml
    })

    if (!emailResult.success) {
      console.error('Erro ao enviar email de reset:', emailResult.error)
      return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Se o email existir em nosso sistema, você receberá instruções para redefinir sua senha.' 
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

