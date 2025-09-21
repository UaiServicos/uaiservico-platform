import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Contar total de prestadores
    const totalProviders = await prisma.providerProfile.count({
      where: { active: true }
    })

    // Buscar prestadores em destaque (melhores avaliados)
    const featuredProviders = await prisma.providerProfile.findMany({
      where: { 
        active: true,
        rating: { gte: 4.0 }
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        },
        services: {
          include: {
            category: true
          },
          take: 3
        },
        formations: true,
        _count: {
          select: {
            receivedReviews: true
          }
        }
      },
      orderBy: { rating: 'desc' },
      take: 3
    })

    // Contar prestadores por categoria de serviço
    const providersByCategory = await prisma.providerService.groupBy({
      by: ['categoryId'],
      _count: {
        providerId: true
      },
      where: {
        active: true,
        provider: {
          active: true
        }
      }
    }).catch(() => [])

    // Buscar categorias para mapear os IDs
    const categories = await prisma.serviceCategory.findMany({
      select: {
        id: true,
        name: true,
        icon: true
      }
    })

    // Mapear contadores com nomes das categorias
    const categoryStats = providersByCategory.map(stat => {
      const category = categories.find(cat => cat.id === stat.categoryId)
      return {
        name: category?.name || 'Outros',
        icon: category?.icon || '🔧',
        count: stat._count.providerId
      }
    }).sort((a, b) => b.count - a.count).slice(0, 12)

    // Formatar prestadores em destaque
    const formattedProviders = featuredProviders.map(provider => {
      const mainService = provider.services[0]?.category?.name || 'Serviços Gerais'
      const serviceAreas = provider.services.slice(1, 4).map(s => s.category.name)
      
      return {
        id: provider.id,
        name: provider.user.name,
        service: mainService,
        rating: provider.rating || 0,
        reviews: provider._count.receivedReviews,
        location: provider.city,
        areas: serviceAreas,
        price: provider.hourlyRate ? `A partir de R$ ${provider.hourlyRate}/hora` : 
               provider.dailyRate ? `A partir de R$ ${provider.dailyRate}/dia` : 'Consulte',
        image: provider.user.avatar || '/placeholder.svg',
        verified: provider.verified,
        responseTime: provider.responseTime ? `${provider.responseTime}min` : '2h',
        experience: provider.experience ? `${provider.experience} ${provider.experienceUnit === 'years' ? 'anos' : 'meses'}` : null,
        totalJobs: provider.totalJobs || 0,
        averageJobValue: provider.averageJobValue,
        averageJobValueUnit: provider.averageJobValueUnit,
        formations: provider.formations.map(f => ({
          institution: f.institutionName,
          area: f.area
        }))
      }
    })

    return NextResponse.json({
      totalProviders,
      featuredProviders: formattedProviders,
      categoryStats
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
