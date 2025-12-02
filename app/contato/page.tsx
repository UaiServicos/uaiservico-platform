import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

export default function ContatoPage() {
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
            Entre em <span className="text-primary">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nome</label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Assunto</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suporte">Suporte Técnico</SelectItem>
                      <SelectItem value="prestador">Dúvidas sobre Prestadores</SelectItem>
                      <SelectItem value="cliente">Dúvidas sobre Clientes</SelectItem>
                      <SelectItem value="planos">Planos e Pagamentos</SelectItem>
                      <SelectItem value="parceria">Parcerias</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Mensagem</label>
                  <Textarea 
                    placeholder="Descreva sua dúvida ou solicitação..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">contato@uaiservico.com.br</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Telefone</h4>
                      <p className="text-muted-foreground">(31) 99999-9999</p>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta, 8h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Endereço</h4>
                      <p className="text-muted-foreground">
                        Rua das Flores, 123<br />
                        Savassi, Belo Horizonte - MG<br />
                        CEP: 30112-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Horário de Funcionamento</h4>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suporte Rápido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Chat Online</h4>
                      <p className="text-sm text-muted-foreground">Disponível 24/7</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Iniciar Chat
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Assuntos Mais Comuns</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Como encontrar um prestador</li>
                      <li>• Problemas com pagamento</li>
                      <li>• Como se tornar prestador</li>
                      <li>• Cancelamento de serviços</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Qual o tempo de resposta para emails?</h3>
                <p className="text-muted-foreground">
                  Respondemos todos os emails em até 24 horas durante dias úteis. 
                  Para urgências, use o chat online ou telefone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso agendar uma reunião presencial?</h3>
                <p className="text-muted-foreground">
                  Sim, para assuntos específicos ou parcerias, podemos agendar uma reunião presencial 
                  em nosso escritório em Belo Horizonte. Entre em contato para agendar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Vocês atendem em outras cidades?</h3>
                <p className="text-muted-foreground">
                  Atualmente nosso atendimento presencial é em Belo Horizonte, mas atendemos 
                  clientes de todo o Brasil através de nossos canais digitais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como posso reportar um problema com um prestador?</h3>
                <p className="text-muted-foreground">
                  Use o formulário de contato selecionando "Dúvidas sobre Prestadores" ou 
                  entre em contato diretamente pelo telefone. Investigamos todas as denúncias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Siga-nos nas Redes Sociais</h2>
            <p className="text-muted-foreground mb-8">
              Acompanhe nossas novidades e dicas para prestadores e clientes.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg">
                Facebook
              </Button>
              <Button variant="outline" size="lg">
                Instagram
              </Button>
              <Button variant="outline" size="lg">
                LinkedIn
              </Button>
              <Button variant="outline" size="lg">
                YouTube
              </Button>
            </div>
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
                <span className="text-xl font-bold text-primary">s</span>
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
