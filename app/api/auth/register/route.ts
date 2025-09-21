import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

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
              address: profileData.address,
              zipCode: profileData.zipCode,
              businessName: profileData.businessName,
              document: profileData.document
            }
          }
        })
      },
      include: {
        clientProfile: true,
        providerProfile: true
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}