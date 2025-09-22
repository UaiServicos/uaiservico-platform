const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de dados de teste...')

  // Criar categorias de serviço
  const categories = [
    { name: 'Elétrica', slug: 'eletrica', icon: '⚡', active: true },
    { name: 'Encanamento', slug: 'encanamento', icon: '🔧', active: true },
    { name: 'Construção', slug: 'construcao', icon: '🏗️', active: true },
    { name: 'Limpeza', slug: 'limpeza', icon: '🧹', active: true },
    { name: 'Jardinagem', slug: 'jardinagem', icon: '🌱', active: true },
    { name: 'Pintura', slug: 'pintura', icon: '🎨', active: true },
    { name: 'Marcenaria', slug: 'marcenaria', icon: '🔨', active: true },
    { name: 'Mecânica', slug: 'mecanica', icon: '🔧', active: true },
    { name: 'Costura', slug: 'costura', icon: '✂️', active: true },
    { name: 'Culinária', slug: 'culinaria', icon: '👨‍🍳', active: true },
    { name: 'Cuidados Infantis', slug: 'cuidados-infantis', icon: '👶', active: true },
    { name: 'Cuidados com Pets', slug: 'cuidados-pets', icon: '🐕', active: true },
    { name: 'Informática', slug: 'informatica', icon: '💻', active: true },
    { name: 'Refrigeração', slug: 'refrigeracao', icon: '❄️', active: true },
    { name: 'Solda', slug: 'solda', icon: '🔥', active: true },
    { name: 'Paisagismo', slug: 'paisagismo', icon: '🌿', active: true },
    { name: 'Segurança', slug: 'seguranca', icon: '🛡️', active: true },
    { name: 'Frete', slug: 'frete', icon: '🚚', active: true },
    { name: 'Mudanças', slug: 'mudancas', icon: '📦', active: true },
    { name: 'Chaveiro', slug: 'chaveiro', icon: '🗝️', active: true },
    { name: 'Estética', slug: 'estetica', icon: '💄', active: true },
    { name: 'Massagem', slug: 'massagem', icon: '💆', active: true },
    { name: 'Saúde', slug: 'saude', icon: '🏥', active: true },
    { name: 'Educação', slug: 'educacao', icon: '📚', active: true }
  ]

  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  console.log('✅ Categorias criadas')

  // Criar usuários de teste
  const hashedPassword = await bcrypt.hash('123456', 10)

  const users = [
    {
      email: 'joao@teste.com',
      name: 'João Silva',
      phone: '(31) 99999-0001',
      userType: 'PROVIDER',
      avatar: '/placeholder-user.jpg'
    },
    {
      email: 'maria@teste.com',
      name: 'Maria Santos',
      phone: '(31) 99999-0002',
      userType: 'PROVIDER',
      avatar: '/placeholder-user.jpg'
    },
    {
      email: 'pedro@teste.com',
      name: 'Pedro Costa',
      phone: '(31) 99999-0003',
      userType: 'PROVIDER',
      avatar: '/placeholder-user.jpg'
    },
    {
      email: 'ana@teste.com',
      name: 'Ana Oliveira',
      phone: '(31) 99999-0004',
      userType: 'PROVIDER',
      avatar: '/placeholder-user.jpg'
    },
    {
      email: 'carlos@teste.com',
      name: 'Carlos Ferreira',
      phone: '(31) 99999-0005',
      userType: 'PROVIDER',
      avatar: '/placeholder-user.jpg'
    }
  ]

  const createdUsers = []
  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: hashedPassword
      }
    })
    createdUsers.push(created)
  }

  console.log('✅ Usuários criados')

  // Criar perfis de prestadores
  const providerProfiles = [
    {
      userId: createdUsers[0].id,
      city: 'Belo Horizonte',
      state: 'MG',
      description: 'Eletricista experiente com mais de 10 anos de experiência. Especializado em instalações residenciais e comerciais.',
      hourlyRate: 45.00,
      dailyRate: 300.00,
      rating: 4.8,
      responseTime: 30,
      verified: true,
      active: true,
      serviceCities: JSON.stringify(['Belo Horizonte', 'Contagem', 'Betim']),
      serviceAreas: JSON.stringify(['Elétrica', 'Instalação', 'Manutenção'])
    },
    {
      userId: createdUsers[1].id,
      city: 'Contagem',
      state: 'MG',
      description: 'Encanadora profissional com foco em qualidade e pontualidade. Atendo emergências 24h.',
      hourlyRate: 40.00,
      dailyRate: 280.00,
      rating: 4.9,
      responseTime: 45,
      verified: true,
      active: true,
      serviceCities: JSON.stringify(['Contagem', 'Belo Horizonte', 'Betim']),
      serviceAreas: JSON.stringify(['Encanamento', 'Desentupimento', 'Instalação'])
    },
    {
      userId: createdUsers[2].id,
      city: 'Belo Horizonte',
      state: 'MG',
      description: 'Pedreiro especializado em reformas e construções. Trabalho com materiais de qualidade.',
      hourlyRate: 50.00,
      dailyRate: 350.00,
      rating: 4.7,
      responseTime: 60,
      verified: true,
      active: true,
      serviceCities: JSON.stringify(['Belo Horizonte', 'Nova Lima', 'Sabará']),
      serviceAreas: JSON.stringify(['Construção', 'Reforma', 'Alvenaria'])
    },
    {
      userId: createdUsers[3].id,
      city: 'Betim',
      state: 'MG',
      description: 'Limpeza residencial e comercial. Equipe treinada e produtos de qualidade.',
      hourlyRate: 25.00,
      dailyRate: 180.00,
      rating: 4.6,
      responseTime: 20,
      verified: false,
      active: true,
      serviceCities: JSON.stringify(['Betim', 'Contagem', 'Belo Horizonte']),
      serviceAreas: JSON.stringify(['Limpeza', 'Organização', 'Conservação'])
    },
    {
      userId: createdUsers[4].id,
      city: 'Belo Horizonte',
      state: 'MG',
      description: 'Jardinista e paisagista. Criação e manutenção de jardins e áreas verdes.',
      hourlyRate: 35.00,
      dailyRate: 250.00,
      rating: 4.5,
      responseTime: 40,
      verified: true,
      active: true,
      serviceCities: JSON.stringify(['Belo Horizonte', 'Nova Lima', 'Sabará']),
      serviceAreas: JSON.stringify(['Jardinagem', 'Paisagismo', 'Manutenção'])
    }
  ]

  for (const profile of providerProfiles) {
    await prisma.providerProfile.upsert({
      where: { userId: profile.userId },
      update: {},
      create: profile
    })
  }

  console.log('✅ Perfis de prestadores criados')

  // Criar serviços para os prestadores
  const services = [
    {
      providerId: createdUsers[0].id,
      categoryId: (await prisma.serviceCategory.findFirst({ where: { name: 'Elétrica' } })).id,
      title: 'Instalação Elétrica Residencial',
      description: 'Instalação completa de sistemas elétricos em residências',
      price: 45.00,
      active: true
    },
    {
      providerId: createdUsers[1].id,
      categoryId: (await prisma.serviceCategory.findFirst({ where: { name: 'Encanamento' } })).id,
      title: 'Desentupimento de Esgoto',
      description: 'Serviço de desentupimento com equipamentos modernos',
      price: 40.00,
      active: true
    },
    {
      providerId: createdUsers[2].id,
      categoryId: (await prisma.serviceCategory.findFirst({ where: { name: 'Construção' } })).id,
      title: 'Construção de Muros',
      description: 'Construção de muros de alvenaria e concreto',
      price: 50.00,
      active: true
    },
    {
      providerId: createdUsers[3].id,
      categoryId: (await prisma.serviceCategory.findFirst({ where: { name: 'Limpeza' } })).id,
      title: 'Limpeza Residencial',
      description: 'Limpeza completa de residências',
      price: 25.00,
      active: true
    },
    {
      providerId: createdUsers[4].id,
      categoryId: (await prisma.serviceCategory.findFirst({ where: { name: 'Jardinagem' } })).id,
      title: 'Manutenção de Jardins',
      description: 'Corte de grama, poda de plantas e manutenção geral',
      price: 35.00,
      active: true
    }
  ]

  for (const service of services) {
    await prisma.providerService.create({
      data: service
    })
  }

  console.log('✅ Serviços criados')

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
