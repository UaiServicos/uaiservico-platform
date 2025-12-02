import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOnlineStatus } from '@/lib/online-status'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const category = searchParams.get('category')
    const serviceArea = searchParams.get('serviceArea')
    
    // Buscar apenas providers ativos
    const allProviders = await prisma.providerProfile.findMany({
      where: {
        active: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            lastLogin: true,
            lastActivity: true,
            lastLogout: true
          }
        },
        services: {
          include: {
            category: true
          }
        },
        formations: true,
        _count: {
          select: {
            receivedReviews: true
          }
        }
      },
      orderBy: { rating: 'desc' },
      take: 100
    })

    // Filtrar no JavaScript para melhor controle dos campos JSON
    let filteredProviders = allProviders

    if (city && city !== 'todas') {
      filteredProviders = filteredProviders.filter(provider => {
        // Verificar cidade base
        if (provider.city && provider.city.toLowerCase().includes(city.toLowerCase())) {
          return true
        }
        
        // Verificar cidades de serviço (JSON)
        try {
          const serviceCities = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
          if (Array.isArray(serviceCities)) {
            return serviceCities.some((cityName: string) => 
              cityName.toLowerCase().includes(city.toLowerCase())
            )
          }
        } catch (e) {
          // Ignorar erro de parse
        }
        
        return false
      })
    }

    if (serviceArea && serviceArea !== 'all') {
      filteredProviders = filteredProviders.filter(provider => {
        try {
          const serviceAreas = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
          if (Array.isArray(serviceAreas)) {
            return serviceAreas.some((area: string) => 
              area.toLowerCase().includes(serviceArea.toLowerCase())
            )
          }
        } catch (e) {
          // Ignorar erro de parse
        }
        
        return false
      })
    }

    // Limitar resultados e adicionar status online
    const providers = filteredProviders.slice(0, 50).map(provider => {
      const onlineStatus = getOnlineStatus(provider.user.lastActivity, provider.user.lastLogin, provider.user.lastLogout)
      return {
        ...provider,
        onlineStatus: onlineStatus.statusText,
        isOnline: onlineStatus.isOnline
      }
    })

    return NextResponse.json({ providers })
  } catch (error) {
    console.error('Get providers error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// Forçar rota dinâmica para evitar erro de build
export const dynamic = 'force-dynamic'