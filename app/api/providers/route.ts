import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const category = searchParams.get('category')
    const serviceArea = searchParams.get('serviceArea')
    
    let whereClause: any = {}
    
    // Filter by service cities (JSON field)
    if (city && city !== 'todas') {
      whereClause.OR = [
        { city: { contains: city } },
        { serviceCities: { contains: city } }
      ]
    }
    
    // Filter by service areas (JSON field)
    if (serviceArea && serviceArea !== 'all') {
      whereClause.serviceAreas = { contains: serviceArea }
    }
    
    const providers = await prisma.providerProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true
          }
        },
        services: {
          include: {
            category: true
          }
        },
        _count: {
          select: {
            receivedReviews: true
          }
        }
      },
      orderBy: { rating: 'desc' },
      take: 50
    })

    return NextResponse.json({ providers })
  } catch (error) {
    console.error('Get providers error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}