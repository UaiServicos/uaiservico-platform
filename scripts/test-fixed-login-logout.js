const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Simular a função getOnlineStatus corrigida
function getOnlineStatus(lastActivity, lastLogin, lastLogout) {
  if (!lastActivity && !lastLogin) {
    return {
      isOnline: false,
      statusText: 'Nunca logado',
      lastSeen: null
    }
  }

  const now = new Date()
  
  // Se há logout recente (últimos 5 minutos), considera offline
  if (lastLogout) {
    const logoutDiffInMinutes = Math.floor((now.getTime() - lastLogout.getTime()) / (1000 * 60))
    if (logoutDiffInMinutes <= 5 && logoutDiffInMinutes >= 0) {
      const timeOffline = getTimeOffline(logoutDiffInMinutes)
      return {
        isOnline: false,
        statusText: `Deslogado há ${timeOffline}`,
        lastSeen: lastLogout
      }
    }
  }
  
  // Se não há lastActivity, usa lastLogin como fallback
  const referenceDate = lastActivity || lastLogin
  const diffInMinutes = Math.floor((now.getTime() - referenceDate.getTime()) / (1000 * 60))
  
  // Considera online se teve atividade nas últimas 5 minutos
  if (diffInMinutes <= 5) {
    return {
      isOnline: true,
      statusText: 'Online agora',
      lastSeen: referenceDate
    }
  }

  // Calcula tempo offline
  const timeOffline = getTimeOffline(diffInMinutes)
  
  return {
    isOnline: false,
    statusText: `Ausente há ${timeOffline}`,
    lastSeen: referenceDate
  }
}

function getTimeOffline(minutes) {
  if (minutes <= 0) {
    return 'agora'
  }
  
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}h`
  }
  
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} dia${days > 1 ? 's' : ''}`
  }
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks} semana${weeks > 1 ? 's' : ''}`
  }
  
  const months = Math.floor(days / 30)
  return `${months} mês${months > 1 ? 'es' : ''}`
}

async function main() {
  console.log('🧪 Testando correções de login/logout...')

  try {
    // Buscar um usuário para testar
    const user = await prisma.user.findFirst({
      where: { userType: 'PROVIDER' }
    })

    if (!user) {
      console.log('❌ Nenhum usuário prestador encontrado')
      return
    }

    console.log(`\n👤 Usuário: ${user.name}`)
    console.log(`📅 Estado atual:`)
    console.log(`   - lastLogin: ${user.lastLogin || 'Nunca logado'}`)
    console.log(`   - lastActivity: ${user.lastActivity || 'Nunca ativo'}`)
    console.log(`   - lastLogout: ${user.lastLogout || 'Nunca deslogado'}`)

    // Estado inicial
    let status = getOnlineStatus(user.lastActivity, user.lastLogin, user.lastLogout)
    console.log(`📊 Status inicial: ${status.isOnline ? '🟢' : '🔴'} ${status.statusText}`)

    // Simular logout
    console.log('\n🚪 Simulando logout...')
    const logoutTime = new Date()
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogout: logoutTime }
    })

    status = getOnlineStatus(user.lastActivity, user.lastLogin, logoutTime)
    console.log(`✅ Após logout: ${status.isOnline ? '🟢' : '🔴'} ${status.statusText}`)

    // Simular login (deve limpar lastLogout)
    console.log('\n🔐 Simulando login...')
    const loginTime = new Date()
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        lastLogin: loginTime,
        lastActivity: loginTime,
        lastLogout: null // Limpar logout anterior
      }
    })

    status = getOnlineStatus(loginTime, loginTime, null)
    console.log(`✅ Após login: ${status.isOnline ? '🟢' : '🔴'} ${status.statusText}`)

    // Verificar se lastLogout foi limpo
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { lastLogin: true, lastActivity: true, lastLogout: true }
    })

    console.log(`\n📅 Estado após login:`)
    console.log(`   - lastLogin: ${updatedUser.lastLogin?.toLocaleString('pt-BR')}`)
    console.log(`   - lastActivity: ${updatedUser.lastActivity?.toLocaleString('pt-BR')}`)
    console.log(`   - lastLogout: ${updatedUser.lastLogout || 'Limpo ✅'}`)

    // Testar diferentes tempos de logout
    console.log('\n🧪 Testando diferentes tempos de logout:')
    
    const now = new Date()
    const testCases = [
      { name: 'Logout agora', logoutTime: new Date(now.getTime() - 0 * 60 * 1000) },
      { name: 'Logout há 1 min', logoutTime: new Date(now.getTime() - 1 * 60 * 1000) },
      { name: 'Logout há 3 min', logoutTime: new Date(now.getTime() - 3 * 60 * 1000) },
      { name: 'Logout há 5 min', logoutTime: new Date(now.getTime() - 5 * 60 * 1000) },
      { name: 'Logout há 10 min', logoutTime: new Date(now.getTime() - 10 * 60 * 1000) }
    ]

    testCases.forEach(testCase => {
      const status = getOnlineStatus(loginTime, loginTime, testCase.logoutTime)
      console.log(`   - ${testCase.name}: ${status.isOnline ? '🟢' : '🔴'} ${status.statusText}`)
    })

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
