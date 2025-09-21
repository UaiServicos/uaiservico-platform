# 🛠️ UaiServiço - Plataforma de Prestadores de Serviços

Uma plataforma completa para conectar clientes e prestadores de serviços, desenvolvida com Next.js 14, TypeScript, Prisma e SQLite.

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Cadastro de Cliente**: Formulário completo com dados pessoais e endereço
- **Cadastro de Prestador**: Formulário com informações profissionais e localização
- **Login**: Sistema de autenticação com JWT e cookies seguros
- **Redirecionamento**: Baseado no tipo de usuário (cliente/prestador)

### 👥 Dashboard do Cliente
- **Feed de Serviços**: Visualização de posts dos prestadores
- **Busca de Prestadores**: Filtros por categoria, localização e busca por texto
- **Sistema de Seguir**: Seguir prestadores favoritos
- **Filtro por Seguindo**: Ver apenas posts de prestadores seguidos
- **Avaliações**: Visualização de ratings e número de avaliações

### 🔧 Dashboard do Prestador
- **Criação de Posts**: Compartilhar trabalhos realizados com fotos e descrições
- **Gerenciamento de Perfil**: Editar informações profissionais
- **Feed Pessoal**: Visualizar suas próprias publicações
- **Estatísticas**: Rating, número de trabalhos e seguidores

### 🗄️ Banco de Dados
- **SQLite**: Banco local para desenvolvimento
- **Prisma ORM**: Gerenciamento de dados tipado
- **Schema Completo**: Usuários, perfis, posts, seguir, avaliações, etc.
- **Seed de Dados**: Dados de exemplo para teste

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev --name init

# Popular com dados de exemplo
node scripts/seed.js
```

### 3. Executar Aplicação
```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 👤 Usuários de Teste

### Prestadores
- **Email**: joao@email.com | **Senha**: 123456 (Eletricista)
- **Email**: maria@email.com | **Senha**: 123456 (Limpeza)
- **Email**: carlos@email.com | **Senha**: 123456 (Construção)

### Clientes
- **Email**: ana@cliente.com | **Senha**: 123456
- **Email**: pedro@cliente.com | **Senha**: 123456

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Shadcn/ui** - Componentes de UI
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Sonner** - Notificações toast

## 📱 Funcionalidades por Tela

### Página Inicial (/)
- Hero section com apresentação
- Principais serviços disponíveis
- Profissionais em destaque
- Benefícios da plataforma
- CTAs para cadastro

### Cadastro Cliente (/cadastro-cliente)
- Formulário com dados pessoais
- Informações de endereço
- Validação de senhas
- Redirecionamento após cadastro

### Cadastro Prestador (/cadastro-prestador)
- Dados profissionais
- Descrição de serviços
- Informações de localização
- Dados da empresa (opcional)

### Login (/login)
- Autenticação por email/senha
- Redirecionamento baseado no tipo de usuário
- Links para cadastro

### Dashboard Cliente (/cliente/dashboard)
- Feed de posts dos prestadores
- Busca e filtros avançados
- Lista de prestadores disponíveis
- Sistema de seguir/deixar de seguir
- Filtro por prestadores seguidos

### Dashboard Prestador (/prestador/dashboard)
- Perfil com estatísticas
- Criação de novos posts
- Feed das próprias publicações
- Edição de perfil
- Métricas de engajamento

## 🔄 APIs Implementadas

- `POST /api/auth/register` - Cadastro de usuários
- `POST /api/auth/login` - Login
- `GET /api/posts` - Listar posts (com filtros)
- `POST /api/posts` - Criar novo post
- `GET /api/providers` - Listar prestadores
- `POST /api/follow/[id]` - Seguir/deixar de seguir
- `GET /api/profile` - Buscar perfil do usuário logado

## 🎨 Design System

- **Cores**: Sistema baseado em HSL com suporte a tema escuro
- **Tipografia**: Geist Sans como fonte principal
- **Componentes**: Baseados no Radix UI com Tailwind CSS
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Componentes acessíveis por padrão

## 📋 Próximos Passos

- [ ] Sistema de mensagens entre cliente e prestador
- [ ] Agendamento de serviços
- [ ] Sistema de pagamento
- [ ] Avaliações e comentários
- [ ] Upload de imagens
- [ ] Notificações em tempo real
- [ ] Geolocalização
- [ ] Sistema de favoritos
- [ ] Relatórios para prestadores

## 🐛 Solução de Problemas

### Erro de Prisma Client
```bash
npx prisma generate
```

### Problemas de CSS
```bash
# Limpar cache do Next.js
rm -rf .next
npm run dev
```

### Banco de dados
```bash
# Resetar banco
npx prisma migrate reset
node scripts/seed.js
```