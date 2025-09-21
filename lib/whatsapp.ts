export interface WhatsAppMessage {
  to: string
  message: string
  type?: "text" | "image" | "document"
}

export class WhatsAppService {
  private apiUrl: string
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiUrl = process.env.WHATSAPP_API_URL || "https://api.whatsapp.com/send"
    this.apiKey = apiKey || process.env.WHATSAPP_API_KEY || ""
  }

  // Generate WhatsApp link for direct messaging
  generateWhatsAppLink(phoneNumber: string, message?: string): string {
    const cleanPhone = phoneNumber.replace(/\D/g, "")
    const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`

    const encodedMessage = message ? encodeURIComponent(message) : ""
    return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`
  }

  // Send message via WhatsApp Business API (if configured)
  async sendMessage(message: WhatsAppMessage): Promise<boolean> {
    if (!this.apiKey) {
      console.warn("WhatsApp API key not configured")
      return false
    }

    try {
      const response = await fetch(`${this.apiUrl}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: message.to,
          type: message.type || "text",
          text: { body: message.message },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Error sending WhatsApp message:", error)
      return false
    }
  }

  // Format phone number for Brazil
  formatBrazilianPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "")

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }

    return phone
  }
}

export const whatsappService = new WhatsAppService()
