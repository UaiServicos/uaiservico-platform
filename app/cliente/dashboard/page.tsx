"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Search, MapPin, Star, Phone, Filter, Settings, User, LogOut } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AvatarUpload } from "@/components/avatar-upload"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface Provider {
  id: string
  user: {
    id: string
    name: string
    phone: string
    avatar?: string
  }
  city: string
  state: string
  rating?: number
  totalReviews: number
  hourlyRate?: number
  dailyRate?: number
  verified: boolean
  services: Array<{
    category: {
      name: string
    }
  }>
}

interface Post {
  id: string
  title: string
  content?: string
  serviceType?: string
  location?: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar?: string
    providerProfile?: {
      verified: boolean
      city: string
      state: string
    }
  }
  _count: {
    postLikes: number
    comments: number
  }
}

export default function ClientDashboardPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("inicio")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("todas")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [providers, setProviders] = useState<Provider[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (user) {
      loadProviders()
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        newPassword: "",
        confirmPassword: ""
      })
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      loadProviders()
    }
  }, [selectedCity, selectedCategory])



  const loadProviders = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCity) params.append('city', selectedCity)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      
      const response = await fetch(`/api/providers?${params}`)
      if (response.ok) {
        const { providers } = await response.json()
        setProviders(providers)
      }
    } catch (error) {
      console.error('Error loading providers:', error)
      toast.error('Erro ao carregar prestadores')
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (provider: any) => {
    if (!user) {
      toast.error("Faça login para contactar um prestador")
      router.push("/login")
      return
    }
    const providerName = provider.user?.name || 'Prestador'
    const providerPhone = provider.user?.phone || ''
    const message = `Olá ${providerName}! Vi seu perfil no UaiServiço e gostaria de conversar sobre seus serviços.`
    const whatsappUrl = `https://wa.me/55${providerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleViewProfile = (provider: any) => {
    const userId = provider.user?.id || provider.id
    router.push(`/prestador/${userId}`)
  }

  const handleUpdateProfile = async () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast.error("As senhas não coincidem")
      return
    }
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          ...(profileData.newPassword && { password: profileData.newPassword })
        })
      })

      if (response.ok) {
        toast.success("Perfil atualizado com sucesso!")
        setProfileData(prev => ({ ...prev, password: "", newPassword: "", confirmPassword: "" }))
      } else {
        const error = await response.json()
        toast.error(error.error || "Erro ao atualizar perfil")
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error("Erro ao atualizar perfil")
    }
  }

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (provider.services[0]?.category.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora mesmo'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return 'Ontem'
    return `${Math.floor(diffInHours / 24)} dias atrás`
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== 'CLIENT') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">Esta página é apenas para clientes.</p>
          <Button onClick={() => router.push('/login')}>Fazer Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        isLoggedIn={!!user}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onProfileClick={() => setActiveTab("profile")}
        onLoginClick={() => router.push("/login")}
        onLogoutClick={logout}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {user.name}!</h1>
          <p className="text-muted-foreground">Encontre os melhores prestadores de serviços da sua região</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inicio">Início</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="inicio" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Prestadores de Serviços</h2>
                <p className="text-muted-foreground">Encontre profissionais qualificados na sua região</p>
              </div>
              {(searchQuery || selectedCategory !== "all" || selectedCity) && (
                <Badge variant="outline">
                  {filteredProviders.length} resultado(s) encontrado(s)
                </Badge>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando prestadores...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={provider.user?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {(provider.user?.name || 'P')
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{provider.user?.name}</h3>
                          <p className="text-sm text-primary font-medium">
                            {provider.services?.[0]?.category?.name || 'Prestador'}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {provider.description || 'Prestador de serviços qualificado'}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {provider.city}, {provider.state}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating?.toFixed(1) || '0.0'}</span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.totalReviews || 0})
                          </span>
                        </div>
                        <span className="font-semibold text-primary">
                          R$ {provider.dailyRate || provider.hourlyRate || 100}
                          {provider.dailyRate ? '/dia' : '/hora'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleContact(provider)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Contatar
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleViewProfile(provider)}
                        >
                          Ver Perfil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum prestador encontrado para sua busca.</p>
              </div>
            )}
          </TabsContent>





          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerencie suas informações básicas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AvatarUpload 
                    currentAvatar={user?.avatar}
                    userName={user?.name}
                    onAvatarChange={(avatar) => {
                      window.location.reload()
                    }}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input 
                        id="nome" 
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                      <Input 
                        id="telefone" 
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <Button onClick={handleUpdateProfile} className="w-full">
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>Mantenha sua conta segura</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={profileData.password}
                      onChange={(e) => setProfileData(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  <Button 
                    onClick={handleUpdateProfile} 
                    className="w-full"
                    disabled={!profileData.password || !profileData.newPassword}
                  >
                    Alterar Senha
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}