# 🧪 Dados de Teste - UAIServiço Platform

Este documento lista todos os dados de exemplo criados no banco de dados para facilitar os testes.

## 👥 **Usuários Criados**

### 🔧 **Prestadores de Serviço**

| Nome | Email | Senha | Cidade | Serviço | Avaliação |
|------|-------|-------|--------|---------|-----------|
| **João Silva** | joao@email.com | 123456 | Belo Horizonte, MG | Elétrica | 4.8 ⭐ |
| **Maria Santos** | maria@email.com | 123456 | Contagem, MG | Limpeza | 4.9 ⭐ |
| **Carlos Pereira** | carlos@email.com | 123456 | Nova Lima, MG | Construção | 4.7 ⭐ |

### 👤 **Clientes**

| Nome | Email | Senha | Cidade |
|------|-------|-------|--------|
| **Ana Costa** | ana@cliente.com | 123456 | Belo Horizonte, MG |
| **Pedro Oliveira** | pedro@cliente.com | 123456 | Contagem, MG |

## 🏷️ **Categorias de Serviços**

| Categoria | Slug | Descrição | Ícone |
|-----------|------|-----------|-------|
| **Elétrica** | eletrica | Serviços elétricos residenciais e comerciais | ⚡ |
| **Limpeza** | limpeza | Serviços de limpeza residencial e comercial | 🧹 |
| **Construção** | construcao | Serviços de construção e reforma | 🏗️ |
| **Encanamento** | encanamento | Serviços hidráulicos | 🔧 |
| **Jardinagem** | jardinagem | Cuidados com jardins e plantas | 🌱 |
| **Pintura** | pintura | Serviços de pintura residencial e comercial | 🎨 |

## 📝 **Posts de Exemplo**

Cada prestador tem posts criados automaticamente com:
- Títulos relacionados aos seus serviços
- Conteúdo descritivo
- Localização
- Imagens (placeholder)

## 🔐 **Credenciais de Acesso**

### **Para Testar como Prestador:**
```
Email: joao@email.com
Senha: 123456
Tipo: Eletricista
```

```
Email: maria@email.com
Senha: 123456
Tipo: Limpeza
```

```
Email: carlos@email.com
Senha: 123456
Tipo: Construção
```

### **Para Testar como Cliente:**
```
Email: ana@cliente.com
Senha: 123456
```

```
Email: pedro@cliente.com
Senha: 123456
```

## 🧪 **Como Usar os Dados de Teste**

### 1. **Testar Login:**
- Acesse `/login`
- Use qualquer um dos emails acima
- Senha: `123456`

### 2. **Testar Dashboard de Prestador:**
- Faça login como prestador
- Acesse `/prestador/dashboard`
- Veja estatísticas, posts, etc.

### 3. **Testar Dashboard de Cliente:**
- Faça login como cliente
- Acesse `/cliente/dashboard`
- Veja prestadores disponíveis

### 4. **Testar Busca de Serviços:**
- Acesse `/buscar-servicos`
- Filtre por categoria ou cidade
- Veja os prestadores disponíveis

### 5. **Testar Perfil Público:**
- Acesse `/prestador/[id]`
- Substitua `[id]` pelo ID do prestador
- Veja o perfil público

## 🔄 **Recriar Dados de Teste**

Se precisar recriar os dados:

```bash
# Resetar banco (CUIDADO: apaga todos os dados!)
npx prisma migrate reset

# Ou apenas executar o seed novamente
npm run db:seed
```

## 📊 **Visualizar Dados**

Para ver todos os dados no banco:

```bash
# Abrir Prisma Studio
npm run db:studio
```

## 🎯 **Funcionalidades Testáveis**

Com esses dados você pode testar:

- ✅ **Login/Logout** - Todos os tipos de usuário
- ✅ **Dashboard** - Prestadores e clientes
- ✅ **Busca de Serviços** - Filtros e resultados
- ✅ **Perfis Públicos** - Visualização de prestadores
- ✅ **Posts** - Criação e visualização
- ✅ **Avaliações** - Sistema de reviews
- ✅ **Contatos** - WhatsApp e outros
- ✅ **Email** - Reset de senha, boas-vindas

## 🚀 **Próximos Passos**

1. **Teste todas as funcionalidades** usando os dados acima
2. **Crie novos usuários** através do cadastro
3. **Adicione mais dados** conforme necessário
4. **Teste em produção** após deploy

---

**💡 Dica:** Use o Prisma Studio (`npm run db:studio`) para visualizar e editar os dados diretamente no banco!
