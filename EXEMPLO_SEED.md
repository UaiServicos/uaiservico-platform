# 🔐 Exemplo de Configuração da SEED_SECRET

## 📝 **Passo a Passo Simples:**

### 1. **Escolha uma senha:**
```
SEED_SECRET=teste123
```

### 2. **Configure no Vercel:**
1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em "Settings" > "Environment Variables"
4. Adicione:
   - **Name:** `SEED_SECRET`
   - **Value:** `teste123`
   - **Environment:** Production

### 3. **Execute o seed:**
```bash
# Via curl
curl -X POST https://sua-url.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"teste123"}'
```

### 4. **Resposta esperada:**
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

## 🎯 **URLs de Exemplo:**

Se sua URL do Vercel for:
- `https://uaiservico-platform.vercel.app`

Então o comando seria:
```bash
curl -X POST https://uaiservico-platform.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"teste123"}'
```

## 🔒 **Senhas Mais Seguras (Recomendado):**

```bash
# Opção 1
SEED_SECRET=uaiservico-seed-2024-xyz789

# Opção 2  
SEED_SECRET=populate-database-key-abc123

# Opção 3
SEED_SECRET=seed-secret-uiservico-2024
```

## ⚠️ **Importante:**

- Use a **mesma senha** no Vercel e no comando
- A senha é **case-sensitive** (maiúsculas/minúsculas importam)
- Após popular o banco, você pode **remover** a variável do Vercel por segurança

## 🧪 **Teste Rápido:**

1. **Configure:** `SEED_SECRET=teste123` no Vercel
2. **Execute:** O comando curl acima
3. **Verifique:** Se retornou sucesso
4. **Teste:** Faça login com `joao@email.com` / `123456`
