/**
 * Calcula o status online/offline e tempo offline de um usuário
 */

export interface OnlineStatus {
  isOnline: boolean
  statusText: string
  lastSeen?: Date
}

/**
 * Determina se um usuário está online baseado no lastActivity e lastLogout
 * Considera online se teve atividade nas últimas 5 minutos e não fez logout recente
 */
export function getOnlineStatus(lastActivity: Date | null, lastLogin: Date | null, lastLogout: Date | null): OnlineStatus {
  if (!lastActivity && !lastLogin) {
    return {
      isOnline: false,
      statusText: 'Nunca logado'
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
  const diffInMinutes = Math.floor((now.getTime() - referenceDate!.getTime()) / (1000 * 60))
  
  // Considera online se teve atividade nas últimas 5 minutos
  if (diffInMinutes <= 5) {
    return {
      isOnline: true,
      statusText: 'Online agora',
    }
  }

  // Calcula tempo offline
  const timeOffline = getTimeOffline(diffInMinutes)
  
  return {
    isOnline: false,
    statusText: `Ausente há ${timeOffline}`,
  }
}

/**
 * Converte minutos em texto legível
 */
function getTimeOffline(minutes: number): string {
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

/**
 * Formata a data de último acesso para exibição
 */
export function formatLastSeen(lastSeen: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) {
    return 'Agora mesmo'
  }
  
  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} min`
  }
  
  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) {
    return `Há ${hours}h`
  }
  
  const days = Math.floor(hours / 24)
  if (days === 1) {
    return 'Ontem'
  }
  
  if (days < 7) {
    return `Há ${days} dias`
  }
  
  return lastSeen.toLocaleDateString('pt-BR')
}
