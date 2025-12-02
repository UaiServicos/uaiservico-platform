"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, Clock, Shield, ArrowLeft, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CadastroPrestadorPage() {
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
    serviceType: "",
    experience: "",
    description: "",
    price: "",
    paymentMethod: "",
    acceptTerms: false
  })
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === 'email' && typeof value === 'string') {
      const emailValue = value as string
      if (emailValue && !emailValue.includes('@')) {
        const domains = ['@gmail.com', '@hotmail.com', '@yahoo.com.br', '@outlook.com', '@uol.com.br', '@bol.com.br', '@terra.com.br', '@ig.com.br']
        setEmailSuggestions(domains.map(domain => emailValue + domain))
      } else {
        setEmailSuggestions([])
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (!formData.acceptTerms) {
      toast.error("Você deve aceitar os termos de uso")
      return
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.password || 
        !formData.city || !formData.state || !formData.serviceType || !formData.paymentMethod) {
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
          userType: 'PROVIDER',
          city: formData.city,
          state: formData.state,
          neighborhood: formData.neighborhood,
          serviceType: formData.serviceType,
          experience: formData.experience,
          description: formData.description,
          price: formData.price,
          paymentMethod: formData.paymentMethod
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
                <span className="text-2xl font-bold text-primary">UaiServiços</span>
              </div>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Cadastre-se como <span className="text-primary">Prestador</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Receba novos clientes todos os dias e faça seu negócio crescer
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Mais Clientes</h3>
                <p className="text-sm text-muted-foreground">
                  Apareça para milhares de pessoas que procuram seus serviços
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Perfil Verificado</h3>
                <p className="text-sm text-muted-foreground">Ganhe credibilidade com nosso selo de verificação</p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Clock className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Gestão Simples</h3>
                <p className="text-sm text-muted-foreground">Dashboard intuitivo para gerenciar seus serviços</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Preencha seus dados para criar seu perfil profissional</CardDescription>
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
                        list="email-suggestions"
                        required
                      />
                      <datalist id="email-suggestions">
                        {emailSuggestions.map((suggestion, index) => (
                          <option key={index} value={suggestion} />
                        ))}
                      </datalist>
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
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade *</Label>
                        <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione sua cidade" />
                          </SelectTrigger>
                          <SelectContent>
                          <SelectItem value="barbacena">Barbacena</SelectItem>
                            <SelectItem value="bom-sucesso">Bom Sucesso</SelectItem>
                            <SelectItem value="campo-belo">Campo Belo</SelectItem>
                            <SelectItem value="conceicao-da-barra-de-minas">Conceição da Barra de Minas</SelectItem>
                            <SelectItem value="congonhas">Congonhas</SelectItem>
                            <SelectItem value="conselheiro-lafaiete">Conselheiro Lafaiete</SelectItem>
                            <SelectItem value="coronel-xavier-chaves">Coronel Xavier Chaves</SelectItem>
                            <SelectItem value="divinopolis">Divinópolis</SelectItem>
                            <SelectItem value="itabirito">Itabirito</SelectItem>
                            <SelectItem value="lavras">Lavras</SelectItem>
                            <SelectItem value="lagoa-dourada">Lagoa Dourada</SelectItem>
                            <SelectItem value="pocos-de-caldas">Poços de Caldas</SelectItem>
                            <SelectItem value="prados">Prados</SelectItem>
                            <SelectItem value="resende-costa">Resende Costa</SelectItem>
                            <SelectItem value="ritapolis">Ritápolis</SelectItem>
                            <SelectItem value="santa-cruz-de-minas">Santa Cruz de Minas</SelectItem>
                            <SelectItem value="sao-joao-del-rei">São João del Rei</SelectItem>
                            <SelectItem value="tiradentes">Tiradentes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servicos">Serviços que Oferece *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu principal serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eletrica">Elétrica</SelectItem>
                          <SelectItem value="encanamento">Encanamento</SelectItem>
                          <SelectItem value="construcao">Construção</SelectItem>
                          <SelectItem value="jardinagem">Jardinagem</SelectItem>
                          <SelectItem value="limpeza">Limpeza</SelectItem>
                          <SelectItem value="reformas">Reformas</SelectItem>
                          <SelectItem value="pintura">Pintura</SelectItem>
                          <SelectItem value="montagem-de-moveis">Montagem de Móveis</SelectItem>
                          <SelectItem value="ar-condicionado">Ar Condicionado</SelectItem>
                          <SelectItem value="eletrodomesticos">Eletrodomésticos</SelectItem>
                          <SelectItem value="seguranca-eletronica">Segurança Eletrônica</SelectItem>
                          <SelectItem value="pisos-e-revestimentos">Pisos e Revestimentos</SelectItem>
                          <SelectItem value="gesso-e-drywall">Gesso e Drywall</SelectItem>
                          <SelectItem value="telhados">Telhados</SelectItem>
                          <SelectItem value="impermeabilizacao">Impermeabilização</SelectItem>
                          <SelectItem value="vidracaria">Vidraçaria</SelectItem>
                          <SelectItem value="serralheria">Serralheria</SelectItem>
                          <SelectItem value="marcenaria">Marcenaria</SelectItem>
                          <SelectItem value="desentupimento">Desentupimento</SelectItem>
                          <SelectItem value="dedetizacao">Dedetização</SelectItem>
                          <SelectItem value="pequenos-reparos">Pequenos Reparos</SelectItem>
                          <SelectItem value="chaveiro">Chaveiro</SelectItem>
                          <SelectItem value="mudancas-e-carretos">Mudanças e Carretos</SelectItem>
                          <SelectItem value="fretes">Fretes</SelectItem>
                          <SelectItem value="diarista">Diarista</SelectItem>
                          <SelectItem value="passadeira">Passadeira</SelectItem>
                          <SelectItem value="cozinheira">Cozinheira</SelectItem>
                          <SelectItem value="baba">Babá</SelectItem>
                          <SelectItem value="cuidador-de-idosos">Cuidador de Idosos</SelectItem>
                          <SelectItem value="aulas-particulares">Aulas Particulares</SelectItem>
                          <SelectItem value="informatica">Informática</SelectItem>
                          <SelectItem value="design-grafico">Design Gráfico</SelectItem>
                          <SelectItem value="marketing-digital">Marketing Digital</SelectItem>
                          <SelectItem value="fotografia">Fotografia</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                          <SelectItem value="eventos">Eventos</SelectItem>
                          <SelectItem value="buffet">Buffet</SelectItem>
                          <SelectItem value="garcom">Garçom</SelectItem>
                          <SelectItem value="seguranca">Segurança</SelectItem>
                          <SelectItem value="motorista">Motorista</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                          <SelectItem value="contabilidade">Contabilidade</SelectItem>
                          <SelectItem value="juridico">Jurídico</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="beleza">Beleza</SelectItem>
                          <SelectItem value="estetica">Estética</SelectItem>
                          <SelectItem value="massagem">Massagem</SelectItem>
                          <SelectItem value="personal-trainer">Personal Trainer</SelectItem>
                          <SelectItem value="pet-sitter">Pet Sitter</SelectItem>
                          <SelectItem value="adestramento">Adestramento</SelectItem>
                          <SelectItem value="veterinario">Veterinário</SelectItem>
                          <SelectItem value="costura">Costura</SelectItem>
                          <SelectItem value="bordado">Bordado</SelectItem>
                          <SelectItem value="artesanato">Artesanato</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experiencia">Anos de Experiência</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua experiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 anos</SelectItem>
                          <SelectItem value="3-5">3-5 anos</SelectItem>
                          <SelectItem value="6-10">6-10 anos</SelectItem>
                          <SelectItem value="10+">Mais de 10 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição do seu Trabalho</Label>
                      <Textarea
                        id="descricao"
                        placeholder="Conte um pouco sobre sua experiência, especialidades e diferenciais..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preco">Preço Médio dos Seus Serviços</Label>
                      <Input 
                        id="preco" 
                        placeholder="Ex: R$ 100/dia ou R$ 50/hora" 
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>

                    {/* Forma de Pagamento */}
                    <div className="space-y-2">
                      <Label htmlFor="pagamento">Forma de Pagamento *</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === 'pix' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => handleInputChange('paymentMethod', 'pix')}
                        >
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-6 h-6 text-primary" />
                            <div>
                              <p className="font-medium">PIX</p>
                              <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                            </div>
                          </div>
                        </div>
                        <div 
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === 'cartao' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => handleInputChange('paymentMethod', 'cartao')}
                        >
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <div>
                              <p className="font-medium">Cartão</p>
                              <p className="text-sm text-muted-foreground">Crédito ou débito</p>
                            </div>
                          </div>
                        </div>
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
                        <Link href="/termos-uso" className="text-primary hover:underline">
                          termos de uso
                        </Link>{" "}
                        e
                        <Link href="/politica-privacidade" className="text-primary hover:underline">
                          {" "}
                          política de privacidade
                        </Link>
                      </Label>
                    </div>

                    <Button size="lg" className="w-full" type="submit" disabled={loading}>
                      {loading ? "Criando conta..." : "Criar Minha Conta - Grátis por 3 meses"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-6">
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary">Plano Básico</CardTitle>
                    <Badge variant="secondary">Mais Popular</Badge>
                  </div>
                  <CardDescription>
                    <span className="text-3xl font-bold text-primary">R$ 29,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Perfil na plataforma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Receber contatos de clientes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Sistema de avaliações</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Dashboard básico</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plano Premium</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">R$ 59,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Tudo do plano básico</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Destaque nos resultados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Selo "Premium"</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Relatórios avançados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Suporte prioritário</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-card/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">3 meses grátis</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Teste nossa plataforma sem compromisso. Cancele quando quiser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
