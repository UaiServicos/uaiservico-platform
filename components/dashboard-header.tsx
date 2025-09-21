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
            <Badge variant="secondary">Dashboard</Badge>
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
                  <SelectItem value="pedreiro">Pedreiro</SelectItem>
                  <SelectItem value="eletricista">Eletricista</SelectItem>
                  <SelectItem value="diarista">Diarista</SelectItem>
                  <SelectItem value="encanador">Encanador</SelectItem>
                  <SelectItem value="pintor">Pintor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="savassi">Savassi</SelectItem>
                  <SelectItem value="funcionários">Funcionários</SelectItem>
                  <SelectItem value="pampulha">Pampulha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" onClick={onProfileClick}>
                  <User className="w-4 h-4" />
                </Button>
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