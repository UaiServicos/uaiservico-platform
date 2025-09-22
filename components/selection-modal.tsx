"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Search, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectionModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  placeholder: string
  searchPlaceholder: string
  options: Array<{ value: string; label: string }>
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  maxSelections?: number
}

export function SelectionModal({
  isOpen,
  onClose,
  title,
  placeholder,
  searchPlaceholder,
  options,
  selectedValues,
  onSelectionChange,
  maxSelections
}: SelectionModalProps) {
  const [search, setSearch] = useState('')
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues)

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedValues)
      setSearch('')
    }
  }, [isOpen, selectedValues])

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleToggle = (value: string) => {
    if (tempSelected.includes(value)) {
      setTempSelected(prev => prev.filter(v => v !== value))
    } else {
      if (maxSelections && tempSelected.length >= maxSelections) {
        return
      }
      setTempSelected(prev => [...prev, value])
    }
  }

  const handleSave = () => {
    onSelectionChange(tempSelected)
    onClose()
  }

  const handleRemove = (value: string) => {
    setTempSelected(prev => prev.filter(v => v !== value))
  }

  const getSelectedLabels = () => {
    return tempSelected.map(value => {
      const option = options.find(opt => opt.value === value)
      return option?.label || value
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          {/* Barra de busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Itens selecionados */}
          {tempSelected.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Selecionados ({tempSelected.length})
              </h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {getSelectedLabels().map((label, index) => (
                  <Badge key={tempSelected[index]} variant="secondary" className="flex items-center gap-1">
                    {label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full p-0.5"
                      onClick={() => handleRemove(tempSelected[index])}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Lista de opções */}
          <div className="flex-1 min-h-0">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Opções Disponíveis
            </h4>
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredOptions.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    Nenhuma opção encontrada
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = tempSelected.includes(option.value)
                    const isDisabled = !isSelected && maxSelections && tempSelected.length >= maxSelections
                    
                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors",
                          isSelected 
                            ? "bg-primary/10 border border-primary/20" 
                            : "hover:bg-muted/50",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => !isDisabled && handleToggle(option.value)}
                      >
                        <span className="text-sm">{option.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Contador de seleções */}
          {maxSelections && (
            <div className="text-sm text-muted-foreground text-center">
              {tempSelected.length} de {maxSelections} selecionados
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar ({tempSelected.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

