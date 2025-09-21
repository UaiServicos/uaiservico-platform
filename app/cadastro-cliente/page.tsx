"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, Shield, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CadastroClientePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    neighborhood: "",
    acceptTerms: false,
    acceptNewsletter: false
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.city || !formData.state) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (!formData.acceptTerms) {
      toast.error("Você deve aceitar os termos de uso")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType: 'CLIENT',
          city: formData.city,
          state: formData.state,
          neighborhood: formData.neighborhood,
          acceptNewsletter: formData.acceptNewsletter
        }),
      })

      if (response.ok) {
        toast.success("Conta criada com sucesso! Faça login para continuar.")
        router.push('/login')
      } else {
        const error = await response.json()
        toast.error(error.error || "Erro ao criar conta")
      }
    } catch (error) {
      console.error('Error creating account:', error)
      toast.error("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiço</span>
              </div>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Cadastre-se como <span className="text-primary">Cliente</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encontre os melhores prestadores de serviços da sua região
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6">
                <Search className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Busca Fácil</h3>
                <p className="text-sm text-muted-foreground">Encontre prestadores por categoria e localização</p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Perfis Verificados</h3>
                <p className="text-sm text-muted-foreground">Todos os prestadores são verificados e avaliados</p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Totalmente Gratuito</h3>
                <p className="text-sm text-muted-foreground">Use nossa plataforma sem pagar nada</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta de Cliente</CardTitle>
              <CardDescription>Preencha seus dados para começar a usar nossa plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input 
                      id="nome" 
                      placeholder="Seu nome completo" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                    <Input 
                      id="telefone" 
                      placeholder="(31) 99999-9999" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha *</Label>
                    <Input 
                      id="senha" 
                      type="password" 
                      placeholder="Mínimo 6 caracteres" 
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar Senha *</Label>
                    <Input 
                      id="confirmar-senha" 
                      type="password" 
                      placeholder="Confirme sua senha" 
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="GO">Goiás</SelectItem>
                        <SelectItem value="DF">Distrito Federal</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input 
                      id="cidade" 
                      placeholder="Sua cidade" 
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input 
                      id="bairro" 
                      placeholder="Seu bairro" 
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="termos" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  />
                  <Label htmlFor="termos" className="text-sm">
                    Aceito os{" "}
                    <Link href="#" className="text-primary hover:underline">
                      termos de uso
                    </Link>{" "}
                    e
                    <Link href="#" className="text-primary hover:underline">
                      {" "}
                      política de privacidade
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={formData.acceptNewsletter}
                    onCheckedChange={(checked) => handleInputChange('acceptNewsletter', checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Quero receber ofertas e novidades por e-mail
                  </Label>
                </div>

                <Button size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? "Criando conta..." : "Criar Minha Conta Gratuita"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Faça login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
