import { useEffect } from 'react'

/**
 * Hook para enviar heartbeat de atividade do usuário
 * Envia requisição a cada 2 minutos para manter o usuário "online"
 */
export function useActivity() {
  useEffect(() => {
    const sendActivity = async () => {
      try {
        await fetch('/api/activity', {
          method: 'POST',
          credentials: 'include'
        })
      } catch (error) {
        // Silenciar erros de atividade
        console.debug('Activity heartbeat failed:', error)
      }
    }

    // Enviar atividade imediatamente
    sendActivity()

    // Configurar intervalo para enviar a cada 2 minutos
    const interval = setInterval(sendActivity, 2 * 60 * 1000)

    // Cleanup
    return () => clearInterval(interval)
  }, [])
}
