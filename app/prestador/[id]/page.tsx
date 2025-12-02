"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, MessageCircle, Calendar, Clock, CheckCircle, ArrowLeft, Bookmark, FileText, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RatingModal } from "@/components/rating-modal"
import { useRating } from "@/hooks/use-rating"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

interface Post {
  id: string
  title: string
  content?: string
  serviceType?: string
  location?: string
  images?: string[]
  createdAt: string
  _count: {
    postLikes: number
    comments: number
  }
}

export default function ProviderProfilePage() {
  const params = useParams()
  const { user } = useAuth()
  const { markContactAsMade } = useRating()
  const [provider, setProvider] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ratingModal, setRatingModal] = useState<{
    isOpen: boolean
    providerId: string
    providerName: string
  }>({
    isOpen: false,
    providerId: '',
    providerName: ''
  })

  // Função para formatar texto (primeira letra maiúscula e sem hífens)
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


  const handleContact = async () => {
    if (!provider?.user?.phone) return
    
    if (!user) {
      toast.error("Faça login para contactar um prestador")
      return
    }
    
    const message = `Olá ${provider.user.name}! Vi seu perfil no UaiServiços e gostaria de conversar sobre seus serviços.`
    const whatsappUrl = `https://wa.me/55${provider.user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    
    // Registrar contato
    await markContactAsMade(provider.id)
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Abrir modal de avaliação imediatamente
    setRatingModal({
      isOpen: true,
      providerId: provider.id,
      providerName: provider.user.name
    })
    
    toast.success("Contato registrado! Por favor, avalie este prestador.")
  }

  useEffect(() => {
    loadProvider()
  }, [params.id])

  const loadProvider = async () => {
    try {
      const providerResponse = await fetch(`/api/provider/${params.id}`)
      
      if (providerResponse.ok) {
        const { provider } = await providerResponse.json()
        setProvider(provider)
        console.log('Posts carregados:', provider.posts)
        setPosts(provider.posts || [])
        
        // Carregar as avaliações usando o ID correto do provider
        const reviewsResponse = await fetch(`/api/reviews?providerId=${provider.id}`)
        if (reviewsResponse.ok) {
          const { reviews } = await reviewsResponse.json()
          setReviews(reviews || [])
        } else {
          console.error('Failed to load reviews:', reviewsResponse.status, reviewsResponse.statusText)
          setReviews([])
        }
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
                <span className="text-2xl font-bold text-primary">UaiServiços</span>
              </Link>
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

                {/* Áreas de Atuação - Exibidas abaixo do nome */}
                {(() => {
                  try {
                    const areas = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
                    return areas.length > 0 && (
                      <div className="mb-4">
                        <p className="text-muted-foreground">
                          {areas.map((area: string) => formatText(area)).join(', ')}
                        </p>
                      </div>
                    )
                  } catch { return null }
                })()}

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{provider.rating || '0.0'}</span>
                    <span className="text-muted-foreground">({provider.totalReviews || 0} avaliações)</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>
                      {(() => {
                        try {
                          const cities = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
                          return cities.length > 0 ? cities.map((city: string) => formatText(city)).join(', ') : (provider.city ? `${provider.city}, ${provider.state}` : 'Localização não informada')
                        } catch { 
                          return provider.city ? `${provider.city}, ${provider.state}` : 'Localização não informada'
                        }
                      })()}
                    </span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className={`w-2 h-2 rounded-full ${provider.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span>{provider.onlineStatus}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{provider.description}</p>

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

                    {/* Layout com descrição à esquerda e imagem à direita */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      {/* Conteúdo do post */}
                      <div className="flex-1">
                        {post.content && <p className="text-muted-foreground">{post.content}</p>}
                      </div>
                      
                      {/* Imagens à direita */}
                      {post.images && Array.isArray(post.images) && post.images.length > 0 && (
                        <div className="flex-shrink-0">
                          <div className="grid grid-cols-1 gap-2 w-48">
                            {post.images.map((image: string, index: number) => {
                              console.log(`Imagem ${index + 1}:`, image)
                              return (
                                <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Trabalho ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
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
                  {provider.experience && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Experiência</label>
                      <p className="font-semibold">{provider.experience} {provider.experienceUnit === 'years' ? 'anos' : 'meses'}</p>
                    </div>
                  )}
                  {provider.totalJobs && provider.totalJobs > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Trabalhos Concluídos</label>
                      <p className="font-semibold">{provider.totalJobs}</p>
                    </div>
                  )}
                  {provider.averageJobValue && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Valor Médio</label>
                      <p className="font-semibold text-primary">R$ {provider.averageJobValue}/{provider.averageJobValueUnit === 'hour' ? 'hora' : 'dia'}</p>
                    </div>
                  )}
                  
                  {/* Cidades que Atende */}
                  {(() => {
                    try {
                      const cities = provider.serviceCities ? JSON.parse(provider.serviceCities) : []
                      return cities.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Cidades que Atende</label>
                          <p className="font-semibold">{cities.map((city: string) => formatText(city)).join(', ')}</p>
                        </div>
                      )
                    } catch { return null }
                  })()}
                  
                  {/* Áreas de Atuação */}
                  {(() => {
                    try {
                      const areas = provider.serviceAreas ? JSON.parse(provider.serviceAreas) : []
                      return areas.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Áreas de Atuação</label>
                          <p className="font-semibold">{areas.map((area: string) => formatText(area)).join(', ')}</p>
                        </div>
                      )
                    } catch { return null }
                  })()}
                </CardContent>
              </Card>

              {/* Formações */}
              {provider.formations && provider.formations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Formações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.formations.map((formation: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="font-medium">{formation.institutionName}</div>
                        <div className="text-sm text-muted-foreground">{formation.area}</div>
                        {formation.startDate && formation.endDate && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(formation.startDate).toLocaleDateString('pt-BR')} - {new Date(formation.endDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        {formation.certificateUrl && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-600 font-medium">Certificado disponível</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(formation.certificateUrl, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Visualizar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

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
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${provider.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <p className="font-semibold">{provider.onlineStatus}</p>
                    </div>
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
            {/* Debug: Mostrar informações sobre as avaliações */}
            <div className="text-sm text-muted-foreground mb-4">
              Debug: {reviews.length} avaliações encontradas
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.reviewer.avatar} />
                            <AvatarFallback>
                              {review.reviewer.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.reviewer.name}</p>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-muted-foreground">{review.comment}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-muted-foreground">Este prestador ainda não recebeu avaliações dos clientes.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Avaliação */}
      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={() => {
          setRatingModal(prev => ({ ...prev, isOpen: false }))
        }}
        providerName={ratingModal.providerName}
        providerId={ratingModal.providerId}
        onRatingSubmitted={() => {
          // Recarregar dados do prestador para atualizar avaliações
          loadProvider()
        }}
      />
    </div>
  )
}