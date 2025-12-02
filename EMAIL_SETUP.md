# 📧 Configuração de Email - UAIServiços Platform

Este documento explica como configurar e testar a funcionalidade de envio de emails na plataforma UAIServiços.

## 🚀 Funcionalidades Implementadas

### ✅ Melhorias Realizadas

1. **Configuração Robusta do Transporter**
   - Validação automática das configurações SMTP
   - Fallback para desenvolvimento quando configurações não estão disponíveis
   - Verificação de conexão SMTP na inicialização

2. **Tratamento de Erros Avançado**
   - Validação de formato de email
   - Logs detalhados de sucesso e erro
   - Retorno estruturado com informações de erro

3. **Templates Responsivos e Modernos**
   - Design responsivo para mobile e desktop
   - Gradientes e animações CSS
   - Templates para boas-vindas e reset de senha

4. **Funções de Teste**
   - Teste de configuração SMTP
   - Envio de email de teste
   - API endpoints para validação

## 📋 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Email Configuration
SMTP_SERVICE="gmail"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-aplicativo"
SMTP_FROM="UAIServiços <seu-email@gmail.com>"

# Application URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 2. Configuração do Gmail

Para usar o Gmail, você precisa criar uma **Senha de Aplicativo**:

1. Acesse: https://myaccount.google.com/security
2. Ative a "Verificação em duas etapas" se não estiver ativa
3. Vá em "Senhas de aplicativo"
4. Selecione "Outro (nome personalizado)"
5. Digite "UAIServiços Platform"
6. Copie a senha gerada e use em `SMTP_PASS`

### 3. Outros Provedores

A plataforma suporta vários provedores de email:

- **Gmail**: `SMTP_SERVICE="gmail"`
- **Outlook**: `SMTP_SERVICE="hotmail"`
- **Yahoo**: `SMTP_SERVICE="yahoo"`
- **iCloud**: `SMTP_SERVICE="icloud"`
- **Zoho**: `SMTP_SERVICE="zoho"`

## 🧪 Testando a Configuração

### 1. Teste de Configuração

```bash
GET /api/test-email?action=test-config
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "✅ Configuração de email verificada com sucesso!\nServiço: gmail\nUsuário: seu-email@gmail.com\nFrom: UAIServiços <seu-email@gmail.com>"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "❌ Erro na configuração de email: Invalid login\n\nVerifique:\n1. Se as variáveis SMTP_USER e SMTP_PASS estão definidas no arquivo .env\n2. Se a senha de aplicativo está correta (para Gmail)\n3. Se o serviço SMTP está correto"
}
```

### 2. Envio de Email de Teste

```bash
GET /api/test-email?action=send-test&email=seu@email.com
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "✅ Email de teste enviado com sucesso para seu@email.com!\nID: <message-id>"
}
```

## 📧 Templates de Email

### Template de Boas-vindas

- Design moderno com gradientes
- Lista de funcionalidades da plataforma
- Botão de call-to-action
- Responsivo para mobile

### Template de Reset de Senha

- Design de segurança com cores vermelhas
- Avisos de segurança destacados
- Link de fallback para cópia manual
- Dicas de segurança para senhas

## 🔧 API de Email

### Função Principal

```typescript
import { sendEmail } from '@/lib/email'

const result = await sendEmail({
  to: 'usuario@email.com',
  subject: 'Assunto do Email',
  html: '<h1>Conteúdo HTML</h1>',
  text: 'Conteúdo em texto' // opcional
})

if (result.success) {
  console.log('Email enviado:', result.messageId)
} else {
  console.error('Erro:', result.error)
}
```

### Funções de Teste

```typescript
import { testEmailConfiguration, sendTestEmail } from '@/lib/email'

// Testar configuração
const configTest = await testEmailConfiguration()

// Enviar email de teste
const testResult = await sendTestEmail('teste@email.com')
```

## 🐛 Solução de Problemas

### Erro: "Invalid login"
- Verifique se está usando senha de aplicativo (Gmail)
- Confirme se as credenciais estão corretas
- Verifique se a verificação em duas etapas está ativa

### Erro: "Connection timeout"
- Verifique sua conexão com a internet
- Confirme se o serviço SMTP está correto
- Teste com outro provedor de email

### Emails não chegam
- Verifique a pasta de spam
- Confirme se o email de destino está correto
- Teste com um email diferente

## 📚 Referências

- [Artigo Medium - Envio de Email com TypeScript](https://medium.com/xp-inc/envio-de-e-mail-com-typescript-e-node-js-435eae69496a)
- [Documentação Nodemailer](https://nodemailer.com/about/)
- [Configuração Gmail SMTP](https://support.google.com/mail/answer/7126229)

## 🎯 Próximos Passos

- [ ] Implementar templates para outros tipos de email
- [ ] Adicionar suporte a anexos
- [ ] Implementar fila de emails para alta demanda
- [ ] Adicionar métricas de entrega
- [ ] Implementar templates personalizáveis
