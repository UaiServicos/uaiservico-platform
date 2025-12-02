import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendEmail, generateEmailTemplate } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, userType, ...profileData } = await request.json()

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        userType,
        ...(userType === 'CLIENT' && {
          clientProfile: {
            create: {
              address: profileData.address,
              city: profileData.city,
              state: profileData.state,
              zipCode: profileData.zipCode
            }
          }
        }),
        ...(userType === 'PROVIDER' && {
          providerProfile: {
            create: {
              description: profileData.description,
              city: profileData.city,
              state: profileData.state,
              address: profileData.neighborhood,
              experience: profileData.experience ? parseInt(profileData.experience.split('-')[0]) : null,
              hourlyRate: profileData.price ? parseFloat(profileData.price.replace(/[^\d.,]/g, '').replace(',', '.')) : null,
              dailyRate: profileData.price ? parseFloat(profileData.price.replace(/[^\d.,]/g, '').replace(',', '.')) : null
            }
          }
        })
      },
      include: {
        clientProfile: true,
        providerProfile: true
      }
    })

    // Se for prestador, criar o serviço principal
    if (userType === 'PROVIDER' && profileData.serviceType) {
      // Buscar ou criar categoria de serviço
      let category = await prisma.serviceCategory.findFirst({
        where: { name: profileData.serviceType }
      })

      if (!category) {
        category = await prisma.serviceCategory.create({
          data: {
            name: profileData.serviceType,
            slug: profileData.serviceType.toLowerCase().replace(/\s+/g, '-'),
            description: `Categoria de ${profileData.serviceType}`
          }
        })
      }

      // Criar serviço do prestador
      if (user.providerProfile) {
        await prisma.providerService.create({
          data: {
            providerId: user.providerProfile.id,
            categoryId: category.id,
            title: profileData.serviceType,
            description: profileData.description || `Serviços de ${profileData.serviceType}`,
            price: profileData.price ? parseFloat(profileData.price.replace(/[^\d.,]/g, '').replace(',', '.')) : null,
            active: true
          }
        })
      }
    }

    // Enviar email de boas-vindas
    try {
      const emailHtml = generateEmailTemplate('welcome', {
        name: user.name
      })

      const emailResult = await sendEmail({
        to: user.email,
        subject: 'Bem-vindo ao UAIServiços!',
        html: emailHtml
      })

      if (!emailResult.success) {
        console.error('Erro ao enviar email de boas-vindas:', emailResult.error)
        // Não falhar o registro se o email não for enviado
      }
    } catch (emailError) {
      console.error('Erro ao enviar email de boas-vindas:', emailError)
      // Não falhar o registro se o email não for enviado
    }

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}