const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Create service categories
  const categories = [
    { name: 'Elétrica', slug: 'eletrica', description: 'Serviços elétricos residenciais e comerciais', icon: '⚡' },
    { name: 'Limpeza', slug: 'limpeza', description: 'Serviços de limpeza residencial e comercial', icon: '🧹' },
    { name: 'Construção', slug: 'construcao', description: 'Serviços de construção e reforma', icon: '🏗️' },
    { name: 'Encanamento', slug: 'encanamento', description: 'Serviços hidráulicos', icon: '🔧' },
    { name: 'Jardinagem', slug: 'jardinagem', description: 'Cuidados com jardins e plantas', icon: '🌱' },
    { name: 'Pintura', slug: 'pintura', description: 'Serviços de pintura residencial e comercial', icon: '🎨' }
  ]

  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('123456', 10)

  // Create sample providers
  const providers = [
    {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(31) 99999-9999',
      password: hashedPassword,
      userType: 'PROVIDER',
      description: 'Eletricista com 10 anos de experiência em instalações residenciais e comerciais.',
      city: 'Belo Horizonte',
      state: 'MG',
      businessName: 'JS Elétrica',
      document: '123.456.789-00',
      hourlyRate: 80.0,
      rating: 4.8,
      categorySlug: 'eletrica'
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(31) 98888-8888',
      password: hashedPassword,
      userType: 'PROVIDER',
      description: 'Serviços de limpeza residencial e pós-obra com produtos ecológicos.',
      city: 'Contagem',
      state: 'MG',
      businessName: 'Limpeza Perfeita',
      document: '987.654.321-00',
      hourlyRate: 60.0,
      rating: 4.9,
      categorySlug: 'limpeza'
    },
    {
      name: 'Carlos Pereira',
      email: 'carlos@email.com',
      phone: '(31) 97777-7777',
      password: hashedPassword,
      userType: 'PROVIDER',
      description: 'Pedreiro especializado em reformas e acabamentos.',
      city: 'Nova Lima',
      state: 'MG',
      businessName: 'CP Construções',
      document: '456.789.123-00',
      dailyRate: 120.0,
      rating: 4.7,
      categorySlug: 'construcao'
    }
  ]

  const createdProviders = []
  for (const providerData of providers) {
    const user = await prisma.user.create({
      data: {
        name: providerData.name,
        email: providerData.email,
        phone: providerData.phone,
        password: providerData.password,
        userType: providerData.userType,
        providerProfile: {
          create: {
            description: providerData.description,
            city: providerData.city,
            state: providerData.state,
            businessName: providerData.businessName,
            document: providerData.document,
            hourlyRate: providerData.hourlyRate,
            dailyRate: providerData.dailyRate,
            rating: providerData.rating,
            totalReviews: Math.floor(Math.random() * 200) + 50,
            totalJobs: Math.floor(Math.random() * 300) + 100
          }
        }
      },
      include: {
        providerProfile: true
      }
    })
    
    // Create service for provider
    const category = await prisma.serviceCategory.findUnique({
      where: { slug: providerData.categorySlug }
    })
    
    if (category) {
      await prisma.providerService.create({
        data: {
          providerId: user.providerProfile.id,
          categoryId: category.id,
          title: `Serviços de ${category.name}`,
          description: providerData.description,
          price: providerData.hourlyRate || providerData.dailyRate,
          priceType: providerData.hourlyRate ? 'HOURLY' : 'DAILY'
        }
      })
    }
    
    createdProviders.push(user)
  }

  // Create sample clients
  const clients = [
    {
      name: 'Ana Cliente',
      email: 'ana@cliente.com',
      phone: '(31) 91111-1111',
      password: hashedPassword,
      userType: 'CLIENT',
      city: 'Belo Horizonte',
      state: 'MG',
      address: 'Rua das Flores, 123'
    },
    {
      name: 'Pedro Cliente',
      email: 'pedro@cliente.com',
      phone: '(31) 92222-2222',
      password: hashedPassword,
      userType: 'CLIENT',
      city: 'Contagem',
      state: 'MG',
      address: 'Av. Principal, 456'
    }
  ]

  const createdClients = []
  for (const clientData of clients) {
    const user = await prisma.user.create({
      data: {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        password: clientData.password,
        userType: clientData.userType,
        clientProfile: {
          create: {
            city: clientData.city,
            state: clientData.state,
            address: clientData.address
          }
        }
      }
    })
    createdClients.push(user)
  }

  // Create sample posts
  const posts = [
    {
      title: 'Instalação elétrica completa em residência',
      content: 'Trabalho realizado em Belo Horizonte. Instalação de quadro elétrico, tomadas e interruptores. Cliente muito satisfeito!',
      serviceType: 'Elétrica',
      location: 'Belo Horizonte, MG',
      authorId: createdProviders[0].id
    },
    {
      title: 'Limpeza pós-obra em apartamento',
      content: 'Limpeza completa após reforma. Remoção de entulho e limpeza detalhada de todos os ambientes.',
      serviceType: 'Limpeza',
      location: 'Contagem, MG',
      authorId: createdProviders[1].id
    },
    {
      title: 'Reforma de banheiro completa',
      content: 'Reforma completa incluindo troca de azulejos, instalação de box e nova bancada. Trabalho com garantia.',
      serviceType: 'Construção',
      location: 'Nova Lima, MG',
      authorId: createdProviders[2].id
    },
    {
      title: 'Manutenção elétrica preventiva',
      content: 'Revisão completa da instalação elétrica. Identificação e correção de problemas potenciais.',
      serviceType: 'Elétrica',
      location: 'Belo Horizonte, MG',
      authorId: createdProviders[0].id
    }
  ]

  for (const postData of posts) {
    await prisma.post.create({
      data: postData
    })
  }

  // Create some follows (clients following providers)
  for (const client of createdClients) {
    // Each client follows 2 random providers
    const providersToFollow = createdProviders.slice(0, 2)
    for (const provider of providersToFollow) {
      await prisma.follow.create({
        data: {
          followerId: client.id,
          followingId: provider.id
        }
      })
    }
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('👤 Usuários criados:')
  console.log('   Prestadores: joao@email.com, maria@email.com, carlos@email.com')
  console.log('   Clientes: ana@cliente.com, pedro@cliente.com')
  console.log('   Senha padrão: 123456')
  console.log('📝 Posts e relacionamentos criados!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })