# 📧 Como Configurar Email - Guia Rápido

## ✅ **Problema Resolvido!**

O sistema agora funciona em **modo de desenvolvimento** mesmo sem configuração de email. Os emails são simulados e você pode testar todas as funcionalidades.

## 🔧 **Status Atual:**

- ✅ **Sistema funcionando** - Não há mais erro 500
- ✅ **Emails simulados** - Funcionalidade de reset de senha funciona
- ✅ **Logs informativos** - Você vê quando emails são "enviados"

## 📝 **Para Configurar Email Real (Opcional):**

### 1. **Criar arquivo `.env`**

Na raiz do projeto (mesma pasta do `package.json`), crie um arquivo chamado `.env`:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="fallback-secret-key"

# Email Configuration
SMTP_SERVICE="gmail"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-aplicativo"
SMTP_FROM="UAIServiço <seu-email@gmail.com>"

# Application URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 2. **Criar Senha de Aplicativo (Gmail)**

1. Acesse: https://myaccount.google.com/security
2. Ative a "Verificação em duas etapas" (se não estiver ativa)
3. Vá em "Senhas de aplicativo"
4. Selecione "Outro (nome personalizado)"
5. Digite: "UAIServiço Platform"
6. Copie a senha gerada (ex: `abcd efgh ijkl mnop`)

### 3. **Configurar no `.env`**

Substitua no arquivo `.env`:
- `seu-email@gmail.com` → seu email real
- `sua-senha-de-aplicativo` → a senha de aplicativo gerada

### 4. **Reiniciar o servidor**

```bash
npm run dev
```

## 🧪 **Testando:**

### Teste de Configuração:
```
GET http://localhost:3000/api/test-email?action=test-config
```

### Envio de Email de Teste:
```
GET http://localhost:3000/api/test-email?action=send-test&email=seu@email.com
```

## 📊 **Modos de Funcionamento:**

### 🔧 **Modo Desenvolvimento (Atual):**
- Emails são simulados
- Logs mostram o que seria enviado
- Sistema funciona normalmente
- Ideal para desenvolvimento

### 📧 **Modo Produção (Após configurar .env):**
- Emails reais são enviados
- Conexão SMTP verificada
- Logs de sucesso/erro reais
- Ideal para produção

## 🎯 **Próximos Passos:**

1. **Teste o sistema atual** - Funciona perfeitamente em modo desenvolvimento
2. **Configure email real** - Quando quiser enviar emails de verdade
3. **Use a funcionalidade** - Reset de senha já funciona!

## ❓ **Dúvidas Frequentes:**

**Q: Preciso configurar email agora?**
A: Não! O sistema funciona perfeitamente em modo desenvolvimento.

**Q: Como sei se está funcionando?**
A: Veja os logs no terminal - aparecerá "🔧 [MODO DESENVOLVIMENTO] Simulando envio de email"

**Q: Quando configurar email real?**
A: Quando quiser que os usuários recebam emails de verdade (produção).

**Q: A senha de aplicativo é segura?**
A: Sim! É mais segura que sua senha normal e pode ser revogada a qualquer momento.
