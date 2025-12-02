import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, MapPin, Phone, MessageCircle, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function BuscarServicosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold text-primary">UaiServiços</span>
            </Link>
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
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Encontre o <span className="text-primary">Profissional Ideal</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Milhares de profissionais verificados prontos para atender suas necessidades.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-background rounded-xl shadow-lg border">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Que serviço você precisa? (ex: pedreiro, encanador...)"
                  className="pl-10 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Select>
                  <SelectTrigger className="pl-10 border-0 focus-visible:ring-2 focus-visible:ring-primary">
                    <SelectValue placeholder="Sua cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as cidades</SelectItem>
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
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                asChild
              >
                <Link href="/dashboard-publico">Buscar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias de Serviços</h2>
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

      {/* Search Tips Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Dicas para uma Busca Eficiente</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">Seja Específico</h3>
                <p className="text-muted-foreground text-sm">
                  Use termos específicos como "encanador para vazamento" ou "eletricista para instalação de ventilador" 
                  para encontrar profissionais especializados.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">Defina sua Localização</h3>
                <p className="text-muted-foreground text-sm">
                  Especifique sua cidade para encontrar profissionais próximos a você, 
                  reduzindo custos de deslocamento e tempo de resposta.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">Verifique Avaliações</h3>
                <p className="text-muted-foreground text-sm">
                  Leia as avaliações de outros clientes para entender a qualidade do trabalho 
                  e o atendimento do profissional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Serviços Mais Procurados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "João Silva",
                service: "Pedreiro",
                rating: 4.9,
                reviews: 127,
                location: "Belo Horizonte",
                price: "A partir de R$ 80/dia",
                image: "/professional-construction-worker.jpg",
                verified: true,
              },
              {
                name: "Maria Santos",
                service: "Diarista",
                rating: 5.0,
                reviews: 89,
                location: "Contagem",
                price: "A partir de R$ 120/dia",
                image: "/professional-cleaning-lady.jpg",
                verified: true,
              },
              {
                name: "Carlos Oliveira",
                service: "Eletricista",
                rating: 4.8,
                reviews: 156,
                location: "Betim",
                price: "A partir de R$ 100/serviço",
                image: "/professional-electrician.png",
                verified: true,
              },
            ].map((provider) => (
              <Card key={provider.name} className="hover:shadow-lg transition-shadow">
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
                        {provider.verified && <Badge variant="secondary" className="text-xs">Verificado</Badge>}
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {provider.service}
                      </Badge>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{provider.rating}</span>
                        <span className="text-muted-foreground text-sm">({provider.reviews} avaliações)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{provider.price}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/prestador/${provider.name.toLowerCase().replace(' ', '-')}`}>
                          <Phone className="w-4 h-4 mr-1" />
                          Ver Perfil
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/prestador/${provider.name.toLowerCase().replace(' ', '-')}`}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contatar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard-publico">Ver Todos os Profissionais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Não encontrou o que procura?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nossa plataforma tem milhares de profissionais. Faça uma busca mais ampla ou entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              asChild
            >
              <Link href="/dashboard-publico">Buscar Todos os Profissionais</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contato">Entrar em Contato</Link>
            </Button>
          </div>
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
                <li><Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link></li>
                <li><Link href="/buscar-servicos" className="hover:text-foreground">Buscar Serviços</Link></li>
                <li><Link href="/avaliar-prestador" className="hover:text-foreground">Avaliar Prestador</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Para Prestadores</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/cadastro-prestador" className="hover:text-foreground">Cadastrar-se</Link></li>
                <li><Link href="/planos" className="hover:text-foreground">Planos</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/central-ajuda" className="hover:text-foreground">Central de Ajuda</Link></li>
                <li><Link href="/contato" className="hover:text-foreground">Contato</Link></li>
                <li><Link href="/termos-uso" className="hover:text-foreground">Termos de Uso</Link></li>
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
