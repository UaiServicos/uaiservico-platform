import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Verificar se é ambiente de produção
    if (process.env.NODE_ENV === 'production') {
      // Em produção, verificar se há uma chave secreta
      const { secret } = await request.json()
      if (secret !== process.env.SEED_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

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
      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: providerData.email }
      })

      if (!existingUser) {
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
            title: `Novo projeto de ${providerData.name}`,
            content: `Acabei de finalizar um projeto incrível! ${providerData.description}`,
            serviceType: providerData.businessName,
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
    }

    // Create sample clients
    const clients = [
      {
        name: 'Ana Costa',
        email: 'ana@cliente.com',
        phone: '(31) 96666-6666',
        password: await bcrypt.hash('123456', 10),
        city: 'Belo Horizonte',
        state: 'MG',
        address: 'Rua das Flores, 123'
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro@cliente.com',
        phone: '(31) 95555-5555',
        password: await bcrypt.hash('123456', 10),
        city: 'Contagem',
        state: 'MG',
        address: 'Av. Principal, 456'
      }
    ]

    for (const clientData of clients) {
      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: clientData.email }
      })

      if (!existingUser) {
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
    }

    console.log('✅ Seed concluído com sucesso!')
    
    return NextResponse.json({ 
      success: true,
      message: '✅ Seed concluído com sucesso!',
      users: {
        providers: ['joao@email.com', 'maria@email.com', 'carlos@email.com'],
        clients: ['ana@cliente.com', 'pedro@cliente.com'],
        password: '123456'
      }
    })

  } catch (error) {
    console.error('❌ Erro no seed:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

// Forçar rota dinâmica
export const dynamic = 'force-dynamic'
