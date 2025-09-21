import { type NextRequest, NextResponse } from "next/server"
import { whatsappService } from "@/lib/whatsapp"

export async function POST(request: NextRequest) {
  try {
    const { to, message, providerName, serviceName } = await request.json()

    if (!to || !message) {
      return NextResponse.json({ error: "Phone number and message are required" }, { status: 400 })
    }

    // Generate WhatsApp link
    const whatsappLink = whatsappService.generateWhatsAppLink(to, message)

    // Optionally send via Business API if configured
    const sent = await whatsappService.sendMessage({ to, message })

    return NextResponse.json({
      success: true,
      whatsappLink,
      messageSent: sent,
      data: {
        to: whatsappService.formatBrazilianPhone(to),
        message,
        providerName,
        serviceName,
      },
    })
  } catch (error) {
    console.error("WhatsApp API error:", error)
    return NextResponse.json({ error: "Failed to process WhatsApp request" }, { status: 500 })
  }
}

// Webhook for receiving WhatsApp messages
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  // Verify webhook (WhatsApp Business API)
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}
