"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Lock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
// import { toast } from "sonner"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setError('Token de redefinição não encontrado')
      return
    }
    setToken(tokenParam)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // toast.success("Senha redefinida com sucesso!")
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.error || 'Erro ao redefinir senha')
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Senha Redefinida!
            </CardTitle>
            <CardDescription>
              Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Redefinir Senha</h1>
          <p className="mt-2 text-sm text-gray-600">
            Digite sua nova senha abaixo
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Nova Senha
            </CardTitle>
            <CardDescription>
              Crie uma nova senha segura para sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua nova senha"
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua nova senha"
                  required
                  minLength={6}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !token}
              >
                {loading ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                Lembrou da senha? Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
