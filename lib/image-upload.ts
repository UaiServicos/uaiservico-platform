export interface UploadedImage {
  id: string
  url: string
  filename: string
  size: number
  uploadedAt: Date
}

export function uploadImage(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      reject(new Error("Apenas arquivos de imagem são permitidos"))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Arquivo muito grande. Máximo 5MB"))
      return
    }

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would upload to a cloud service
      const reader = new FileReader()
      reader.onload = (e) => {
        const uploadedImage: UploadedImage = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          filename: file.name,
          size: file.size,
          uploadedAt: new Date(),
        }
        resolve(uploadedImage)
      }
      reader.onerror = () => reject(new Error("Erro ao processar imagem"))
      reader.readAsDataURL(file)
    }, 1000)
  })
}

export function uploadMultipleImages(files: FileList): Promise<UploadedImage[]> {
  const fileArray = Array.from(files)
  const uploadPromises = fileArray.map((file) => uploadImage(file))
  return Promise.all(uploadPromises)
}

export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Apenas arquivos de imagem são permitidos"
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Arquivo muito grande. Máximo 5MB"
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    return "Formato não suportado. Use JPEG, PNG ou WebP"
  }

  return null
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
