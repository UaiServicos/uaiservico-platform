import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

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

  // Create sample users and providers
  const providers = [
    {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(31) 99999-9999',
      password: await bcrypt.hash('123456', 10),
      description: 'Eletricista com 10 anos de experiência em instalações residenciais e comerciais.',
      city: 'Belo Horizonte',
      state: 'MG',
      businessName: 'JS Elétrica',
      document: '123.456.789-00',
      hourlyRate: 80.0,
      rating: 4.8
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(31) 98888-8888',
      password: await bcrypt.hash('123456', 10),
      description: 'Serviços de limpeza residencial e pós-obra com produtos ecológicos.',
      city: 'Contagem',
      state: 'MG',
      businessName: 'Limpeza Perfeita',
      document: '987.654.321-00',
      hourlyRate: 60.0,
      rating: 4.9
    },
    {
      name: 'Carlos Pereira',
      email: 'carlos@email.com',
      phone: '(31) 97777-7777',
      password: await bcrypt.hash('123456', 10),
      description: 'Pedreiro especializado em reformas e acabamentos.',
      city: 'Nova Lima',
      state: 'MG',
      businessName: 'CP Construções',
      document: '456.789.123-00',
      dailyRate: 120.0,
      rating: 4.7
    }
  ]

  for (const providerData of providers) {
    const user = await prisma.user.create({
      data: {
        name: providerData.name,
        email: providerData.email,
        phone: providerData.phone,
        password: providerData.password,
        userType: 'PROVIDER',
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

    // Create some posts for each provider
    const posts = [
      {
        title: `Trabalho de ${providerData.name.split(' ')[0]} - Projeto Residencial`,
        content: `Acabei de finalizar um excelente trabalho em ${providerData.city}. Cliente muito satisfeito com o resultado!`,
        serviceType: providerData.name.includes('João') ? 'Elétrica' : 
                    providerData.name.includes('Maria') ? 'Limpeza' : 'Construção',
        location: `${providerData.city}, ${providerData.state}`,
        images: '[]'
      },
      {
        title: `Mais um projeto concluído por ${providerData.name.split(' ')[0]}`,
        content: `Trabalho realizado com muito capricho e atenção aos detalhes. Garantia de qualidade!`,
        serviceType: providerData.name.includes('João') ? 'Elétrica' : 
                    providerData.name.includes('Maria') ? 'Limpeza' : 'Construção',
        location: `${providerData.city}, ${providerData.state}`,
        images: '[]'
      }
    ]

    for (const postData of posts) {
      await prisma.post.create({
        data: {
          ...postData,
          authorId: user.id
        }
      })
    }
  }

  // Create sample clients
  const clients = [
    {
      name: 'Ana Cliente',
      email: 'ana@cliente.com',
      phone: '(31) 91111-1111',
      password: await bcrypt.hash('123456', 10),
      city: 'Belo Horizonte',
      state: 'MG',
      address: 'Rua das Flores, 123'
    },
    {
      name: 'Pedro Cliente',
      email: 'pedro@cliente.com',
      phone: '(31) 92222-2222',
      password: await bcrypt.hash('123456', 10),
      city: 'Contagem',
      state: 'MG',
      address: 'Av. Principal, 456'
    }
  ]

  for (const clientData of clients) {
    await prisma.user.create({
      data: {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        password: clientData.password,
        userType: 'CLIENT',
        clientProfile: {
          create: {
            city: clientData.city,
            state: clientData.state,
            address: clientData.address
          }
        }
      }
    })
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('👤 Usuários criados:')
  console.log('   Prestadores: joao@email.com, maria@email.com, carlos@email.com')
  console.log('   Clientes: ana@cliente.com, pedro@cliente.com')
  console.log('   Senha padrão: 123456')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })