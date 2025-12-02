import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, MessageCircle, Phone, Mail, FileText, Users, Settings, CreditCard, Shield } from "lucide-react"
import Link from "next/link"

export default function CentralAjudaPage() {
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
            Central de <span className="text-primary">Ajuda</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas ou entre em contato conosco.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Digite sua dúvida ou palavra-chave..."
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias de Ajuda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Para Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Como encontrar um prestador</li>
                  <li>• Como avaliar um serviço</li>
                  <li>• Como entrar em contato</li>
                  <li>• Problemas com prestadores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-primary" />
                  Para Prestadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Como criar seu perfil</li>
                  <li>• Como gerenciar serviços</li>
                  <li>• Como receber clientes</li>
                  <li>• Problemas com pagamentos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Planos e Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Como escolher um plano</li>
                  <li>• Formas de pagamento</li>
                  <li>• Cancelamento de planos</li>
                  <li>• Reembolsos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Segurança e Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Proteção de dados</li>
                  <li>• Contas verificadas</li>
                  <li>• Denunciar problemas</li>
                  <li>• Termos de uso</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Conta e Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Criar conta</li>
                  <li>• Recuperar senha</li>
                  <li>• Editar perfil</li>
                  <li>• Excluir conta</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Problemas Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Site não carrega</li>
                  <li>• Problemas de login</li>
                  <li>• Erros de upload</li>
                  <li>• Problemas no app</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Mais Frequentes</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como posso confiar nos prestadores da plataforma?</h3>
                <p className="text-muted-foreground">
                  Todos os prestadores passam por um processo de verificação que inclui documentação, 
                  referências e avaliações de clientes anteriores. Além disso, você pode ver as 
                  avaliações e comentários de outros clientes antes de contratar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como funciona o pagamento dos serviços?</h3>
                <p className="text-muted-foreground">
                  O pagamento é feito diretamente entre você e o prestador. A UaiServiços facilita 
                  o contato e a negociação, mas não interfere na forma de pagamento escolhida pelas partes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso cancelar um serviço após contratar?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode cancelar um serviço a qualquer momento antes do início. 
                  Recomendamos entrar em contato com o prestador para discutir os detalhes do cancelamento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como posso me tornar um prestador?</h3>
                <p className="text-muted-foreground">
                  Para se tornar um prestador, você precisa criar uma conta, preencher seu perfil 
                  com informações detalhadas, adicionar seus serviços e aguardar a verificação. 
                  O processo é simples e gratuito.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Há algum custo para usar a plataforma como cliente?</h3>
                <p className="text-muted-foreground">
                  Não, o uso da plataforma é completamente gratuito para clientes. Você paga apenas 
                  pelo serviço contratado, diretamente ao prestador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como posso avaliar um prestador?</h3>
                <p className="text-muted-foreground">
                  Após a conclusão do serviço, você receberá um link para avaliar o prestador. 
                  Sua avaliação é importante para ajudar outros clientes a fazerem a melhor escolha.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ainda precisa de ajuda?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Chat Online</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Converse com nossa equipe de suporte em tempo real
                </p>
                <Button variant="outline" className="w-full">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Envie sua dúvida por email e receba resposta em até 24h
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contato">Enviar Email</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fale diretamente com nossa equipe de suporte
                </p>
                <Button variant="outline" className="w-full">
                  (31) 99999-9999
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Status Page */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Status da Plataforma</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">Sistema Online</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Todos os serviços funcionando</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">API Funcionando</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tempo de resposta normal</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: {new Date().toLocaleString('pt-BR')}
            </p>
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
