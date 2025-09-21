"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Bookmark, Phone } from "lucide-react"
import Link from "next/link"

export default function PublicDashboard() {
  const [providers, setProviders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [loading, setLoading] = useState(true)

  const loadProviders = async () => {
    try {
      setLoading(true)
      // Chame sua API real aqui
      const res = await fetch("/prestador") // ajuste a rota da sua API
      const data = await res.json()
      setProviders(data)
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProviders()
  }, [selectedCategory, selectedLocation])

  const filteredProviders = providers.filter((provider: any) => {
    if (!searchTerm) return true
    return (
      provider.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.state?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

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
                  <SelectItem value="informatica">Informática</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                  <SelectItem value="Contagem">Contagem</SelectItem>
                  <SelectItem value="Nova Lima">Nova Lima</SelectItem>
                  <SelectItem value="Betim">Betim</SelectItem>
                  <SelectItem value="Ribeirão das Neves">Ribeirão das Neves</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum prestador encontrado</h3>
                  <p className="text-muted-foreground">
                    {providers.length === 0
                      ? "Ainda não há prestadores cadastrados. Volte em breve!"
                      : "Tente ajustar os filtros de busca"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredProviders.map((provider: any) => (
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
                        <CardDescription className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {provider.city}, {provider.state}
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
                        ({provider.totalReviews || 0} avaliações)
                      </span>
                    </div>
                    {provider.verified && <Badge variant="secondary">Verificado</Badge>}
                  </div>

                  {provider.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{provider.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {provider.hourlyRate && (
                        <span className="font-semibold text-primary">R$ {provider.hourlyRate.toFixed(2)}/hora</span>
                      )}
                      {provider.dailyRate && !provider.hourlyRate && (
                        <span className="font-semibold text-primary">R$ {provider.dailyRate.toFixed(2)}/dia</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Bookmark className="w-4 h-4 mr-1" />
                      Salvar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Star className="w-4 h-4 mr-1" />
                      Avaliar
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Contatar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results Info */}
        {filteredProviders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Mostrando {filteredProviders.length} de {providers.length} prestadores
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
