'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const getRedirectMessage = () => {
    switch (redirect) {
      case 'contact':
        return 'Para entrar em contato com um prestador, você precisa fazer login ou criar uma conta.'
      case 'save':
        return 'Para salvar prestadores favoritos, você precisa fazer login ou criar uma conta.'
      case 'rate':
        return 'Para avaliar um prestador, você precisa fazer login ou criar uma conta.'
      default:
        return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Login realizado com sucesso!')
        login(data.user)
        
        // Redirect based on user type
        setTimeout(() => {
          if (data.user.userType === 'CLIENT') {
            window.location.href = '/dashboard'
          } else if (data.user.userType === 'PROVIDER') {
            window.location.href = '/prestador/dashboard'
          } else {
            window.location.href = '/dashboard'
          }
        }, 500)
      } else {
        toast.error(data.error || 'Erro ao fazer login')
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold text-primary">UaiServiço</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Redirect Message */}
          {getRedirectMessage() && (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <p className="text-sm text-orange-800">{getRedirectMessage()}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
              <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Sua senha" 
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Esqueci minha senha
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>

              <Separator />

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Não tem uma conta ainda?</p>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild>
                    <Link href="/cadastro-cliente">Cadastrar como Cliente</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/cadastro-prestador">Cadastrar como Prestador</Link>
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Button variant="ghost" asChild>
                  <Link href="/" className="text-sm">
                    Continuar sem login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}