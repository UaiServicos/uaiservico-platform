"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { sendWhatsAppMessage } from "@/lib/realtime"

interface WhatsAppButtonProps {
  phone: string
  message?: string
  children?: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function WhatsAppButton({
  phone,
  message = "Olá! Vi seu perfil no UaiServiço e gostaria de conversar sobre seus serviços.",
  children,
  variant = "default",
  size = "sm",
  className,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    sendWhatsAppMessage(phone, message)
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      <MessageCircle className="w-4 h-4 mr-1" />
      {children || "WhatsApp"}
    </Button>
  )
}
