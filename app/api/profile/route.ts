import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key") as { userId: string }
    return decoded
  } catch (error) {
    return null
  }
}

// GET /api/profile
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        clientProfile: true,
        providerProfile: {
          include: {
            formations: true
          }
        },
      },
    })

    if (!userData) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// PUT /api/profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { 
      name, 
      description, 
      city, 
      state, 
      phone, 
      serviceCities, 
      serviceAreas,
      experience,
      experienceUnit,
      totalJobs,
      averageJobValue,
      averageJobValueUnit,
      formations
    } = await request.json()


    // Atualiza informações básicas do usuário
    await prisma.user.update({
      where: { id: user.userId },
      data: { name, phone },
    })

    // Verifica se o perfil do prestador existe
    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.userId },
    })

    if (existingProfile) {
      await prisma.providerProfile.update({
        where: { userId: user.userId },
        data: {
          description,
          city,
          state,
          serviceCities: JSON.stringify(serviceCities || []),
          serviceAreas: JSON.stringify(serviceAreas || []),
          experience: experience ? parseInt(experience) : undefined,
          experienceUnit,
          totalJobs: totalJobs ? parseInt(totalJobs) : undefined,
          averageJobValue: averageJobValue ? parseFloat(averageJobValue) : undefined,
          averageJobValueUnit,
        },
      })


      // Gerenciar formações
      if (formations && Array.isArray(formations)) {
        // Deletar formações existentes
        await prisma.formation.deleteMany({
          where: { providerId: existingProfile.id }
        })

        // Criar novas formações
        for (const formation of formations) {
          if (formation.institutionName && formation.area) {
            await prisma.formation.create({
              data: {
                providerId: existingProfile.id,
                institutionName: formation.institutionName,
                area: formation.area,
                certificateUrl: formation.certificateUrl || null,
                startDate: formation.startDate ? new Date(formation.startDate + 'T00:00:00.000Z') : null,
                endDate: formation.endDate ? new Date(formation.endDate + 'T00:00:00.000Z') : null,
              },
            })
          }
        }
      }
    } else {
      const newProfile =       await prisma.providerProfile.create({
        data: {
          userId: user.userId,
          description,
          city,
          state,
          serviceCities: JSON.stringify(serviceCities || []),
          serviceAreas: JSON.stringify(serviceAreas || []),
          experience: experience ? parseInt(experience) : undefined,
          experienceUnit,
          totalJobs: totalJobs ? parseInt(totalJobs) : undefined,
          averageJobValue: averageJobValue ? parseFloat(averageJobValue) : undefined,
          averageJobValueUnit,
        },
      })


      // Gerenciar formações para novo perfil
      if (formations && Array.isArray(formations)) {
        for (const formation of formations) {
          if (formation.institutionName && formation.area) {
            await prisma.formation.create({
              data: {
                providerId: newProfile.id,
                institutionName: formation.institutionName,
                area: formation.area,
                certificateUrl: formation.certificateUrl || null,
                startDate: formation.startDate ? new Date(formation.startDate + 'T00:00:00.000Z') : null,
                endDate: formation.endDate ? new Date(formation.endDate + 'T00:00:00.000Z') : null,
              },
            })
          }
        }
      }
    }

    // Retorna usuário completo atualizado
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { 
        providerProfile: {
          include: {
            formations: true
          }
        }, 
        clientProfile: true 
      },
    })

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Forçar rota dinâmica para evitar erro de build
export const dynamic = 'force-dynamic'
