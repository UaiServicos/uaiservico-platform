'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, X } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUpload({ 
  onImagesChange, 
  maxImages = 4, 
  className = '' 
}: ImageUploadProps) {
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newImages: string[] = []
    
    Array.from(files).forEach((file) => {
      if (images.length + newImages.length >= maxImages) {
        toast.error(`Máximo de ${maxImages} imagens permitidas`)
        return
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Apenas arquivos de imagem são permitidos')
        return
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('Imagem muito grande. Máximo 5MB por imagem.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        newImages.push(result)
        
        if (newImages.length === Array.from(files).length) {
          const updatedImages = [...images, ...newImages]
          setImages(updatedImages)
          onImagesChange(updatedImages)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0"
              onClick={() => removeImage(index)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      {images.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Camera className="w-4 h-4 mr-2" />
            Adicionar Fotos ({images.length}/{maxImages})
          </Button>
        </div>
      )}
    </div>
  )
}