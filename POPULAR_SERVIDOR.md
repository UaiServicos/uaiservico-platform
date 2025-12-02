# 🚀 Como Popular o Servidor com Dados de Teste

Este guia explica como subir os dados de exemplo para o servidor de produção.

## 🎯 **Método 1: Via API Endpoint (Recomendado)**

### 1. **Configure a variável de ambiente no Vercel:**
```bash
SEED_SECRET=seed-secret-key
```

### 2. **Execute o seed via API:**
```bash
# Usando curl
curl -X POST https://sua-url.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"seed-secret-key"}'

# Ou usando o script
npm run db:seed:production
```

### 3. **Configure a URL de produção:**
```bash
# No seu .env local
PRODUCTION_URL=https://sua-url.vercel.app
SEED_SECRET=seed-secret-key
```

## 🎯 **Método 2: Via Script Local**

### 1. **Execute o script de produção:**
```bash
# Configure as variáveis
export PRODUCTION_URL=https://sua-url.vercel.app
export SEED_SECRET=seed-secret-key

# Execute o seed
npm run db:seed:production
```

## 🎯 **Método 3: Via Vercel CLI**

### 1. **Instale o Vercel CLI:**
```bash
npm install -g vercel
```

### 2. **Execute o seed diretamente:**
```bash
# Faça login no Vercel
vercel login

# Execute o comando no servidor
vercel env pull
vercel --prod
```

## 🔧 **Configuração no Vercel**

### 1. **Acesse o Dashboard do Vercel:**
- Vá para seu projeto
- Clique em "Settings"
- Vá em "Environment Variables"

### 2. **Adicione as variáveis:**
```
SEED_SECRET = seed-secret-key
DATABASE_URL = sua-connection-string-postgresql
SMTP_USER = seu-email@gmail.com
SMTP_PASS = sua-senha-de-aplicativo
SMTP_SERVICE = gmail
SMTP_FROM = UAIServiços <seu-email@gmail.com>
JWT_SECRET = sua-chave-secreta
NEXT_PUBLIC_BASE_URL = https://sua-url.vercel.app
```

### 3. **Redeploy o projeto:**
- Vá em "Deployments"
- Clique em "Redeploy" na última versão

## 🧪 **Testando o Seed**

### 1. **Verifique se funcionou:**
```bash
# Teste a API de seed
curl -X POST https://sua-url.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"seed-secret-key"}'
```

### 2. **Resposta esperada:**
```json
{
  "success": true,
  "message": "✅ Seed concluído com sucesso!",
  "users": {
    "providers": ["joao@email.com", "maria@email.com", "carlos@email.com"],
    "clients": ["ana@cliente.com", "pedro@cliente.com"],
    "password": "123456"
  }
}
```

### 3. **Teste o login:**
- Acesse: `https://sua-url.vercel.app/login`
- Use: `joao@email.com` / `123456`
- Deve funcionar perfeitamente!

## 🔒 **Segurança**

### ⚠️ **Importante:**
- O endpoint `/api/seed` só funciona com a chave secreta correta
- Em produção, sempre use uma chave secreta forte
- Remova ou desative o endpoint após popular o banco

### 🛡️ **Para Desativar o Endpoint:**
```typescript
// Em app/api/seed/route.ts
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Endpoint desativado' }, { status: 403 })
}
```

## 🚨 **Solução de Problemas**

### Erro 401 (Unauthorized):
```bash
# Verifique se a SEED_SECRET está configurada corretamente
# No Vercel: Settings > Environment Variables
```

### Erro 500 (Internal Server Error):
```bash
# Verifique se o DATABASE_URL está configurado
# Verifique os logs no Vercel Dashboard
```

### Dados não aparecem:
```bash
# Execute o seed novamente
# Verifique se não há usuários duplicados
# O script verifica se já existem antes de criar
```

## 📊 **Verificar Dados Criados**

### 1. **Via API (se tiver endpoint de listagem):**
```bash
curl https://sua-url.vercel.app/api/providers
```

### 2. **Via Login:**
- Teste fazer login com os usuários criados
- Verifique se aparecem no dashboard

### 3. **Via Prisma Studio (se configurado):**
```bash
# Se tiver acesso ao banco
npx prisma studio
```

## 🎯 **Dados Criados**

Após executar o seed, você terá:

- ✅ **6 Categorias de Serviços**
- ✅ **3 Prestadores** (joao@email.com, maria@email.com, carlos@email.com)
- ✅ **2 Clientes** (ana@cliente.com, pedro@cliente.com)
- ✅ **Posts de Exemplo**
- ✅ **Senha padrão:** 123456

## 🚀 **Próximos Passos**

1. **Execute o seed** usando um dos métodos acima
2. **Teste o login** com os usuários criados
3. **Verifique as funcionalidades** no servidor
4. **Desative o endpoint** por segurança (opcional)

---

**💡 Dica:** Use o Método 1 (API Endpoint) para popular o servidor de forma segura e controlada!
