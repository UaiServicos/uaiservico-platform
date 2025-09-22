import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, User, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TermosUsoPage() {
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
            Termos de <span className="text-primary">Uso</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Conheça os termos e condições que regem o uso da nossa plataforma.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Última atualização: 01/01/2024</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Versão 1.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
                <p className="text-muted-foreground mb-4">
                  Bem-vindo à UaiServiço! Estes Termos de Uso ("Termos") regem o uso da nossa plataforma 
                  de serviços online. Ao acessar ou usar nossa plataforma, você concorda em cumprir 
                  estes termos.
                </p>
                <p className="text-muted-foreground">
                  A UaiServiço é uma plataforma que conecta clientes a prestadores de serviços locais, 
                  facilitando a contratação de serviços diversos em sua região.
                </p>
              </CardContent>
            </Card>

            {/* Definitions */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Definições</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">"Plataforma"</h3>
                    <p>Refere-se ao site, aplicativo e todos os serviços oferecidos pela UaiServiço.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">"Cliente"</h3>
                    <p>Usuário que busca e contrata serviços através da plataforma.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">"Prestador"</h3>
                    <p>Usuário que oferece serviços através da plataforma.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">"Serviço"</h3>
                    <p>Qualquer trabalho ou atividade oferecida por um prestador na plataforma.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Responsabilidades do Usuário</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Informações Verídicas</h3>
                      <p className="text-muted-foreground">
                        Você deve fornecer informações verdadeiras e atualizadas ao criar sua conta 
                        e ao usar a plataforma.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Segurança da Conta</h3>
                      <p className="text-muted-foreground">
                        Você é responsável por manter a segurança de sua conta e senha, 
                        e por todas as atividades que ocorram em sua conta.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Uso Adequado</h3>
                      <p className="text-muted-foreground">
                        Você concorda em usar a plataforma apenas para fins legais e de acordo 
                        com estes termos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Terms */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Termos dos Serviços</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A UaiServiço atua como intermediária entre clientes e prestadores. Não somos 
                    responsáveis pela qualidade, segurança ou legalidade dos serviços prestados.
                  </p>
                  <p>
                    O pagamento pelos serviços é feito diretamente entre cliente e prestador. 
                    A UaiServiço não interfere na negociação de preços ou formas de pagamento.
                  </p>
                  <p>
                    Recomendamos que clientes e prestadores estabeleçam contratos claros antes 
                    do início dos serviços.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Usos Proibidos</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>É proibido usar a plataforma para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Atividades ilegais ou fraudulentas</li>
                    <li>Spam ou comunicações não solicitadas</li>
                    <li>Violar direitos de propriedade intelectual</li>
                    <li>Transmitir vírus ou códigos maliciosos</li>
                    <li>Interferir no funcionamento da plataforma</li>
                    <li>Criar contas falsas ou duplicadas</li>
                    <li>Oferecer serviços perigosos ou inadequados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Privacidade e Dados</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Respeitamos sua privacidade e protegemos seus dados pessoais de acordo com 
                    nossa Política de Privacidade e a LGPD.
                  </p>
                  <p>
                    Coletamos apenas os dados necessários para o funcionamento da plataforma 
                    e melhorar nossos serviços.
                  </p>
                  <p>
                    Você pode solicitar a exclusão de seus dados a qualquer momento, 
                    respeitando as obrigações legais de retenção.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Limitação de Responsabilidade</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A UaiServiço não se responsabiliza por danos diretos, indiretos, incidentais 
                    ou consequenciais resultantes do uso da plataforma.
                  </p>
                  <p>
                    Não garantimos a disponibilidade contínua da plataforma ou a ausência de erros.
                  </p>
                  <p>
                    Nossa responsabilidade está limitada ao valor pago pelos serviços da plataforma 
                    nos últimos 12 meses.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Rescisão</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Você pode encerrar sua conta a qualquer momento através das configurações 
                    da plataforma.
                  </p>
                  <p>
                    Podemos suspender ou encerrar sua conta se você violar estes termos ou 
                    por outras razões legítimas.
                  </p>
                  <p>
                    O encerramento da conta não afeta as obrigações existentes entre clientes 
                    e prestadores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Alterações nos Termos</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Podemos alterar estes termos a qualquer momento. As alterações serão 
                    comunicadas através da plataforma.
                  </p>
                  <p>
                    O uso continuado da plataforma após as alterações constitui aceitação 
                    dos novos termos.
                  </p>
                  <p>
                    Se você não concordar com as alterações, deve encerrar sua conta.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Lei Aplicável</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
                    resolvida nos tribunais competentes de Belo Horizonte, MG.
                  </p>
                  <p>
                    Em caso de conflito entre versões em diferentes idiomas, a versão em 
                    português prevalecerá.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. Contato</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Para dúvidas sobre estes termos, entre em contato conosco:
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@uaiservico.com.br</p>
                    <p><strong>Telefone:</strong> (31) 99999-9999</p>
                    <p><strong>Endereço:</strong> Rua das Flores, 123 - Savassi, Belo Horizonte - MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Acceptance Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Aceitação dos Termos</h2>
            <p className="text-muted-foreground mb-8">
              Ao usar nossa plataforma, você confirma que leu, entendeu e concorda com estes 
              Termos de Uso. Se você não concorda com qualquer parte destes termos, 
              não deve usar nossa plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/cadastro-cliente">Concordo - Sou Cliente</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cadastro-prestador">Concordo - Sou Prestador</Link>
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
