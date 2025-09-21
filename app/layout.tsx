import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "UaiServiço - Conectando você aos melhores profissionais da sua região",
  description:
    "Encontre prestadores de serviços confiáveis perto de você. Pedreiros, encanadores, eletricistas, diaristas e muito mais.",
  generator: "UaiServiço",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
