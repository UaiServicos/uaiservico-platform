"use client"

import { useState } from "react"
import { ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SelectionModal } from "@/components/selection-modal"

const MINAS_GERAIS_CITIES = [
  { value: "coronel-xavier-chaves-mg", label: "Coronel Xavier Chaves, MG" },
  { value: "lagoa-dourada-mg", label: "Lagoa Dourada, MG" },
  { value: "resende-costa-mg", label: "Resende Costa, MG" },
  { value: "ritapolis-mg", label: "Ritápolis, MG" },
  { value: "santa-cruz-de-minas-mg", label: "Santa Cruz de Minas, MG" },
  { value: "sao-tiago-mg", label: "São Tiago, MG" },
  { value: "sao-joao-del-rei-mg", label: "São João del Rei, MG" },
  { value: "tiradentes-mg", label: "Tiradentes, MG" }
];

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