"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const SERVICE_AREAS = [
  { value: "eletrica", label: "Elétrica" },
  { value: "encanamento", label: "Encanamento" },
  { value: "construcao", label: "Construção" },
  { value: "limpeza", label: "Limpeza" },
  { value: "jardinagem", label: "Jardinagem" },
  { value: "pintura", label: "Pintura" },
  { value: "marcenaria", label: "Marcenaria" },
  { value: "mecanica", label: "Mecânica" },
  { value: "costura", label: "Costura" },
  { value: "culinaria", label: "Culinária" },
  { value: "cuidados-infantis", label: "Cuidados Infantis" },
  { value: "cuidados-pets", label: "Cuidados com Pets" },
  { value: "informatica", label: "Informática" },
  { value: "refrigeracao", label: "Refrigeração" },
  { value: "solda", label: "Solda" },
  { value: "paisagismo", label: "Paisagismo" },
  { value: "seguranca", label: "Segurança" },
  { value: "frete", label: "Frete" },
  { value: "mudancas", label: "Mudanças" },
  { value: "chaveiro", label: "Chaveiro" },
  { value: "estetica", label: "Estética" },
  { value: "massagem", label: "Massagem" },
  { value: "saude", label: "Saúde" },
  { value: "educacao", label: "Educação" },
]

interface ServiceAreaSelectorProps {
  selectedAreas: string[]
  onAreasChange: (areas: string[]) => void
  placeholder?: string
}

export function ServiceAreaSelector({ selectedAreas, onAreasChange, placeholder = "Selecione as áreas..." }: ServiceAreaSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const handleSelect = (areaValue: string) => {
    if (selectedAreas.includes(areaValue)) {
      onAreasChange(selectedAreas.filter(a => a !== areaValue))
    } else {
      onAreasChange([...selectedAreas, areaValue])
    }
  }

  const removeArea = (areaValue: string) => {
    onAreasChange(selectedAreas.filter(a => a !== areaValue))
  }

  const getSelectedAreaLabels = () => {
    return selectedAreas.map(value => {
      const area = SERVICE_AREAS.find(a => a.value === value)
      return area ? area.label : value
    })
  }

  const filteredAreas = SERVICE_AREAS.filter(area =>
    area.label.toLowerCase().includes(search.toLowerCase())
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
            {selectedAreas.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {getSelectedAreaLabels().map((areaLabel, index) => (
                  <Badge key={selectedAreas[index]} variant="secondary" className="flex items-center gap-1">
                    {areaLabel}
                    <X
                      className="h-3 w-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeArea(selectedAreas[index])
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
              placeholder="Buscar áreas..."
              className="h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-64">
            <div className="p-2">
              {filteredAreas.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">Nenhuma área encontrada.</p>
              ) : (
                filteredAreas.map((area) => (
                  <div
                    key={area.value}
                    className="flex items-center p-2 cursor-pointer hover:bg-muted rounded-sm"
                    onClick={() => handleSelect(area.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedAreas.includes(area.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {area.label}
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