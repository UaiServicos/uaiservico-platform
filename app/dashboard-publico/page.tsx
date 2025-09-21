"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Bookmark, Phone, Briefcase, GraduationCap, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PublicDashboard() {
  const searchParams = useSearchParams()
  const [providers, setProviders] = useState<any[]>([])
  const [allProviders, setAllProviders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  // Função para formatar texto (capitalizar primeira letra de cada palavra)
  const formatText = (text: string) => {
    return text
      .split('-')
      .map((word, index, arr) => {
        // Se for a segunda parte (sigla do estado), manter em maiúsculas
        if (word.length === 2 && index === arr.length - 1) {
          return word.toUpperCase(); // Sigla do estado (2 letras)
        }
        // Caso contrário, capitalizar a cidade (primeira letra maiúscula)
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  // Inicializar filtros com parâmetros da URL
  useEffect(() => {
    const service = searchParams.get('service')
    const city = searchParams.get('city')
    
    if (service) setSearchTerm(service)
    if (city) setSelectedLocation(city)
  }, [searchParams])

  const loadProviders = async () => {
    try {
      setLoading(true)
      // Buscar todos os prestadores
      const res = await fetch('/api/providers')
      const data = await res.json()
      const providersData = data.providers || []
      setAllProviders(providersData)
      setProviders(providersData)
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error)
      setAllProviders([])
      setProviders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProviders()
  }, [])

  // Debounce para busca
  useEffect(() => {
    setSearching(true)
    const timeoutId = setTimeout(() => {
      filterProviders()
      setSearching(false)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, selectedLocation, allProviders])

  const filterProviders = () => {
    let filtered = allProviders

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter((provider: any) => {
        const providerName = provider.user?.name || ''
        const providerService = provider.services?.[0]?.category?.name || ''
        
        // Verificar cidades que atende
        const serviceCities = (() => {
          try {
            const parsed = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
            return Array.isArray(parsed) ? parsed : []
          } catch { return [] }
        })()
        
        // Verificar áreas de serviço
        const serviceAreas = (() => {
          try {
            const parsed = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
            return Array.isArray(parsed) ? parsed : []
          } catch { return [] }
        })()
        
        return providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               providerService.toLowerCase().includes(searchTerm.toLowerCase()) ||
               serviceCities.some((city: string) => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
               serviceAreas.some((area: string) => area.toLowerCase().includes(searchTerm.toLowerCase()))
      })
    }

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter((provider: any) => {
        const providerService = provider.services?.[0]?.category?.name || ''
        const serviceAreas = (() => {
          try {
            const parsed = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
            return Array.isArray(parsed) ? parsed : []
          } catch { return [] }
        })()
        
        return serviceAreas.some((area: string) => area.toLowerCase().includes(selectedCategory.toLowerCase())) ||
               providerService.toLowerCase().includes(selectedCategory.toLowerCase())
      })
    }

    // Filtro por localização
    if (selectedLocation !== "all") {
      filtered = filtered.filter((provider: any) => {
        const serviceCities = (() => {
          try {
            const parsed = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
            return Array.isArray(parsed) ? parsed : []
          } catch { return [] }
        })()
        
        return serviceCities.some((city: string) => city.toLowerCase().includes(selectedLocation.toLowerCase()))
      })
    }

    setProviders(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando prestadores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiço</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/cadastro-prestador">Sou Prestador</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Encontre Prestadores de Serviços</h1>
          <p className="text-muted-foreground">Descubra profissionais qualificados na sua região</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, serviço ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Área de Serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
                  <SelectItem value="encanamento">Encanamento</SelectItem>
                  <SelectItem value="construcao">Construção</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="jardinagem">Jardinagem</SelectItem>
                  <SelectItem value="pintura">Pintura</SelectItem>
                  <SelectItem value="marcenaria">Marcenaria</SelectItem>
                  <SelectItem value="mecanica">Mecânica</SelectItem>
                  <SelectItem value="costura">Costura</SelectItem>
                  <SelectItem value="culinaria">Culinária</SelectItem>
                  <SelectItem value="cuidados-infantis">Cuidados Infantis</SelectItem>
                  <SelectItem value="cuidados-pets">Cuidados com Pets</SelectItem>
                  <SelectItem value="informatica">Informática</SelectItem>
                  <SelectItem value="refrigeracao">Refrigeração</SelectItem>
                  <SelectItem value="solda">Solda</SelectItem>
                  <SelectItem value="paisagismo">Paisagismo</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="frete">Frete</SelectItem>
                  <SelectItem value="mudancas">Mudanças</SelectItem>
                  <SelectItem value="chaveiro">Chaveiro</SelectItem>
                  <SelectItem value="estetica">Estética</SelectItem>
                  <SelectItem value="massagem">Massagem</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                  <SelectItem value="contagem">Contagem</SelectItem>
                  <SelectItem value="uberlandia">Uberlândia</SelectItem>
                  <SelectItem value="juiz-de-fora">Juiz de Fora</SelectItem>
                  <SelectItem value="betim">Betim</SelectItem>
                  <SelectItem value="montes-claros">Montes Claros</SelectItem>
                  <SelectItem value="ribeirao-das-neves">Ribeirão das Neves</SelectItem>
                  <SelectItem value="uberaba">Uberaba</SelectItem>
                  <SelectItem value="governador-valadares">Governador Valadares</SelectItem>
                  <SelectItem value="ipatinga">Ipatinga</SelectItem>
                  <SelectItem value="santa-luzia">Santa Luzia</SelectItem>
                  <SelectItem value="sete-lagoas">Sete Lagoas</SelectItem>
                  <SelectItem value="divinopolis">Divinópolis</SelectItem>
                  <SelectItem value="ibirite">Ibirité</SelectItem>
                  <SelectItem value="passos">Passos</SelectItem>
                  <SelectItem value="patos-de-minas">Patos de Minas</SelectItem>
                  <SelectItem value="pouso-alegre">Pouso Alegre</SelectItem>
                  <SelectItem value="teofilo-otoni">Teófilo Otoni</SelectItem>
                  <SelectItem value="pocos-de-caldas">Poços de Caldas</SelectItem>
                  <SelectItem value="patrocinio">Patrocínio</SelectItem>
                  <SelectItem value="nova-lima">Nova Lima</SelectItem>
                  <SelectItem value="itabira">Itabira</SelectItem>
                  <SelectItem value="ouro-preto">Ouro Preto</SelectItem>
                  <SelectItem value="diamantina">Diamantina</SelectItem>
                  <SelectItem value="sao-joao-del-rei">São João del Rei</SelectItem>
                  <SelectItem value="tiradentes">Tiradentes</SelectItem>
                  <SelectItem value="mariana">Mariana</SelectItem>
                  <SelectItem value="congonhas">Congonhas</SelectItem>
                  <SelectItem value="sabara">Sabará</SelectItem>
                  <SelectItem value="caete">Caeté</SelectItem>
                  <SelectItem value="lagoa-santa">Lagoa Santa</SelectItem>
                  <SelectItem value="vespasiano">Vespasiano</SelectItem>
                  <SelectItem value="santa-barbara">Santa Bárbara</SelectItem>
                  <SelectItem value="itauna">Itaúna</SelectItem>
                  <SelectItem value="formiga">Formiga</SelectItem>
                  <SelectItem value="lagoa-da-prata">Lagoa da Prata</SelectItem>
                  <SelectItem value="araxa">Araxá</SelectItem>
                  <SelectItem value="frutal">Frutal</SelectItem>
                  <SelectItem value="ituiutaba">Ituiutaba</SelectItem>
                  <SelectItem value="monte-carmelo">Monte Carmelo</SelectItem>
                  <SelectItem value="vicosa">Viçosa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {searching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Buscando prestadores...</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!searching && providers.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum prestador encontrado</h3>
                  <p className="text-muted-foreground">
                    {allProviders.length === 0
                      ? "Ainda não há prestadores cadastrados. Volte em breve!"
                      : "Tente ajustar os filtros de busca"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : !searching ? (
            providers.map((provider: any) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Link href={`/prestador/${provider.userId}`} className="block">
                    <div className="flex items-center space-x-3 hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={provider.user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                          {provider.user?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "PR"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          {provider.user?.name || "Prestador"}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {(() => {
                              try {
                                const cities = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
                                return cities.length > 0 ? cities.slice(0, 2).map(formatText).join(', ') + (cities.length > 2 ? '...' : '') : 'Nenhuma cidade'
                              } catch { return 'Nenhuma cidade' }
                            })()}
                          </div>
                          {(() => {
                            try {
                              const areas = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
                              return areas.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {areas.slice(0, 2).map((area: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {formatText(area)}
                                    </Badge>
                                  ))}
                                  {areas.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{areas.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )
                            } catch { return null }
                          })()}
                        </CardDescription>
                      </div>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {provider.rating ? provider.rating.toFixed(1) : "N/A"}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({provider._count?.receivedReviews || 0} avaliações)
                      </span>
                    </div>
                    {provider.verified && <Badge variant="secondary">Verificado</Badge>}
                  </div>

                  {provider.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{provider.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {provider.averageJobValue && (
                        <span className="font-semibold text-primary">R$ {provider.averageJobValue.toFixed(2)}/{provider.averageJobValueUnit === 'hour' ? 'hora' : 'dia'}</span>
                      )}
                      {!provider.averageJobValue && (
                        <span className="font-semibold text-primary">Consulte preço</span>
                      )}
                    </div>
                    {provider.responseTime && (
                      <div className="text-xs text-muted-foreground">
                        Responde em {provider.responseTime}min
                      </div>
                    )}
                  </div>

                  {/* Novos campos */}
                  {provider.experience && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Briefcase className="w-3 h-3" />
                      <span>{provider.experience} {provider.experienceUnit === 'years' ? 'anos' : 'meses'} de experiência</span>
                    </div>
                  )}
                  
                  {provider.totalJobs && provider.totalJobs > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3" />
                      <span>{provider.totalJobs} trabalhos realizados</span>
                    </div>
                  )}
                  
                  {provider.averageJobValue && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      <span>Valor médio: R$ {provider.averageJobValue}/{provider.averageJobValueUnit === 'hour' ? 'hora' : 'dia'}</span>
                    </div>
                  )}
                  
                  {provider.formations && provider.formations.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>Formações:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {provider.formations.slice(0, 2).map((formation: any, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {formatText(formation.area)}
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

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/prestador/${provider.userId}`}>
                        <Star className="w-4 h-4 mr-1" />
                        Ver Perfil
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/prestador/${provider.userId}`}>
                        <Phone className="w-4 h-4 mr-1" />
                        Contatar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : null}
        </div>

        {/* Results Info */}
        {providers.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Mostrando {providers.length} de {allProviders.length} prestadores
            </p>
          </div>
        )}
      </div>
    </div>
  )
}