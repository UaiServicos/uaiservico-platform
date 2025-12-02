import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Users } from "lucide-react"
import Link from "next/link"

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiços</span>
              </div>
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
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Política de <span className="text-primary">Privacidade</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Sua privacidade é nossa prioridade. Saiba como coletamos, usamos e protegemos seus dados.
          </p>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  1. Informações que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1.1 Informações Pessoais</h4>
                  <p className="text-muted-foreground">
                    Coletamos informações que você nos fornece diretamente, incluindo:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Nome completo, e-mail e telefone</li>
                    <li>Endereço e localização</li>
                    <li>Informações de perfil profissional (para prestadores)</li>
                    <li>Fotos e descrições de serviços</li>
                    <li>Histórico de transações e avaliações</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">1.2 Informações Técnicas</h4>
                  <p className="text-muted-foreground">
                    Coletamos automaticamente informações sobre seu uso da plataforma:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Endereço IP e dados de localização</li>
                    <li>Tipo de dispositivo e navegador</li>
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  2. Como Usamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Conectar clientes e prestadores de serviços</li>
                  <li>Processar pagamentos e transações</li>
                  <li>Enviar comunicações importantes sobre sua conta</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Prevenir fraudes e garantir a segurança</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Realizar análises para melhorar nossos serviços</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  3. Compartilhamento de Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">3.1 Com Outros Usuários</h4>
                  <p className="text-muted-foreground">
                    Compartilhamos informações do seu perfil público com outros usuários para facilitar a conexão entre clientes e prestadores.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">3.2 Com Terceiros</h4>
                  <p className="text-muted-foreground">
                    Podemos compartilhar suas informações com:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Provedores de serviços de pagamento</li>
                    <li>Serviços de análise e marketing</li>
                    <li>Autoridades legais quando exigido por lei</li>
                    <li>Parceiros comerciais com seu consentimento</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  4. Segurança dos Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Auditorias regulares de segurança</li>
                  <li>Treinamento de funcionários sobre proteção de dados</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Embora nos esforcemos para proteger suas informações, nenhum sistema é 100% seguro. 
                  Recomendamos que você também tome precauções para proteger suas informações pessoais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  5. Seus Direitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  De acordo com a LGPD, você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Acesso:</strong> Solicitar informações sobre o tratamento de seus dados</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Exclusão:</strong> Solicitar a eliminação de dados desnecessários</li>
                  <li><strong>Portabilidade:</strong> Solicitar a transferência de dados para outro fornecedor</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
                  <li><strong>Revogação:</strong> Revogar o consentimento a qualquer momento</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Para exercer seus direitos, entre em contato conosco através do e-mail: 
                  <a href="mailto:contato.uaiservicos@gmail.com" className="text-primary hover:underline ml-1">
                    contato.uaiservicos@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Manter você conectado à sua conta</li>
                  <li>Lembrar suas preferências</li>
                  <li>Personalizar conteúdo e anúncios</li>
                  <li>Analisar o uso da plataforma</li>
                  <li>Melhorar a segurança</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Fornecer nossos serviços</li>
                  <li>Cumprir obrigações legais</li>
                  <li>Resolver disputas</li>
                  <li>Fazer cumprir nossos acordos</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Quando você exclui sua conta, removemos suas informações pessoais, 
                  exceto quando a retenção for necessária por motivos legais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Alterações nesta Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, 
                  notificaremos você por e-mail ou através de um aviso em nossa plataforma.
                </p>
                <p className="text-muted-foreground">
                  Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos suas informações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, 
                  entre em contato conosco:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold">UaiServiços</p>
                  <p className="text-muted-foreground">E-mail geral: contato.uaiservicos@gmail.com</p>
                </div>
              </CardContent>
            </Card>

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
                <li><Link href="/politica-privacidade" className="hover:text-foreground">Política de Privacidade</Link></li>
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