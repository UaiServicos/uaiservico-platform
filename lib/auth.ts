export interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "client" | "provider"
  city: string
  neighborhood?: string
  avatar?: string
  createdAt: Date
}

export interface Provider extends User {
  type: "provider"
  services: string[]
  experience: string
  description?: string
  averagePrice?: string
  rating: number
  reviewCount: number
  subscriptionPlan: "basic" | "premium"
  subscriptionStatus: "active" | "inactive" | "trial"
  verified: boolean
}

export interface Client extends User {
  type: "client"
  preferences?: string[]
}

// Mock authentication functions - replace with real auth later
export function getCurrentUser(): User | null {
  // This would normally check session/token
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function login(email: string, password: string): Promise<User> {
  // Mock login - replace with real authentication
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user: User = {
          id: "1",
          name: "João Silva",
          email,
          phone: "(31) 99999-9999",
          type: "provider",
          city: "Belo Horizonte",
          neighborhood: "Centro",
          createdAt: new Date(),
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("currentUser", JSON.stringify(user))
        }
        resolve(user)
      } else {
        reject(new Error("Credenciais inválidas"))
      }
    }, 1000)
  })
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

export function registerClient(data: any): Promise<Client> {
  // Mock registration - replace with real API
  return new Promise((resolve) => {
    setTimeout(() => {
      const client: Client = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: "client",
        city: data.city,
        neighborhood: data.neighborhood,
        createdAt: new Date(),
      }
      resolve(client)
    }, 1000)
  })
}

export function registerProvider(data: any): Promise<Provider> {
  // Mock registration - replace with real API
  return new Promise((resolve) => {
    setTimeout(() => {
      const provider: Provider = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: "provider",
        city: data.city,
        neighborhood: data.neighborhood,
        services: [data.service],
        experience: data.experience,
        description: data.description,
        averagePrice: data.price,
        rating: 0,
        reviewCount: 0,
        subscriptionPlan: "basic",
        subscriptionStatus: "trial",
        verified: false,
        createdAt: new Date(),
      }
      resolve(provider)
    }, 1000)
  })
}
