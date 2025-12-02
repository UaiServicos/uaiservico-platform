"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, MapPin, Phone, MessageCircle, Shield, Users, Clock, CheckCircle, Briefcase, GraduationCap, DollarSign } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface StatsData {
  totalProviders: number
  featuredProviders: Array<{
    id: string
    name: string
    service: string
    rating: number
    reviews: number
    location: string
    areas: string[]
    price: string
    image: string
    verified: boolean
    onlineStatus: string
    isOnline: boolean
    experience?: string
    totalJobs?: number
    averageJobValue?: string
    averageJobValueUnit?: string
    formations?: Array<{
      institution: string
      area: string
    }>
  }>
  categoryStats: Array<{
    name: string
    icon: string
    count: number
  }>
}

export default function HomePage() {
  const router = useRouter()
  const [searchService, setSearchService] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error('Erro na resposta da API:', response.status)
          // Definir dados padrão em caso de erro
          setStats({
            totalProviders: 0,
            featuredProviders: [],
            categoryStats: []
          })
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error)
        // Definir dados padrão em caso de erro
        setStats({
          totalProviders: 0,
          featuredProviders: [],
          categoryStats: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchService) params.append('service', searchService)
    if (searchCity && searchCity !== 'todas') params.append('city', searchCity)
    
    const queryString = params.toString()
    router.push(`/dashboard-publico${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold text-primary">UaiServiços</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#servicos" className="text-muted-foreground hover:text-foreground transition-colors">
                Serviços
              </Link>
              <Link href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
                Como Funciona
              </Link>
              <Link href="#prestadores" className="text-muted-foreground hover:text-foreground transition-colors">
                Para Prestadores
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro-prestador">Seja um Prestador</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Encontre os <span className="text-primary">melhores profissionais</span> da sua região
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Conectamos você com prestadores de serviços confiáveis e avaliados. Rápido, seguro e sem complicação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              asChild
            >
              <Link href="/dashboard-publico">Ver Prestadores Disponíveis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Fazer Login</Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-3 p-2 bg-background rounded-xl shadow-xl border-2 border-primary/10">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Que serviço você precisa? (ex: pedreiro, encanador...)"
                  className="pl-10 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger className="pl-10 border-0 focus-visible:ring-2 focus-visible:ring-primary">
                    <SelectValue placeholder="Sua cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="araxa">Araxá</SelectItem>
                    <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                    <SelectItem value="betim">Betim</SelectItem>
                    <SelectItem value="caete">Caeté</SelectItem>
                    <SelectItem value="congonhas">Congonhas</SelectItem>
                    <SelectItem value="contagem">Contagem</SelectItem>
                    <SelectItem value="diamantina">Diamantina</SelectItem>
                    <SelectItem value="divinopolis">Divinópolis</SelectItem>
                    <SelectItem value="formiga">Formiga</SelectItem>
                    <SelectItem value="frutal">Frutal</SelectItem>
                    <SelectItem value="governador-valadares">Governador Valadares</SelectItem>
                    <SelectItem value="ibirite">Ibirité</SelectItem>
                    <SelectItem value="ipatinga">Ipatinga</SelectItem>
                    <SelectItem value="itabira">Itabira</SelectItem>
                    <SelectItem value="itauna">Itaúna</SelectItem>
                    <SelectItem value="ituiutaba">Ituiutaba</SelectItem>
                    <SelectItem value="juiz-de-fora">Juiz de Fora</SelectItem>
                    <SelectItem value="lagoa-da-prata">Lagoa da Prata</SelectItem>
                    <SelectItem value="lagoa-santa">Lagoa Santa</SelectItem>
                    <SelectItem value="mariana">Mariana</SelectItem>
                    <SelectItem value="montes-claros">Montes Claros</SelectItem>
                    <SelectItem value="nova-lima">Nova Lima</SelectItem>
                    <SelectItem value="ouro-preto">Ouro Preto</SelectItem>
                    <SelectItem value="passos">Passos</SelectItem>
                    <SelectItem value="patos-de-minas">Patos de Minas</SelectItem>
                    <SelectItem value="pocos-de-caldas">Poços de Caldas</SelectItem>
                    <SelectItem value="pouso-alegre">Pouso Alegre</SelectItem>
                    <SelectItem value="ribeirao-das-neves">Resende Costa</SelectItem>
                    <SelectItem value="ribeirao-das-neves">Ribeirão das Neves</SelectItem>
                    <SelectItem value="sabara">Sabará</SelectItem>
                    <SelectItem value="santa-barbara">Santa Bárbara</SelectItem>
                    <SelectItem value="santa-luzia">Santa Luzia</SelectItem>
                    <SelectItem value="sao-joao-del-rei">São João del Rei</SelectItem>
                    <SelectItem value="sete-lagoas">Sete Lagoas</SelectItem>
                    <SelectItem value="teofilo-otoni">Teófilo Otoni</SelectItem>
                    <SelectItem value="tiradentes">Tiradentes</SelectItem>
                    <SelectItem value="uberaba">Uberaba</SelectItem>
                    <SelectItem value="uberlandia">Uberlândia</SelectItem>
                    <SelectItem value="vespasiano">Vespasiano</SelectItem>
                    <SelectItem value="vicosa">Viçosa</SelectItem>
                  </SelectContent>

                </Select>
              </div>
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Profissionais Verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>
                {loading ? 'Carregando...' : `+${stats?.totalProviders || 0} Prestadores`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span>Avaliações Reais</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section id="servicos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Principais Serviços</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Elétrica", icon: "⚡", description: "Instalações e reparos elétricos" },
              { name: "Encanamento", icon: "🔧", description: "Reparos e instalações hidráulicas" },
              { name: "Construção", icon: "🔨", description: "Obras e reformas gerais" },
              { name: "Limpeza", icon: "🧹", description: "Serviços de limpeza doméstica" },
              { name: "Jardinagem", icon: "🌱", description: "Cuidados com jardins e plantas" },
              { name: "Pintura", icon: "🎨", description: "Pintura residencial e comercial" },
              { name: "Marcenaria", icon: "🪚", description: "Móveis e trabalhos em madeira" },
              { name: "Mecânica", icon: "🔩", description: "Reparos automotivos" },
              { name: "Costura", icon: "✂️", description: "Serviços de costura e reformas" },
              { name: "Culinária", icon: "👩‍🍳", description: "Serviços culinários" },
              { name: "Cuidados Infantis", icon: "👶", description: "Babás e cuidadores" },
              { name: "Cuidados com Pets", icon: "🐕", description: "Pet sitters e veterinários" },
            ].map((service) => (
              <Card key={service.name} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Profissionais em Destaque</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : stats?.featuredProviders.length ? (
              stats.featuredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                        <AvatarFallback>
                          {provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{provider.name}</h3>
                          {provider.verified && <CheckCircle className="w-4 h-4 text-primary" />}
                        </div>
                        <Badge variant="secondary" className="mb-2">
                          {provider.service}
                        </Badge>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground text-sm">({provider.reviews} avaliações)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.location}</span>
                        </div>
                        {provider.areas && provider.areas.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {provider.areas.slice(0, 2).map((area: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                            {provider.areas.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{provider.areas.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <div className={`w-2 h-2 rounded-full ${provider.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span>{provider.onlineStatus}</span>
                        </div>
                        
                        {/* Novos campos */}
                        {provider.experience && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{provider.experience}</span>
                          </div>
                        )}
                        
                        {provider.totalJobs && provider.totalJobs > 0 && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4" />
                            <span>{provider.totalJobs} trabalhos realizados</span>
                          </div>
                        )}
                        
                        {provider.formations && provider.formations.length > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <GraduationCap className="w-4 h-4" />
                              <span>Formações:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {provider.formations.slice(0, 2).map((formation, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {formation.area}
                                </Badge>
                              ))}
                              {provider.formations.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{provider.formations.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">
                        {provider.averageJobValue ? 
                          `R$ ${provider.averageJobValue}/${provider.averageJobValueUnit === 'hour' ? 'hora' : 'dia'}` : 
                          'Consulte preço'
                        }
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/prestador/${provider.id}`}>
                            <Phone className="w-4 h-4 mr-1" />
                            Ver Perfil
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/prestador/${provider.id}`}>
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contatar
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Nenhum profissional em destaque encontrado.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard-publico">Ver Todos os Profissionais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Busque o Serviço</h3>
              <p className="text-muted-foreground">
                Digite o serviço que precisa e sua localização. Nossa plataforma mostra os melhores profissionais da sua
                região.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Compare e Escolha</h3>
              <p className="text-muted-foreground">
                Veja perfis, avaliações, preços e tempo de resposta. Escolha o profissional que melhor atende suas
                necessidades.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Entre em Contato</h3>
              <p className="text-muted-foreground">
                Converse diretamente com o prestador via WhatsApp ou telefone. Negocie preços e agende o serviço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Providers CTA */}
      <section id="prestadores" className="py-16 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Você é um Prestador de Serviços?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Cadastre-se na UaiServiços e receba novos clientes todos os dias. Planos a partir de R$ 29,90/mês.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Mais Clientes</h3>
              <p className="text-sm text-white/80">Apareça para milhares de pessoas que procuram seus serviços</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Perfil Verificado</h3>
              <p className="text-sm text-white/80">Ganhe credibilidade com nosso selo de verificação</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Gestão Simples</h3>
              <p className="text-sm text-white/80">Dashboard intuitivo para gerenciar seus serviços</p>
            </div>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            asChild
          >
            <Link href="/cadastro-prestador">Cadastrar Agora - Grátis por 3 meses</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-xl font-bold text-primary">UaiServiços</span>
              </div>
              <p className="text-muted-foreground text-sm">Conectando você aos melhores profissionais da sua região.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Para Clientes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/como-funciona" className="hover:text-foreground">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/buscar-servicos" className="hover:text-foreground">
                    Buscar Serviços
                  </Link>
                </li>
                <li>
                  <Link href="/avaliar-prestador" className="hover:text-foreground">
                    Avaliar Prestador
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Para Prestadores</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/cadastro-prestador" className="hover:text-foreground">
                    Cadastrar-se
                  </Link>
                </li>
                <li>
                  <Link href="/planos" className="hover:text-foreground">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/central-ajuda" className="hover:text-foreground">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-foreground">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/termos-uso" className="hover:text-foreground">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 UaiServiços. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
