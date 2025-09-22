import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, CheckCircle, AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"

export default function AvaliarPrestadorPage() {
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
              <span className="text-2xl font-bold text-primary">UaiServiço</span>
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
            Avalie seu <span className="text-primary">Prestador</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Sua avaliação é importante para ajudar outros clientes a fazerem a melhor escolha.
          </p>
        </div>
      </section>

      {/* How to Rate Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Avaliar um Prestador</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Contrate o Serviço</h3>
                <p className="text-muted-foreground">
                  Entre em contato com o prestador e contrate o serviço através da nossa plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Receba o Link</h3>
                <p className="text-muted-foreground">
                  Após a conclusão do serviço, você receberá um link para avaliar o prestador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Deixe sua Avaliação</h3>
                <p className="text-muted-foreground">
                  Avalie de 1 a 5 estrelas e deixe um comentário sobre sua experiência.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rating Criteria Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Critérios de Avaliação</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Qualidade do Trabalho</h3>
                <p className="text-sm text-muted-foreground">Como foi a qualidade do serviço prestado?</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Comunicação</h3>
                <p className="text-sm text-muted-foreground">O prestador foi claro e responsivo?</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Pontualidade</h3>
                <p className="text-sm text-muted-foreground">O prestador chegou no horário combinado?</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Atendimento</h3>
                <p className="text-sm text-muted-foreground">Como foi o atendimento e cordialidade?</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rating Guidelines Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Diretrizes para Avaliações</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    Boas Práticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Seja honesto e objetivo em sua avaliação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Mencione aspectos específicos do serviço</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use linguagem respeitosa e construtiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Avalie apenas serviços que foram realmente prestados</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    Evite
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Comentários ofensivos ou inadequados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Avaliações baseadas em preconceitos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Informações pessoais ou confidenciais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Avaliações falsas ou enganosas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Example Rating Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Exemplo de Avaliação</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="Cliente" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">João Silva</h4>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Excelente trabalho! O prestador foi muito profissional, chegou no horário combinado e fez um trabalho de qualidade. 
                      Recomendo para outros clientes. A comunicação foi clara durante todo o processo.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Serviço: Encanamento</span>
                      <span>•</span>
                      <span>Há 2 dias</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso editar minha avaliação depois de publicada?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode editar sua avaliação dentro de 30 dias após a publicação. 
                  Após esse período, a avaliação fica permanente.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">O prestador pode responder minha avaliação?</h3>
                <p className="text-muted-foreground">
                  Sim, os prestadores podem responder às avaliações para esclarecer situações 
                  ou agradecer o feedback.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Minha avaliação pode ser removida?</h3>
                <p className="text-muted-foreground">
                  Avaliações podem ser removidas se violarem nossas diretrizes de uso. 
                  Entre em contato conosco se achar que uma avaliação é inadequada.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como posso avaliar se não recebi o link?</h3>
                <p className="text-muted-foreground">
                  Entre em contato conosco através do suporte e forneça os detalhes do serviço. 
                  Nossa equipe ajudará você a fazer a avaliação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para avaliar um prestador?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Se você já contratou um serviço através da nossa plataforma, procure pelo link de avaliação em seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              asChild
            >
              <Link href="/dashboard-publico">Buscar Prestadores</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-orange-500 hover:bg-white/10"
              asChild
            >
              <Link href="/contato">Preciso de Ajuda</Link>
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
                <span className="text-xl font-bold text-primary">UaiServiço</span>
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
            <p>&copy; 2024 UaiServiço. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
