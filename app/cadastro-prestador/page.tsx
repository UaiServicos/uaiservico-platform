import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, Clock, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CadastroPrestadorPage() {
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
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input id="nome" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                      <Input id="telefone" placeholder="(31) 99999-9999" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua cidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                          <SelectItem value="contagem">Contagem</SelectItem>
                          <SelectItem value="betim">Betim</SelectItem>
                          <SelectItem value="nova-lima">Nova Lima</SelectItem>
                          <SelectItem value="ribeirao-das-neves">Ribeirão das Neves</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input id="bairro" placeholder="Seu bairro" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servicos">Serviços que Oferece *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu principal serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pedreiro">Pedreiro</SelectItem>
                        <SelectItem value="encanador">Encanador</SelectItem>
                        <SelectItem value="eletricista">Eletricista</SelectItem>
                        <SelectItem value="diarista">Diarista</SelectItem>
                        <SelectItem value="pintor">Pintor</SelectItem>
                        <SelectItem value="jardineiro">Jardineiro</SelectItem>
                        <SelectItem value="marceneiro">Marceneiro</SelectItem>
                        <SelectItem value="mecanico">Mecânico</SelectItem>
                        <SelectItem value="costureira">Costureira</SelectItem>
                        <SelectItem value="cozinheira">Cozinheira</SelectItem>
                        <SelectItem value="baba">Babá</SelectItem>
                        <SelectItem value="pet-sitter">Pet Sitter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experiencia">Anos de Experiência</Label>
                    <Select>
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço Médio dos Seus Serviços</Label>
                    <Input id="preco" placeholder="Ex: R$ 100/dia ou R$ 50/hora" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="termos" />
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

                  <Button size="lg" className="w-full">
                    Criar Minha Conta - Grátis por 30 dias
                  </Button>
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
                  <span className="font-semibold">30 dias grátis</span>
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
