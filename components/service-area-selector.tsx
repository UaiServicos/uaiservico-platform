"use client"

import { useState } from "react"
import { ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SelectionModal } from "@/components/selection-modal"

const SERVICE_AREAS = [
  { value: "eletrica", label: "Elétrica" },
  { value: "encanamento", label: "Encanamento" },
  { value: "construcao", label: "Construção" },
  { value: "pintura", label: "Pintura" },
  { value: "jardinagem", label: "Jardinagem" },
  { value: "limpeza", label: "Limpeza" },
  { value: "marcenaria", label: "Marcenaria" },
  { value: "serralheria", label: "Serralheria" },
  { value: "alvenaria", label: "Alvenaria" },
  { value: "azulejista", label: "Azulejista" },
  { value: "bombeiro-hidraulico", label: "Bombeiro Hidráulico" },
  { value: "carpinteiro", label: "Carpinteiro" },
  { value: "eletricista", label: "Eletricista" },
  { value: "encanador", label: "Encanador" },
  { value: "gesseiro", label: "Gesseiro" },
  { value: "impermeabilizador", label: "Impermeabilizador" },
  { value: "instalador-de-pisos", label: "Instalador de Pisos" },
  { value: "marceneiro", label: "Marceneiro" },
  { value: "pedreiro", label: "Pedreiro" },
  { value: "pintor", label: "Pintor" },
  { value: "serralheiro", label: "Serralheiro" },
  { value: "vidraceiro", label: "Vidraceiro" },
  { value: "jardineiro", label: "Jardineiro" },
  { value: "paisagista", label: "Paisagista" },
  { value: "limpador-de-piscina", label: "Limpador de Piscina" },
  { value: "faxineiro", label: "Faxineiro" },
  { value: "diarista", label: "Diarista" },
  { value: "limpeza-predial", label: "Limpeza Predial" },
  { value: "limpeza-pos-obra", label: "Limpeza Pós-Obra" },
  { value: "dedetizador", label: "Dedetizador" },
  { value: "desentupidor", label: "Desentupidor" },
  { value: "instalador-de-ar-condicionado", label: "Instalador de Ar Condicionado" },
  { value: "tecnico-em-refrigeracao", label: "Técnico em Refrigeração" },
  { value: "instalador-de-antena", label: "Instalador de Antena" },
  { value: "instalador-de-cerca-eletrica", label: "Instalador de Cerca Elétrica" },
  { value: "instalador-de-portao-automatico", label: "Instalador de Portão Automático" },
  { value: "instalador-de-alarme", label: "Instalador de Alarme" },
  { value: "instalador-de-camera", label: "Instalador de Câmera" },
  { value: "montador-de-moveis", label: "Montador de Móveis" },
  { value: "montador-de-cortina", label: "Montador de Cortina" },
  { value: "montador-de-persiana", label: "Montador de Persiana" },
  { value: "montador-de-quadro", label: "Montador de Quadro" },
  { value: "montador-de-espelho", label: "Montador de Espelho" },
  { value: "montador-de-televisao", label: "Montador de Televisão" },
  { value: "montador-de-ar-condicionado", label: "Montador de Ar Condicionado" },
  { value: "montador-de-ventilador", label: "Montador de Ventilador" },
  { value: "montador-de-lustre", label: "Montador de Lustre" },
  { value: "montador-de-luminaria", label: "Montador de Luminária" },
  { value: "montador-de-chuveiro", label: "Montador de Chuveiro" },
  { value: "montador-de-torneira", label: "Montador de Torneira" },
  { value: "montador-de-vaso-sanitario", label: "Montador de Vaso Sanitário" },
  { value: "montador-de-pia", label: "Montador de Pia" },
  { value: "montador-de-tanque", label: "Montador de Tanque" },
  { value: "montador-de-caixa-dagua", label: "Montador de Caixa d'Água" },
  { value: "montador-de-bomba", label: "Montador de Bomba" },
  { value: "montador-de-filtro", label: "Montador de Filtro" },
  { value: "montador-de-aquecedor", label: "Montador de Aquecedor" },
  { value: "montador-de-boiler", label: "Montador de Boiler" },
  { value: "montador-de-solar", label: "Montador de Solar" },
  { value: "montador-de-eolica", label: "Montador de Eólica" },
  { value: "montador-de-gerador", label: "Montador de Gerador" },
  { value: "montador-de-no-break", label: "Montador de No-Break" },
  { value: "montador-de-estabilizador", label: "Montador de Estabilizador" },
  { value: "montador-de-transformador", label: "Montador de Transformador" },
  { value: "montador-de-quadro-eletrico", label: "Montador de Quadro Elétrico" },
  { value: "montador-de-disjuntor", label: "Montador de Disjuntor" },
  { value: "montador-de-dimmer", label: "Montador de Dimmer" },
  { value: "montador-de-sensor", label: "Montador de Sensor" },
  { value: "montador-de-automacao", label: "Montador de Automação" },
  { value: "montador-de-domotica", label: "Montador de Domótica" },
  { value: "montador-de-smart-home", label: "Montador de Smart Home" },
  { value: "montador-de-iot", label: "Montador de IoT" },
  { value: "montador-de-wifi", label: "Montador de WiFi" },
  { value: "montador-de-bluetooth", label: "Montador de Bluetooth" },
  { value: "montador-de-zigbee", label: "Montador de Zigbee" },
  { value: "montador-de-z-wave", label: "Montador de Z-Wave" },
  { value: "montador-de-knx", label: "Montador de KNX" },
  { value: "montador-de-bacnet", label: "Montador de BACnet" },
  { value: "montador-de-modbus", label: "Montador de Modbus" },
  { value: "montador-de-profibus", label: "Montador de Profibus" },
  { value: "montador-de-devicenet", label: "Montador de DeviceNet" },
  { value: "montador-de-canbus", label: "Montador de CANbus" },
  { value: "montador-de-lonworks", label: "Montador de LonWorks" },
  { value: "montador-de-eib", label: "Montador de EIB" },
  { value: "montador-de-ehs", label: "Montador de EHS" },
  { value: "montador-de-bati-bus", label: "Montador de BatiBus" },
  { value: "montador-de-instabus", label: "Montador de InstaBus" },
  { value: "montador-de-bus-s1", label: "Montador de Bus S1" },
  { value: "montador-de-bus-s2", label: "Montador de Bus S2" },
  { value: "montador-de-bus-s3", label: "Montador de Bus S3" },
  { value: "montador-de-bus-s4", label: "Montador de Bus S4" },
  { value: "montador-de-bus-s5", label: "Montador de Bus S5" },
  { value: "montador-de-bus-s6", label: "Montador de Bus S6" },
  { value: "montador-de-bus-s7", label: "Montador de Bus S7" },
  { value: "montador-de-bus-s8", label: "Montador de Bus S8" },
  { value: "montador-de-bus-s9", label: "Montador de Bus S9" },
  { value: "montador-de-bus-s10", label: "Montador de Bus S10" }
]

interface ServiceAreaSelectorProps {
  selectedAreas: string[]
  onAreasChange: (areas: string[]) => void
  placeholder?: string
}

export function ServiceAreaSelector({ selectedAreas, onAreasChange, placeholder = "Selecione as áreas..." }: ServiceAreaSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getSelectedAreaLabels = () => {
    if (!Array.isArray(selectedAreas)) return []
    return selectedAreas.map(areaValue => {
      const area = SERVICE_AREAS.find(a => a.value === areaValue)
      return area?.label || areaValue
    })
  }

  const removeArea = (areaValue: string) => {
    if (!Array.isArray(selectedAreas)) return
    onAreasChange(selectedAreas.filter(a => a !== areaValue))
  }

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between min-h-[40px] h-auto"
        onClick={() => setIsModalOpen(true)}
      >
        {Array.isArray(selectedAreas) && selectedAreas.length > 0 ? (
          <div className="flex gap-1 overflow-x-auto max-w-full selector-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
            {getSelectedAreaLabels().map((areaLabel, index) => (
              <Badge key={selectedAreas[index]} variant="secondary" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0 min-w-fit">
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

      <SelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Selecionar Áreas de Atuação"
        placeholder="Selecione suas áreas de especialização..."
        searchPlaceholder="Buscar áreas..."
        options={SERVICE_AREAS}
        selectedValues={selectedAreas || []}
        onSelectionChange={onAreasChange}
      />
    </>
  )
}