import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, Shield, Search } from "lucide-react"
import Link from "next/link"

export default function CadastroClientePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-primary">UaiServiço</span>
              </div>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Cadastre-se como <span className="text-primary">Cliente</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encontre os melhores prestadores de serviços da sua região
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6">
                <Search className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Busca Fácil</h3>
                <p className="text-sm text-muted-foreground">Encontre prestadores por categoria e localização</p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Perfis Verificados</h3>
                <p className="text-sm text-muted-foreground">Todos os prestadores são verificados e avaliados</p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Totalmente Gratuito</h3>
                <p className="text-sm text-muted-foreground">Use nossa plataforma sem pagar nada</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta de Cliente</CardTitle>
              <CardDescription>Preencha seus dados para começar a usar nossa plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input id="nome" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                  <Input id="telefone" placeholder="(31) 99999-9999" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <Input id="senha" type="password" placeholder="Mínimo 6 caracteres" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Senha *</Label>
                  <Input id="confirmar-senha" type="password" placeholder="Confirme sua senha" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                      <SelectItem value="contagem">Contagem</SelectItem>
                      <SelectItem value="betim">Betim</SelectItem>
                      <SelectItem value="nova-lima">Nova Lima</SelectItem>
                      <SelectItem value="ribeirao-das-neves">Ribeirão das Neves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" placeholder="Seu bairro" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="termos" />
                <Label htmlFor="termos" className="text-sm">
                  Aceito os{" "}
                  <Link href="#" className="text-primary hover:underline">
                    termos de uso
                  </Link>{" "}
                  e
                  <Link href="#" className="text-primary hover:underline">
                    {" "}
                    política de privacidade
                  </Link>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter" className="text-sm">
                  Quero receber ofertas e novidades por e-mail
                </Label>
              </div>

              <Button size="lg" className="w-full">
                Criar Minha Conta Gratuita
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
