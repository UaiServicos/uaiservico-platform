import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 })
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Nova Mensagem de Contato - UAI Serviços</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; background: #f9f9f9; border-radius: 8px; margin: 20px 0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nova Mensagem de Contato</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nome:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">E-mail:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Assunto:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Mensagem:</div>
              <div class="value">${message}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await sendEmail({
      to: 'contato.uaiservicos@gmail.com',
      subject: `[UAI Serviços] ${subject} - ${name}`,
      html: emailHtml
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' })
    } else {
      return NextResponse.json({ error: 'Erro ao enviar mensagem' }, { status: 500 })
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}