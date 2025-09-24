import { NextRequest, NextResponse } from 'next/server'
import { testEmailConfiguration, sendTestEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const email = searchParams.get('email')

    if (action === 'test-config') {
      // Testar apenas a configuração
      const result = await testEmailConfiguration()
      return NextResponse.json(result)
    }

    if (action === 'send-test' && email) {
      // Enviar email de teste
      const result = await sendTestEmail(email)
      return NextResponse.json(result)
    }

    return NextResponse.json({ 
      error: 'Parâmetros inválidos. Use ?action=test-config ou ?action=send-test&email=seu@email.com' 
    }, { status: 400 })

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}
