"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, MessageCircle, Calendar, Clock, CheckCircle, ArrowLeft, Bookmark } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProviderProfilePage() {
  const params = useParams()
  const [provider, setProvider] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)



  const handleContact = () => {
    if (!provider?.user?.phone) return
    const message = `Olá ${provider.user.name}! Vi seu perfil no UaiServiço e gostaria de conversar sobre seus serviços.`
    const whatsappUrl = `https://wa.me/55${provider.user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  useEffect(() => {
    loadProvider()
  }, [params.id])

  const loadProvider = async () => {
    try {
      const response = await fetch(`/api/provider/${params.id}`)
      if (response.ok) {
        const { provider } = await response.json()
        setProvider(provider)
        setPosts(provider.posts || [])
      } else {
        setProvider(null)
      }
    } catch (error) {
      console.error('Error loading provider:', error)
      setProvider(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Prestador não encontrado</h2>
          <p className="text-muted-foreground mb-4">O prestador que você está procurando não existe.</p>
          <Button asChild>
            <Link href="/dashboard">Voltar para busca</Link>
          </Button>
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiço</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Provider Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32 mx-auto md:mx-0">
                <AvatarImage src={provider.user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {provider.user?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "PR"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                  <h1 className="text-3xl font-bold">{provider.user?.name}</h1>
                  {provider.verified && (
                    <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-muted-foreground">({provider.totalReviews} avaliações)</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>
                      {provider.city}, {provider.state}
                    </span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>Responde em {provider.responseTime}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{provider.description}</p>

                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {provider.services?.map((service: any) => (
                    <Badge key={service.id} variant="outline">
                      {service.category.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button onClick={handleContact}>
                    <Phone className="w-4 h-4 mr-2" />
                    Contatar via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provider Details and Posts */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Trabalhos Realizados</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="grid gap-6">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum trabalho publicado</h3>
                    <p className="text-muted-foreground">
                      Este prestador ainda não publicou nenhum trabalho.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                          {post.serviceType && <Badge variant="outline">{post.serviceType}</Badge>}
                        </div>
                      </div>
                    </div>

                    {post.content && <p className="text-muted-foreground mb-4">{post.content}</p>}

                    {post.images && Array.isArray(post.images) && post.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                        {post.images.map((image: string, index: number) => (
                          <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Trabalho ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          {post._count?.postLikes || 0} curtidas • {post._count?.comments || 0} comentários
                        </span>
                      </div>
                      <Button onClick={handleContact} size="sm">
                        Solicitar Orçamento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Profissionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiência</label>
                    <p className="font-semibold">{provider.experience || '5+ anos'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trabalhos Concluídos</label>
                    <p className="font-semibold">{provider.totalJobs || 0}</p>
                  </div>
                  {provider.hourlyRate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Valor por Hora</label>
                      <p className="font-semibold text-primary">R$ {provider.hourlyRate}/hora</p>
                    </div>
                  )}
                  {provider.dailyRate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Valor por Dia</label>
                      <p className="font-semibold text-primary">R$ {provider.dailyRate}/dia</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="font-semibold">{provider.user?.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-semibold">{provider.user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tempo de Resposta</label>
                    <p className="font-semibold">{provider.responseTime || '2 horas'}</p>
                  </div>
                  <Button onClick={handleContact} className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Entrar em Contato
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Avaliações em breve</h3>
                <p className="text-muted-foreground">As avaliações dos clientes aparecerão aqui em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}