export interface Notification {
  id: string
  userId: string
  type: "contact" | "follow" | "review" | "message" | "system"
  title: string
  message: string
  read: boolean
  createdAt: Date
  data?: any
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: "text" | "image" | "file"
  read: boolean
  createdAt: Date
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  updatedAt: Date
}

// Mock data storage - replace with real database
const notifications: Notification[] = [
  {
    id: "1",
    userId: "provider1",
    type: "contact",
    title: "Novo contato",
    message: "Maria Oliveira está interessada no seu serviço",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    data: { clientId: "client1", service: "Reforma do banheiro" },
  },
  {
    id: "2",
    userId: "provider1",
    type: "follow",
    title: "Novo seguidor",
    message: "Carlos Santos começou a seguir você",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    data: { followerId: "client2" },
  },
]

const messages: Message[] = []
const conversations: Conversation[] = []

// Notification functions
export function getNotifications(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getUnreadNotificationCount(userId: string): number {
  return notifications.filter((n) => n.userId === userId && !n.read).length
}

export function markNotificationAsRead(notificationId: string): void {
  const notification = notifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
}

export function markAllNotificationsAsRead(userId: string): void {
  notifications.forEach((n) => {
    if (n.userId === userId) {
      n.read = true
    }
  })
}

export function createNotification(notification: Omit<Notification, "id" | "createdAt">): Notification {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  notifications.unshift(newNotification)
  return newNotification
}

// Message functions
export function getConversations(userId: string): Conversation[] {
  return conversations
    .filter((c) => c.participants.includes(userId))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

export function getMessages(conversationId: string): Message[] {
  return messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export function sendMessage(
  senderId: string,
  receiverId: string,
  content: string,
  type: "text" | "image" | "file" = "text",
): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find or create conversation
      let conversation = conversations.find(
        (c) => c.participants.includes(senderId) && c.participants.includes(receiverId),
      )

      if (!conversation) {
        conversation = {
          id: Date.now().toString(),
          participants: [senderId, receiverId],
          updatedAt: new Date(),
        }
        conversations.push(conversation)
      }

      const message: Message = {
        id: Date.now().toString(),
        conversationId: conversation.id,
        senderId,
        receiverId,
        content,
        type,
        read: false,
        createdAt: new Date(),
      }

      messages.push(message)
      conversation.lastMessage = message
      conversation.updatedAt = new Date()

      // Create notification for receiver
      createNotification({
        userId: receiverId,
        type: "message",
        title: "Nova mensagem",
        message: `Você recebeu uma nova mensagem`,
        read: false,
        data: { senderId, conversationId: conversation.id },
      })

      resolve(message)
    }, 500)
  })
}

// Real-time simulation functions
export function simulateRealTimeUpdates(userId: string, callback: (notification: Notification) => void) {
  // Simulate receiving notifications every 30 seconds
  const interval = setInterval(() => {
    if (Math.random() > 0.7) {
      // 30% chance of new notification
      const types = ["contact", "follow", "review", "message"] as const
      const type = types[Math.floor(Math.random() * types.length)]

      const notification = createNotification({
        userId,
        type,
        title: getNotificationTitle(type),
        message: getNotificationMessage(type),
        read: false,
        data: {},
      })

      callback(notification)
    }
  }, 30000)

  return () => clearInterval(interval)
}

function getNotificationTitle(type: string): string {
  switch (type) {
    case "contact":
      return "Novo contato"
    case "follow":
      return "Novo seguidor"
    case "review":
      return "Nova avaliação"
    case "message":
      return "Nova mensagem"
    default:
      return "Notificação"
  }
}

function getNotificationMessage(type: string): string {
  switch (type) {
    case "contact":
      return "Um cliente está interessado no seu serviço"
    case "follow":
      return "Alguém começou a seguir você"
    case "review":
      return "Você recebeu uma nova avaliação"
    case "message":
      return "Você tem uma nova mensagem"
    default:
      return "Você tem uma nova notificação"
  }
}

// WhatsApp integration
export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "")
  const encodedMessage = message ? encodeURIComponent(message) : ""
  return `https://wa.me/55${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`
}

export function sendWhatsAppMessage(phone: string, message: string): void {
  const link = generateWhatsAppLink(phone, message)
  window.open(link, "_blank")
}
