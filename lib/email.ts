import nodemailer from 'nodemailer'

// Interface para configurações de email
interface EmailConfig {
  service: string
  user: string
  pass: string
  from: string
}

// Função para validar configurações de email
function validateEmailConfig(): EmailConfig {
  // Debug: mostrar todas as variáveis de ambiente relacionadas ao email
  console.log('🔍 Debug - Variáveis de ambiente:')
  console.log('SMTP_SERVICE:', process.env.SMTP_SERVICE)
  console.log('SMTP_USER:', process.env.SMTP_USER ? '***configurado***' : 'não encontrado')
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configurado***' : 'não encontrado')
  console.log('SMTP_FROM:', process.env.SMTP_FROM)

  const config = {
    service: process.env.SMTP_SERVICE || 'gmail',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'UAIServiço <noreply@uaiservico.com>'
  }

  // Verificar se as variáveis estão definidas
  const hasUser = !!process.env.SMTP_USER
  const hasPass = !!process.env.SMTP_PASS

  console.log('📊 Status da configuração:')
  console.log('- SMTP_USER definido:', hasUser)
  console.log('- SMTP_PASS definido:', hasPass)
  console.log('- Modo produção:', hasUser && hasPass)

  if (!hasUser || !hasPass) {
    console.warn('⚠️ Configurações de email não encontradas. Usando modo de desenvolvimento.')
    console.warn('📝 Para configurar email real, crie um arquivo .env com SMTP_USER e SMTP_PASS')
  } else {
    console.log('✅ Configurações de email encontradas! Usando modo produção.')
  }

  return config
}

// Configuração do transporter de email com validação
let transporter: nodemailer.Transporter

try {
  const config = validateEmailConfig()
  
  // Verificar se as variáveis estão definidas
  const hasUser = !!process.env.SMTP_USER
  const hasPass = !!process.env.SMTP_PASS
  
  if (!hasUser || !hasPass) {
    console.log('🔧 Usando modo de desenvolvimento para email')
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    })
  } else {
    console.log('📧 Configurando transporter SMTP real...')
    transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass
      },
      // Configurações adicionais para melhor compatibilidade
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
      rateDelta: 20000,
      rateLimit: 5
    })

    // Verificar se a configuração está funcionando
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Erro na configuração de email:', error.message)
        console.error('💡 Verifique se a senha de aplicativo está correta')
      } else {
        console.log('✅ Configuração de email verificada com sucesso')
        console.log('📧 Pronto para enviar emails reais!')
      }
    })
  }
} catch (error) {
  console.error('❌ Erro ao configurar email:', error)
  // Criar um transporter mock para desenvolvimento
  transporter = nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  })
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Validar opções de email
    if (!options.to || !options.subject || !options.html) {
      throw new Error('Campos obrigatórios não fornecidos: to, subject, html')
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(options.to)) {
      throw new Error('Formato de email inválido')
    }

    const config = validateEmailConfig()
    
    const mailOptions = {
      from: config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Converter HTML para texto
      // Configurações adicionais para melhor entrega
      headers: {
        'X-Mailer': 'UAIServiço Platform',
        'X-Priority': '3'
      }
    }

    // Verificar se está em modo de desenvolvimento
    const hasUser = !!process.env.SMTP_USER
    const hasPass = !!process.env.SMTP_PASS
    
    if (!hasUser || !hasPass) {
      console.log(`🔧 [MODO DESENVOLVIMENTO] Simulando envio de email para: ${options.to}`)
      console.log(`📧 Assunto: ${options.subject}`)
      console.log(`📝 Conteúdo: ${options.html.substring(0, 100)}...`)
      
      return { 
        success: true, 
        messageId: `dev-${Date.now()}` 
      }
    }

    console.log(`📧 Enviando email para: ${options.to}`)
    const result = await transporter.sendMail(mailOptions)
    
    console.log(`✅ Email enviado com sucesso! ID: ${result.messageId}`)
    return { 
      success: true, 
      messageId: result.messageId 
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error(`❌ Erro ao enviar email para ${options.to}:`, errorMessage)
    
    return { 
      success: false, 
      error: errorMessage 
    }
  }
}

// Função para testar a configuração de email
export async function testEmailConfiguration(): Promise<{ success: boolean; message: string }> {
  try {
    const config = validateEmailConfig()
    
    // Verificar se está em modo de desenvolvimento
    const hasUser = !!process.env.SMTP_USER
    const hasPass = !!process.env.SMTP_PASS
    
    if (!hasUser || !hasPass) {
      return {
        success: true,
        message: `🔧 [MODO DESENVOLVIMENTO] Email configurado para simulação\n\nPara configurar email real:\n1. Crie um arquivo .env na raiz do projeto\n2. Adicione:\n   SMTP_USER="seu-email@gmail.com"\n   SMTP_PASS="sua-senha-de-aplicativo"\n3. Reinicie o servidor\n\nConfiguração atual:\nServiço: ${config.service}\nUsuário: ${config.user}\nFrom: ${config.from}`
      }
    }
    
    // Verificar se o transporter está configurado
    if (!transporter) {
      throw new Error('Transporter não foi configurado corretamente')
    }

    // Testar conexão SMTP
    await new Promise<void>((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })

    return {
      success: true,
      message: `✅ Configuração de email verificada com sucesso!\nServiço: ${config.service}\nUsuário: ${config.user}\nFrom: ${config.from}`
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return {
      success: false,
      message: `❌ Erro na configuração de email: ${errorMessage}\n\nVerifique:\n1. Se as variáveis SMTP_USER e SMTP_PASS estão definidas no arquivo .env\n2. Se a senha de aplicativo está correta (para Gmail)\n3. Se o serviço SMTP está correto`
    }
  }
}

// Função para enviar email de teste
export async function sendTestEmail(to: string): Promise<{ success: boolean; message: string }> {
  try {
    const testHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Teste de Email - UAIServiço</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Teste de Email</h1>
          </div>
          <div class="content">
            <p>Este é um email de teste enviado pelo sistema UAIServiço.</p>
            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p>Se você recebeu este email, a configuração está funcionando corretamente!</p>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await sendEmail({
      to,
      subject: 'Teste de Email - UAIServiço',
      html: testHtml
    })

    if (result.success) {
      const hasUser = !!process.env.SMTP_USER
      const hasPass = !!process.env.SMTP_PASS
      
      if (!hasUser || !hasPass) {
        return {
          success: true,
          message: `🔧 [MODO DESENVOLVIMENTO] Email de teste simulado para ${to}!\nID: ${result.messageId}\n\nPara enviar emails reais, configure as variáveis SMTP_USER e SMTP_PASS no arquivo .env`
        }
      } else {
        return {
          success: true,
          message: `✅ Email de teste enviado com sucesso para ${to}!\nID: ${result.messageId}`
        }
      }
    } else {
      return {
        success: false,
        message: `❌ Falha ao enviar email de teste: ${result.error}`
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return {
      success: false,
      message: `❌ Erro ao enviar email de teste: ${errorMessage}`
    }
  }
}

export function generateEmailTemplate(type: 'welcome' | 'password-reset', data: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  switch (type) {
    case 'welcome':
      return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bem-vindo ao UAI Serviços</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              background-color: #f8f9fa;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white; 
              padding: 40px 20px; 
              text-align: center; 
            }
            .header h1 { 
              font-size: 28px; 
              margin-bottom: 10px;
              font-weight: 600;
            }
            .content { 
              padding: 40px 30px; 
            }
            .welcome-text {
              font-size: 18px;
              margin-bottom: 20px;
              color: #2c3e50;
            }
            .features {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 10px;
              margin: 25px 0;
            }
            .features h3 {
              color: #495057;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .features ul {
              list-style: none;
              padding: 0;
            }
            .features li {
              padding: 8px 0;
              position: relative;
              padding-left: 25px;
            }
            .features li:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #28a745;
              font-weight: bold;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: 600;
              text-align: center;
              transition: transform 0.2s ease;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .footer { 
              background: #f8f9fa;
              text-align: center; 
              color: #6c757d; 
              font-size: 14px; 
              padding: 30px 20px;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              margin: 5px 0;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            @media (max-width: 600px) {
              .email-container { margin: 0; }
              .content { padding: 30px 20px; }
              .header { padding: 30px 20px; }
              .header h1 { font-size: 24px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">🎉 UAI Serviços</div>
              <h1>Bem-vindo à nossa plataforma!</h1>
            </div>
            <div class="content">
              <p class="welcome-text">Olá <strong>${data.name}</strong>,</p>
              <p>Sua conta foi criada com sucesso! Agora você tem acesso a uma plataforma completa para conectar-se com os melhores profissionais.</p>
              
              <div class="features">
                <h3>O que você pode fazer agora:</h3>
                <ul>
                  <li>Buscar profissionais qualificados na sua região</li>
                  <li>Contratar serviços com total segurança</li>
                  <li>Avaliar e ser avaliado por outros usuários</li>
                  <li>Gerenciar todos os seus serviços em um só lugar</li>
                  <li>Acompanhar o status dos seus pedidos em tempo real</li>
                </ul>
              </div>
              
              <p>Para começar a usar nossa plataforma, faça login em sua conta:</p>
              <div style="text-align: center;">
                <a href="${baseUrl}/login" class="button">Fazer Login</a>
              </div>
              
              <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
                Se você não criou esta conta, pode ignorar este email com segurança.
              </p>
            </div>
            <div class="footer">
              <p><strong>UAI Serviços</strong></p>
              <p>Conectando você aos melhores profissionais</p>
              <p style="margin-top: 15px; font-size: 12px;">
                Este é um email automático, não responda.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    
    case 'password-reset':
      return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redefinir Senha - UAI Serviços</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              background-color: #f8f9fa;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
              color: white; 
              padding: 40px 20px; 
              text-align: center; 
            }
            .header h1 { 
              font-size: 28px; 
              margin-bottom: 10px;
              font-weight: 600;
            }
            .content { 
              padding: 40px 30px; 
            }
            .reset-text {
              font-size: 18px;
              margin-bottom: 20px;
              color: #2c3e50;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: 600;
              text-align: center;
              transition: transform 0.2s ease;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .warning { 
              background: #fff3cd; 
              border: 1px solid #ffeaa7; 
              padding: 20px; 
              border-radius: 10px; 
              margin: 25px 0;
              border-left: 4px solid #ffc107;
            }
            .warning h3 {
              color: #856404;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .warning ul {
              list-style: none;
              padding: 0;
            }
            .warning li {
              padding: 5px 0;
              position: relative;
              padding-left: 25px;
              color: #856404;
            }
            .warning li:before {
              content: "⚠";
              position: absolute;
              left: 0;
              color: #ffc107;
              font-weight: bold;
            }
            .footer { 
              background: #f8f9fa;
              text-align: center; 
              color: #6c757d; 
              font-size: 14px; 
              padding: 30px 20px;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              margin: 5px 0;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .security-note {
              background: #e3f2fd;
              border: 1px solid #bbdefb;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              color: #1565c0;
            }
            @media (max-width: 600px) {
              .email-container { margin: 0; }
              .content { padding: 30px 20px; }
              .header { padding: 30px 20px; }
              .header h1 { font-size: 24px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">🔐 UAI Serviços</div>
              <h1>Redefinir Senha</h1>
            </div>
            <div class="content">
              <p class="reset-text">Olá <strong>${data.name}</strong>,</p>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta no UAI Serviços.</p>
              <p>Para criar uma nova senha, clique no botão abaixo:</p>
              
              <div style="text-align: center;">
                <a href="${baseUrl}/reset-password?token=${data.token}" class="button">Redefinir Minha Senha</a>
              </div>
              
              <div class="warning">
                <h3>⚠️ Informações Importantes:</h3>
                <ul>
                  <li>Este link expira em 1 hora por motivos de segurança</li>
                  <li>Se você não solicitou esta redefinição, ignore este email</li>
                  <li>Sua senha atual permanece inalterada até você criar uma nova</li>
                  <li>Nunca compartilhe este link com outras pessoas</li>
                </ul>
              </div>
              
              <div class="security-note">
                <strong>🔒 Dica de Segurança:</strong> Use uma senha forte com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
              </div>
              
              <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
                Se você não conseguir clicar no botão, copie e cole o link abaixo no seu navegador:<br>
                <span style="word-break: break-all; color: #007bff;">${baseUrl}/reset-password?token=${data.token}</span>
              </p>
            </div>
            <div class="footer">
              <p><strong>UAI Serviços</strong></p>
              <p>Conectando você aos melhores profissionais</p>
              <p style="margin-top: 15px; font-size: 12px;">
                Este é um email automático, não responda.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    
    default:
      return ''
  }
}
