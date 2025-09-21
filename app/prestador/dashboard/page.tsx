'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Plus, Edit, Star, MapPin, Calendar, LogOut, Settings, Camera } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'
import { AvatarUpload } from '@/components/avatar-upload'
import { CitySelector } from '@/components/city-selector'
import { ServiceAreaSelector } from '@/components/service-area-selector'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  content?: string
  serviceType?: string
  location?: string
  createdAt: string
  _count: {
    postLikes: number
    comments: number
  }
}

export default function PrestadorDashboard() {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    serviceType: '',
    location: '',
    images: [] as string[]
  })
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    phone: '',
    serviceCities: [] as string[],
    serviceAreas: [] as string[]
  })
  const [loading, setLoading] = useState(true)

  // Carregar dados do usuário e posts
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        description: user.providerProfile?.description || '',
        city: user.providerProfile?.city || '',
        state: user.providerProfile?.state || '',
        phone: user.phone || '',
        serviceCities: (() => {
          try {
            return user.providerProfile?.serviceCities ? JSON.parse(user.providerProfile.serviceCities) : []
          } catch { return [] }
        })(),
        serviceAreas: (() => {
          try {
            return user.providerProfile?.serviceAreas ? JSON.parse(user.providerProfile.serviceAreas) : []
          } catch { return [] }
        })()
      })
      loadPosts()
    }
  }, [user])

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const { posts } = await response.json()
        const userPosts = posts.filter((post: any) => post.authorId === user?.id)
        setPosts(userPosts)
      } else {
        toast.error('Erro ao carregar posts')
      }
    } catch (error) {
      console.error('Error loading posts:', error)
      toast.error('Erro ao carregar posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim()) {
      toast.error('Título é obrigatório')
      return
    }
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
      if (response.ok) {
        const { post } = await response.json()
        setPosts(prev => [post, ...prev])
        setNewPost({ title: '', content: '', serviceType: '', location: '', images: [] })
        setIsCreatePostOpen(false)
        toast.success('Post criado com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao criar post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Erro ao criar post')
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          serviceCities: JSON.stringify(profileData.serviceCities),
          serviceAreas: JSON.stringify(profileData.serviceAreas)
        })
      })

      if (response.ok) {
        setIsEditProfileOpen(false)
        toast.success('Perfil atualizado com sucesso!')
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Erro ao atualizar perfil')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
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

  if (!user || user.userType !== 'PROVIDER') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">Esta página é apenas para prestadores de serviços.</p>
          <Button onClick={() => router.push('/login')}>Fazer Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiço</span>
              </div>
              <Badge variant="secondary">Prestador</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Publicação</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Instalação elétrica residencial"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Descrição</Label>
                      <Textarea
                        id="content"
                        placeholder="Descreva o trabalho realizado..."
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Tipo de Serviço</Label>
                        <Input
                          id="serviceType"
                          placeholder="Ex: Elétrica"
                          value={newPost.serviceType}
                          onChange={(e) => setNewPost(prev => ({ ...prev, serviceType: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          placeholder="Ex: Belo Horizonte, MG"
                          value={newPost.location}
                          onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Fotos do Trabalho</Label>
                      <ImageUpload
                        onImagesChange={(images) => setNewPost(prev => ({ ...prev, images }))}
                        maxImages={4}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsCreatePostOpen(false)}>Cancelar</Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">Publicar</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm"><Settings className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.providerProfile?.city}, {user.providerProfile?.state}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <AvatarUpload
                    currentAvatar={user?.avatar}
                    userName={user?.name}
                    onAvatarChange={() => window.location.reload()}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avaliação</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{user.providerProfile?.rating?.toFixed(1) || '0.0'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trabalhos</span>
                  <span className="font-semibold">{user.providerProfile?.totalJobs || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avaliações</span>
                  <span className="font-semibold">{user.providerProfile?.totalReviews || 0}</span>
                </div>
                {user.providerProfile?.description && (
                  <p className="text-sm text-gray-600">{user.providerProfile.description}</p>
                )}

                <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full"><Edit className="w-4 h-4 mr-2" />Editar Perfil</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profileName">Nome</Label>
                        <Input
                          id="profileName"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profilePhone">Telefone</Label>
                        <Input
                          id="profilePhone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profileDescription">Descrição</Label>
                        <Textarea
                          id="profileDescription"
                          value={profileData.description}
                          onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profileCity">Cidade Base</Label>
                          <Input
                            id="profileCity"
                            value={profileData.city}
                            onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profileState">Estado</Label>
                          <Input
                            id="profileState"
                            value={profileData.state}
                            onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                      </div>

                      {user.providerProfile && (
                        <>
                          <div className="space-y-2">
                            <Label>Cidades que Atende</Label>
                            <CitySelector
                              selectedCities={profileData.serviceCities}
                              onCitiesChange={(cities) => setProfileData(prev => ({ ...prev, serviceCities: cities }))}
                              placeholder="Selecione as cidades onde você atende..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Áreas de Atuação</Label>
                            <ServiceAreaSelector
                              selectedAreas={profileData.serviceAreas}
                              onAreasChange={(areas) => setProfileData(prev => ({ ...prev, serviceAreas: areas }))}
                              placeholder="Selecione suas áreas de especialização..."
                            />
                          </div>
                        </>
                      )}

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancelar</Button>
                        <Button onClick={handleUpdateProfile}>Salvar</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Suas Publicações</h2>
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma publicação ainda</h3>
                    <p className="text-gray-600 mb-4">Comece compartilhando seus trabalhos para atrair mais clientes</p>
                    <Button onClick={() => setIsCreatePostOpen(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeira Publicação
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.title}</h3>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                      </div>
                    </CardHeader>
                    {post.content && (
                      <CardContent>
                        <p>{post.content}</p>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}