# 🐘 Configuração PostgreSQL - UAIServiços Platform

Este documento explica como configurar o PostgreSQL para a plataforma UAIServiços.

## 🚀 **Configuração Rápida**

### 1. **Desenvolvimento Local**

#### Instalar PostgreSQL:
```bash
# Windows (usando Chocolatey)
choco install postgresql

# macOS (usando Homebrew)
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
```

#### Criar Banco de Dados:
```sql
-- Conectar ao PostgreSQL
psql -U postgres

-- Criar banco de dados
CREATE DATABASE uaiservico_db;

-- Criar usuário (opcional)
CREATE USER uaiservico_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE uaiservico_db TO uaiservico_user;
```

#### Configurar .env:
```env
DATABASE_URL="postgresql://uaiservico_user:sua_senha_segura@localhost:5432/uaiservico_db"
```

### 2. **Produção (Vercel)**

#### Opções de Hosting:

**Neon (Recomendado):**
1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a connection string
5. Configure no Vercel

**Supabase:**
1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Vá em Settings > Database
4. Copie a connection string
5. Configure no Vercel

**Railway:**
1. Acesse: https://railway.app
2. Crie um novo projeto
3. Adicione PostgreSQL
4. Copie a connection string
5. Configure no Vercel

## 🔧 **Comandos Úteis**

### Migração e Setup:
```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrações (desenvolvimento)
npm run db:migrate

# Executar migrações (produção)
npm run db:deploy

# Abrir Prisma Studio
npm run db:studio

# Popular banco com dados de teste
npm run db:seed
```

### Verificar Conexão:
```bash
# Testar conexão
npx prisma db pull

# Ver status do banco
npx prisma migrate status
```

## 📊 **Estrutura do Banco**

O banco PostgreSQL terá as seguintes tabelas principais:

- **users** - Usuários do sistema
- **client_profiles** - Perfis de clientes
- **provider_profiles** - Perfis de prestadores
- **service_categories** - Categorias de serviços
- **provider_services** - Serviços dos prestadores
- **reviews** - Avaliações
- **posts** - Posts dos usuários
- **formations** - Formações dos prestadores
- **contacts** - Contatos realizados

## 🔒 **Segurança**

### Variáveis de Ambiente:
```env
# Desenvolvimento
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# Produção (usar variáveis do Vercel)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Boas Práticas:
- ✅ Use SSL em produção (`?sslmode=require`)
- ✅ Use senhas fortes
- ✅ Limite acesso por IP quando possível
- ✅ Faça backups regulares
- ✅ Monitore conexões

## 🚨 **Solução de Problemas**

### Erro de Conexão:
```bash
# Verificar se PostgreSQL está rodando
pg_ctl status

# Verificar logs
tail -f /var/log/postgresql/postgresql-*.log
```

### Erro de Permissão:
```sql
-- Conceder permissões
GRANT ALL PRIVILEGES ON DATABASE uaiservico_db TO seu_usuario;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO seu_usuario;
```

### Reset do Banco:
```bash
# CUIDADO: Isso apaga todos os dados!
npx prisma migrate reset
```

## 📈 **Performance**

### Índices Recomendados:
```sql
-- Índices para melhor performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_providers_city ON provider_profiles(city);
CREATE INDEX idx_services_category ON provider_services(category_id);
CREATE INDEX idx_reviews_provider ON reviews(provider_id);
```

### Monitoramento:
- Use `npx prisma studio` para visualizar dados
- Monitore queries lentas no PostgreSQL
- Configure connection pooling se necessário

## 🎯 **Próximos Passos**

1. **Configure o banco local** seguindo as instruções acima
2. **Execute as migrações**: `npm run db:migrate`
3. **Teste a conexão**: `npm run db:studio`
4. **Configure para produção** usando um serviço de hosting
5. **Deploy no Vercel** com as variáveis de ambiente corretas

## 📚 **Recursos Úteis**

- [Documentação Prisma](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Neon Database](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Railway PostgreSQL](https://docs.railway.app/databases/postgresql)
