"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Star, Phone, MapPin, User, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { AvatarUpload } from "@/components/avatar-upload"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("inicio")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("todas")
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        newPassword: "",
        confirmPassword: ""
      })
    }
    loadProviders()
  }, [user])

  useEffect(() => {
    loadProviders()
  }, [selectedCategory, selectedCity])

  const loadProviders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCity && selectedCity !== 'todas') params.append('city', selectedCity)
      if (selectedCategory && selectedCategory !== 'all') params.append('serviceArea', selectedCategory)
      
      const response = await fetch(`/api/providers?${params}`)
      if (response.ok) {
        const { providers } = await response.json()
        setProviders(providers)
      } else {
        // Fallback para dados mock se a API falhar
        setProviders([
          {
            id: "1",
            user: {
              id: "1",
              name: "João Silva",
              phone: "(31) 99999-9999",
              avatar: "/professional-construction-worker.jpg"
            },
            city: "Belo Horizonte",
            state: "MG",
            description: "Especialista em reformas residenciais e comerciais",
            rating: 4.9,
            totalReviews: 127,
            dailyRate: 150,
            services: [{ category: { name: "Pedreiro" } }]
          },
          {
            id: "2",
            user: {
              id: "2",
              name: "Maria Santos",
              phone: "(31) 99999-8888",
              avatar: "/professional-electrician.png"
            },
            city: "Belo Horizonte",
            state: "MG",
            description: "Instalações elétricas residenciais e prediais",
            rating: 4.8,
            totalReviews: 89,
            dailyRate: 120,
            services: [{ category: { name: "Eletricista" } }]
          },
          {
            id: "3",
            user: {
              id: "3",
              name: "Ana Costa",
              phone: "(31) 99999-7777",
              avatar: "/professional-cleaning-lady.jpg"
            },
            city: "Belo Horizonte",
            state: "MG",
            description: "Limpeza residencial e comercial",
            rating: 5.0,
            totalReviews: 156,
            dailyRate: 80,
            services: [{ category: { name: "Diarista" } }]
          }
        ])
      }
    } catch (error) {
      console.error('Error loading providers:', error)
      toast.error('Erro ao carregar prestadores')
    } finally {
      setLoading(false)
    }
  }

  const filteredProviders = providers.filter((provider) => {
    const providerName = provider.user?.name || ''
    // Parse serviceAreas and serviceCities from JSON strings if present
    const parseJsonArray = (value: any) => {
      if (!value) return [] as string[]
      if (Array.isArray(value)) return value as string[]
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return [] as string[]
      }
    }
    const serviceAreas: string[] = parseJsonArray(provider.serviceAreas)
    const serviceCities: string[] = parseJsonArray(provider.serviceCities)
    const providerService = serviceAreas.join(', ') || provider.services?.[0]?.category?.name || ''
    const baseLocation = [provider.city, provider.state].filter(Boolean).join(', ')
    const providerLocation = serviceCities.length > 0 ? `Atende: ${serviceCities.join(', ')}` : baseLocation
    
    const matchesSearch = 
      providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      providerService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      providerLocation.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" ||
      (serviceAreas.length > 0
        ? serviceAreas.some((a) => a.toLowerCase().includes(selectedCategory.toLowerCase()))
        : (provider.services?.[0]?.category?.name || '').toLowerCase().includes(selectedCategory.toLowerCase()))
    
    const matchesCity = selectedCity === "" || selectedCity === "todas" ||
      (serviceCities.length > 0
        ? serviceCities.some((c) => c.toLowerCase().includes(selectedCity.toLowerCase()))
        : (provider.city || '').toLowerCase().includes(selectedCity.toLowerCase()))
    
    return matchesSearch && matchesCategory && matchesCity
  })

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
    // Usar o userId do provider para acessar o perfil
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
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
          <h1 className="text-3xl font-bold mb-2">
            {user
              ? `Olá, ${user.name || "Usuário"}!`
              : "Encontre o Profissional Ideal"}
          </h1>
          <p className="text-muted-foreground">
            Conecte-se com prestadores de serviços qualificados na sua região
          </p>
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
                            {(() => {
                              const toArray = () => {
                                if (Array.isArray(provider.serviceAreas)) return provider.serviceAreas
                                try {
                                  const arr = JSON.parse(provider.serviceAreas || '[]')
                                  return Array.isArray(arr) ? arr : []
                                } catch {
                                  return []
                                }
                              }
                              const formatArea = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                              const areas = toArray()
                              return (areas.length > 0
                                ? areas.map(formatArea).join(', ')
                                : (provider.services?.[0]?.category?.name || 'Prestador'))
                            })()}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {provider.description || 'Prestador de serviços qualificado'}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {(() => {
                            try {
                              const cities = JSON.parse(provider.serviceCities || '[]')
                              if (Array.isArray(cities) && cities.length > 0) {
                                return `Atende: ${cities.join(', ')}`
                              }
                            } catch {}
                            return [provider.city, provider.state].filter(Boolean).join(', ')
                          })()}
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
            {!user ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">Faça login para acessar seu perfil</p>
                  <Button onClick={() => router.push("/login")}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Fazer Login
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
                        // Atualizar o estado local do usuário
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
            )}
          </TabsContent>


        </Tabs>
      </div>
    </div>
  )
}
