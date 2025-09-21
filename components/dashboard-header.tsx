"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, LogIn, LogOut } from "lucide-react"

interface DashboardHeaderProps {
  isLoggedIn: boolean
  user: any
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedCity: string
  setSelectedCity: (city: string) => void
  onProfileClick: () => void
  onLoginClick: () => void
  onLogoutClick: () => void
}

export function DashboardHeader({
  isLoggedIn,
  user,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  onProfileClick,
  onLoginClick,
  onLogoutClick
}: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold text-primary">UaiServiço</span>
            </div>
            <Badge variant="secondary">Cliente</Badge>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar prestadores, serviços ou localização..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
                  <SelectItem value="encanamento">Encanamento</SelectItem>
                  <SelectItem value="construcao">Construção</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="jardinagem">Jardinagem</SelectItem>
                  <SelectItem value="pintura">Pintura</SelectItem>
                  <SelectItem value="marcenaria">Marcenaria</SelectItem>
                  <SelectItem value="mecanica">Mecânica</SelectItem>
                  <SelectItem value="costura">Costura</SelectItem>
                  <SelectItem value="culinaria">Culinária</SelectItem>
                  <SelectItem value="cuidados-infantis">Cuidados Infantis</SelectItem>
                  <SelectItem value="cuidados-pets">Cuidados com Pets</SelectItem>
                  <SelectItem value="informatica">Informática</SelectItem>
                  <SelectItem value="refrigeracao">Refrigeração</SelectItem>
                  <SelectItem value="solda">Solda</SelectItem>
                  <SelectItem value="paisagismo">Paisagismo</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="frete">Frete</SelectItem>
                  <SelectItem value="mudancas">Mudanças</SelectItem>
                  <SelectItem value="chaveiro">Chaveiro</SelectItem>
                  <SelectItem value="estetica">Estética</SelectItem>
                  <SelectItem value="massagem">Massagem</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
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
          </div>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" onClick={onLogoutClick}>
                  <LogOut className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <Button onClick={onLoginClick}>
                <LogIn className="w-4 h-4 mr-2" />
                Fazer Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}