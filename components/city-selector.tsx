"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const BRAZILIAN_CITIES = [
  { value: "sao-paulo-sp", label: "São Paulo, SP" },
  { value: "rio-de-janeiro-rj", label: "Rio de Janeiro, RJ" },
  { value: "belo-horizonte-mg", label: "Belo Horizonte, MG" },
  { value: "brasilia-df", label: "Brasília, DF" },
  { value: "salvador-ba", label: "Salvador, BA" },
  { value: "fortaleza-ce", label: "Fortaleza, CE" },
  { value: "curitiba-pr", label: "Curitiba, PR" },
  { value: "recife-pe", label: "Recife, PE" },
  { value: "porto-alegre-rs", label: "Porto Alegre, RS" },
  { value: "manaus-am", label: "Manaus, AM" },
  { value: "contagem-mg", label: "Contagem, MG" },
  { value: "nova-lima-mg", label: "Nova Lima, MG" },
  { value: "itabira-mg", label: "Itabira, MG" },
  { value: "uberlandia-mg", label: "Uberlândia, MG" },
  { value: "juiz-de-fora-mg", label: "Juiz de Fora, MG" },
  { value: "ouro-preto-mg", label: "Ouro Preto, MG" },
  { value: "diamantina-mg", label: "Diamantina, MG" },
  { value: "caxias-do-sul-rs", label: "Caxias do Sul, RS" },
  { value: "gramado-rs", label: "Gramado, RS" },
  { value: "petropolis-rj", label: "Petrópolis, RJ" },
  { value: "niteroi-rj", label: "Niterói, RJ" },
  { value: "campinas-sp", label: "Campinas, SP" },
  { value: "ribeirao-preto-sp", label: "Ribeirão Preto, SP" },
  { value: "sao-jose-dos-campos-sp", label: "São José dos Campos, SP" },
  { value: "goiania-go", label: "Goiânia, GO" },
  { value: "cuiaba-mt", label: "Cuiabá, MT" },
  { value: "palmas-to", label: "Palmas, TO" },
  { value: "florianopolis-sc", label: "Florianópolis, SC" },
  { value: "joinville-sc", label: "Joinville, SC" },
  { value: "vitoria-es", label: "Vitória, ES" },
  { value: "campo-grande-ms", label: "Campo Grande, MS" },
  { value: "teresina-pi", label: "Teresina, PI" },
  { value: "maceio-al", label: "Maceió, AL" },
  { value: "aracaju-se", label: "Aracaju, SE" },
  { value: "natal-rn", label: "Natal, RN" },
  { value: "joao-pessoa-pb", label: "João Pessoa, PB" },
  { value: "sao-luis-ma", label: "São Luís, MA" },
  { value: "belem-pa", label: "Belém, PA" },
  { value: "porto-velho-ro", label: "Porto Velho, RO" },
  { value: "rio-branco-ac", label: "Rio Branco, AC" },
  { value: "boa-vista-rr", label: "Boa Vista, RR" },
  { value: "macapa-ap", label: "Macapá, AP" },
]

interface CitySelectorProps {
  selectedCities: string[]
  onCitiesChange: (cities: string[]) => void
  placeholder?: string
}

export function CitySelector({ selectedCities, onCitiesChange, placeholder = "Selecione as cidades..." }: CitySelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const handleSelect = (cityValue: string) => {
    if (selectedCities.includes(cityValue)) {
      onCitiesChange(selectedCities.filter(c => c !== cityValue))
    } else {
      onCitiesChange([...selectedCities, cityValue])
    }
  }

  const removeCity = (cityValue: string) => {
    onCitiesChange(selectedCities.filter(c => c !== cityValue))
  }

  const getSelectedCityLabels = () => {
    return selectedCities.map(value => {
      const city = BRAZILIAN_CITIES.find(c => c.value === value)
      return city ? city.label : value
    })
  }

  const filteredCities = BRAZILIAN_CITIES.filter(city =>
    city.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10"
          >
            {selectedCities.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {getSelectedCityLabels().map((cityLabel, index) => (
                  <Badge key={selectedCities[index]} variant="secondary" className="flex items-center gap-1">
                    {cityLabel}
                    <X
                      className="h-3 w-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCity(selectedCities[index])
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start" forceMount>
          <div className="p-3 border-b">
            <Input
              placeholder="Buscar cidades..."
              className="h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-64">
            <div className="p-2">
              {filteredCities.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">Nenhuma cidade encontrada.</p>
              ) : (
                filteredCities.map((city) => (
                  <div
                    key={city.value}
                    className="flex items-center p-2 cursor-pointer hover:bg-muted rounded-sm"
                    onClick={() => handleSelect(city.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCities.includes(city.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.label}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}