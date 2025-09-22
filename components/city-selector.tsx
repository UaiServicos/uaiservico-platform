"use client"

import { useState } from "react"
import { ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SelectionModal } from "@/components/selection-modal"

const MINAS_GERAIS_CITIES = [
  { value: "belo-horizonte-mg", label: "Belo Horizonte, MG" },
  { value: "contagem-mg", label: "Contagem, MG" },
  { value: "uberlandia-mg", label: "Uberlândia, MG" },
  { value: "juiz-de-fora-mg", label: "Juiz de Fora, MG" },
  { value: "betim-mg", label: "Betim, MG" },
  { value: "montes-claros-mg", label: "Montes Claros, MG" },
  { value: "ribeirao-das-neves-mg", label: "Ribeirão das Neves, MG" },
  { value: "uberaba-mg", label: "Uberaba, MG" },
  { value: "governador-valadares-mg", label: "Governador Valadares, MG" },
  { value: "ipatinga-mg", label: "Ipatinga, MG" },
  { value: "santa-luzia-mg", label: "Santa Luzia, MG" },
  { value: "sete-lagoas-mg", label: "Sete Lagoas, MG" },
  { value: "divinopolis-mg", label: "Divinópolis, MG" },
  { value: "ibirite-mg", label: "Ibirité, MG" },
  { value: "sabara-mg", label: "Sabará, MG" },
  { value: "ribeirao-das-neves-mg", label: "Ribeirão das Neves, MG" },
  { value: "varginha-mg", label: "Varginha, MG" },
  { value: "pouso-alegre-mg", label: "Pouso Alegre, MG" },
  { value: "ubá-mg", label: "Ubá, MG" },
  { value: "passos-mg", label: "Passos, MG" },
  { value: "consolacao-mg", label: "Consolação, MG" },
  { value: "patos-de-minas-mg", label: "Patos de Minas, MG" },
  { value: "araxa-mg", label: "Araxá, MG" },
  { value: "lagoa-santa-mg", label: "Lagoa Santa, MG" },
  { value: "itapecerica-mg", label: "Itapecerica, MG" },
  { value: "nova-serra-mg", label: "Nova Serrana, MG" },
  { value: "formiga-mg", label: "Formiga, MG" },
  { value: "paracatu-mg", label: "Paracatu, MG" },
  { value: "timoteo-mg", label: "Timóteo, MG" },
  { value: "coronel-fabriciano-mg", label: "Coronel Fabriciano, MG" },
  { value: "santa-barbara-mg", label: "Santa Bárbara, MG" },
  { value: "itauna-mg", label: "Itaúna, MG" },
  { value: "sao-joao-del-rei-mg", label: "São João del Rei, MG" },
  { value: "lavras-mg", label: "Lavras, MG" },
  { value: "pocos-de-caldas-mg", label: "Poços de Caldas, MG" },
  { value: "vazante-mg", label: "Vazante, MG" },
  { value: "matozinhos-mg", label: "Matozinhos, MG" },
  { value: "sabara-mg", label: "Sabará, MG" },
  { value: "nova-lima-mg", label: "Nova Lima, MG" },
  { value: "caete-mg", label: "Caeté, MG" },
  { value: "rio-acima-mg", label: "Rio Acima, MG" },
  { value: "raposos-mg", label: "Raposos, MG" },
  { value: "santa-barbara-mg", label: "Santa Bárbara, MG" },
  { value: "barroso-mg", label: "Barroso, MG" },
  { value: "congonhas-mg", label: "Congonhas, MG" },
  { value: "ouro-preto-mg", label: "Ouro Preto, MG" },
  { value: "mariana-mg", label: "Mariana, MG" },
  { value: "ponte-nova-mg", label: "Ponte Nova, MG" },
  { value: "caratinga-mg", label: "Caratinga, MG" },
  { value: "manhuacu-mg", label: "Manhuaçu, MG" },
  { value: "muriaé-mg", label: "Muriaé, MG" },
  { value: "leopoldina-mg", label: "Leopoldina, MG" },
  { value: "cataguases-mg", label: "Cataguases, MG" },
  { value: "visconde-do-rio-branco-mg", label: "Visconde do Rio Branco, MG" },
  { value: "uba-mg", label: "Ubá, MG" },
  { value: "sao-joao-nepomuceno-mg", label: "São João Nepomuceno, MG" },
  { value: "barbacena-mg", label: "Barbacena, MG" },
  { value: "sao-lourenco-mg", label: "São Lourenço, MG" },
  { value: "caxambu-mg", label: "Caxambu, MG" },
  { value: "baependi-mg", label: "Baependi, MG" },
  { value: "cambuquira-mg", label: "Cambuquira, MG" },
  { value: "lambari-mg", label: "Lambari, MG" },
  { value: "carmo-da-cachoeira-mg", label: "Carmo da Cachoeira, MG" },
  { value: "três-corações-mg", label: "Três Corações, MG" },
  { value: "eloi-mendes-mg", label: "Elói Mendes, MG" },
  { value: "paraisopolis-mg", label: "Paraisópolis, MG" },
  { value: "cambui-mg", label: "Cambuí, MG" },
  { value: "bom-sucesso-mg", label: "Bom Sucesso, MG" },
  { value: "lagoa-dourada-mg", label: "Lagoa Dourada, MG" },
  { value: "sao-tiago-mg", label: "São Tiago, MG" },
  { value: "sao-joao-del-rei-mg", label: "São João del Rei, MG" },
  { value: "tiradentes-mg", label: "Tiradentes, MG" },
  { value: "santa-cruz-de-minas-mg", label: "Santa Cruz de Minas, MG" },
  { value: "coronel-xavier-chaves-mg", label: "Coronel Xavier Chaves, MG" },
  { value: "ritapolis-mg", label: "Ritápolis, MG" },
  { value: "sao-vicente-de-minas-mg", label: "São Vicente de Minas, MG" },
  { value: "carrancas-mg", label: "Carrancas, MG" },
  { value: "luminarias-mg", label: "Luminárias, MG" },
  { value: "ingai-mg", label: "Ingaí, MG" },
  { value: "carmo-da-mata-mg", label: "Carmo da Mata, MG" },
  { value: "oliveira-mg", label: "Oliveira, MG" },
  { value: "santo-antonio-do-amparo-mg", label: "Santo Antônio do Amparo, MG" },
  { value: "sao-francisco-de-paula-mg", label: "São Francisco de Paula, MG" },
  { value: "candeias-mg", label: "Candeias, MG" },
  { value: "cristina-mg", label: "Cristina, MG" },
  { value: "dom-vicoso-mg", label: "Dom Viçoso, MG" },
  { value: "sao-sebastiao-do-rio-verde-mg", label: "São Sebastião do Rio Verde, MG" },
  { value: "carmo-da-mata-mg", label: "Carmo da Mata, MG" },
  { value: "oliveira-mg", label: "Oliveira, MG" },
  { value: "santo-antonio-do-amparo-mg", label: "Santo Antônio do Amparo, MG" },
  { value: "sao-francisco-de-paula-mg", label: "São Francisco de Paula, MG" },
  { value: "candeias-mg", label: "Candeias, MG" },
  { value: "cristina-mg", label: "Cristina, MG" },
  { value: "dom-vicoso-mg", label: "Dom Viçoso, MG" },
  { value: "sao-sebastiao-do-rio-verde-mg", label: "São Sebastião do Rio Verde, MG" }
]

interface CitySelectorProps {
  selectedCities: string[]
  onCitiesChange: (cities: string[]) => void
  placeholder?: string
}

export function CitySelector({ selectedCities, onCitiesChange, placeholder = "Selecione as cidades..." }: CitySelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getSelectedCityLabels = () => {
    if (!Array.isArray(selectedCities)) return []
    return selectedCities.map(cityValue => {
      const city = MINAS_GERAIS_CITIES.find(c => c.value === cityValue)
      return city?.label || cityValue
    })
  }

  const removeCity = (cityValue: string) => {
    if (!Array.isArray(selectedCities)) return
    onCitiesChange(selectedCities.filter(c => c !== cityValue))
  }

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between min-h-[40px] h-auto"
        onClick={() => setIsModalOpen(true)}
      >
        {Array.isArray(selectedCities) && selectedCities.length > 0 ? (
          <div className="flex gap-1 overflow-x-auto max-w-full selector-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
            {getSelectedCityLabels().map((cityLabel, index) => (
              <Badge key={selectedCities[index]} variant="secondary" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0 min-w-fit">
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

      <SelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Selecionar Cidades"
        placeholder="Selecione as cidades onde você atende..."
        searchPlaceholder="Buscar cidades..."
        options={MINAS_GERAIS_CITIES}
        selectedValues={selectedCities || []}
        onSelectionChange={onCitiesChange}
      />
    </>
  )
}