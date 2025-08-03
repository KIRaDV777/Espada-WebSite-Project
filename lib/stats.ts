// Simulation de données réelles - remplacer par des appels API réels
export interface DashboardStats {
  totalDownloads: number
  activeUsers: number
  revenue: number
  avgRating: number
  monthlyGrowth: number
  dailyDownloads: Array<{ date: string; downloads: number }>
  topApplications: Array<{ name: string; downloads: number; revenue: number }>
  userGrowth: Array<{ month: string; users: number }>
  revenueByPlan: Array<{ plan: string; revenue: number; percentage: number }>
}

export async function getDashboardStats(): Promise<DashboardStats> {
  // Simulation d'un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 100))

  const now = new Date()
  const dailyDownloads = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now)
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toISOString().split("T")[0],
      downloads: Math.floor(Math.random() * 500) + 200,
    }
  })

  const userGrowth = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() - (11 - i))
    return {
      month: date.toLocaleDateString("fr-FR", { month: "short" }),
      users: Math.floor(Math.random() * 1000) + 500 + i * 100,
    }
  })

  return {
    totalDownloads: 18742,
    activeUsers: 4156,
    revenue: 127350,
    avgRating: 4.8,
    monthlyGrowth: 15.3,
    dailyDownloads,
    topApplications: [
      { name: "Optimiseur de Ping", downloads: 6420, revenue: 45200 },
      { name: "Panel IPTV Pro", downloads: 5120, revenue: 38900 },
      { name: "Gestionnaire de Pharmacie", downloads: 4240, revenue: 32100 },
      { name: "Facturation Express", downloads: 2962, revenue: 11150 },
    ],
    userGrowth,
    revenueByPlan: [
      { plan: "Gratuit", revenue: 0, percentage: 45 },
      { plan: "Pro", revenue: 89250, percentage: 35 },
      { plan: "Entreprise", revenue: 38100, percentage: 20 },
    ],
  }
}

export interface Service {
  id: number
  name: string
  description: string
  status: "active" | "maintenance" | "inactive"
  uptime: number
  responseTime: number
  lastCheck: string
  endpoint: string
  type: "api" | "database" | "cdn" | "auth"
}

export async function getServices(): Promise<Service[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    {
      id: 1,
      name: "API Principal",
      description: "API principale pour les applications",
      status: "active",
      uptime: 99.9,
      responseTime: 145,
      lastCheck: new Date().toISOString(),
      endpoint: "https://api.espada.pro",
      type: "api",
    },
    {
      id: 2,
      name: "Base de Données",
      description: "Base de données PostgreSQL principale",
      status: "active",
      uptime: 99.8,
      responseTime: 23,
      lastCheck: new Date().toISOString(),
      endpoint: "postgresql://db.espada.pro:5432",
      type: "database",
    },
    {
      id: 3,
      name: "CDN Assets",
      description: "Distribution des fichiers statiques",
      status: "active",
      uptime: 99.95,
      responseTime: 89,
      lastCheck: new Date().toISOString(),
      endpoint: "https://cdn.espada.pro",
      type: "cdn",
    },
    {
      id: 4,
      name: "Service Auth",
      description: "Service d'authentification JWT",
      status: "maintenance",
      uptime: 98.2,
      responseTime: 234,
      lastCheck: new Date().toISOString(),
      endpoint: "https://auth.espada.pro",
      type: "auth",
    },
    {
      id: 5,
      name: "API Paiements",
      description: "Traitement des paiements Stripe",
      status: "active",
      uptime: 99.7,
      responseTime: 312,
      lastCheck: new Date().toISOString(),
      endpoint: "https://payments.espada.pro",
      type: "api",
    },
  ]
}
