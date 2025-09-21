"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { toast } from "sonner"

interface AvatarUploadProps {
  currentAvatar?: string
  userName?: string
  onAvatarChange?: (avatar: string) => void
}

export function AvatarUpload({ currentAvatar, userName, onAvatarChange }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState(currentAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 5MB.")
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Apenas imagens são permitidas.")
      return
    }

    try {
      setUploading(true)
      const base64 = await convertToBase64(file)
      
      setPreviewAvatar(base64)
      
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ avatar: base64 })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Foto atualizada com sucesso!")
        onAvatarChange?.(base64)
      } else {
        console.error('Upload error:', data)
        setPreviewAvatar(currentAvatar)
        toast.error(data.error || "Erro ao atualizar foto")
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      setPreviewAvatar(currentAvatar)
      toast.error("Erro ao fazer upload da foto")
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={previewAvatar || currentAvatar} />
        <AvatarFallback className="text-lg">
          {userName?.split(' ').map(n => n[0]).join('') || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="cursor-pointer hover:bg-accent"
        >
          <Camera className="w-4 h-4 mr-2" />
          {uploading ? "Enviando..." : "Alterar Foto"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          JPG, PNG ou GIF (máx. 5MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}