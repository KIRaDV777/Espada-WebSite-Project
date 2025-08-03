"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  UserCheck,
  ArrowLeft,
   RefreshCw,
   LogOut,
  AlertTriangle,
  Shield,
  Settings,
  Smartphone,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserManagement } from "./UserManagement"
import { AccountManagement } from "./AccountManagement"
import { ModeratorManagement } from "./ModeratorManagement"
import { ApplicationManagement } from "./ApplicationManagement"
import { PricingManagement } from "./PricingManagement"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
  totalApplications: number
  activeModerators: number
  supportTickets: number
  systemHealth: number
}

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  // Données simulées pour le dashboard
  const stats: DashboardStats = {
    totalUsers: 12543,
    activeUsers: 8921,
    totalRevenue: 145678.9,
    monthlyGrowth: 12.5,
    totalApplications: 8,
    activeModerators: 15,
    supportTickets: 23,
    systemHealth: 99.2,
  }
    const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (response.ok) {
        router.push("/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const recentActivities = [
    {
      id: 1,
      type: "user_registration",
      message: "Nouvel utilisateur inscrit: john.doe@email.com",
      timestamp: "Il y a 5 minutes",
      severity: "info",
    },
    {
      id: 2,
      type: "payment",
      message: "Paiement reçu: 29.99€ - Plan Professional",
      timestamp: "Il y a 12 minutes",
      severity: "success",
    },
    {
      id: 3,
      type: "security",
      message: "Tentative de connexion suspecte détectée",
      timestamp: "Il y a 18 minutes",
      severity: "warning",
    },
    {
      id: 4,
      type: "system",
      message: "Mise à jour système terminée avec succès",
      timestamp: "Il y a 1 heure",
      severity: "success",
    },
    {
      id: 5,
      type: "support",
      message: "Nouveau ticket de support créé #1234",
      timestamp: "Il y a 2 heures",
      severity: "info",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <UserCheck className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      case "support":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-[#e50914]/30 bg-black/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-[#ff6b00] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour au site</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="text-3xl">😈</div>
                <div>
                  <div className="text-xl font-bold text-[#e50914]">Espada Admin</div>
                
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
             
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500/20 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-400">Gérez votre plateforme Espada depuis cette interface centralisée</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 border border-[#e50914]/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white">
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="accounts" className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white">
              Comptes
            </TabsTrigger>
            <TabsTrigger value="moderators" className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white">
              Modérateurs
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-[#e50914] data-[state=active]:text-white">
              Tarifs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistiques principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Utilisateurs Total</CardTitle>
                  <Users className="h-4 w-4 text-[#ff6b00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">{stats.activeUsers.toLocaleString()} actifs</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Revenus</CardTitle>
                  <DollarSign className="h-4 w-4 text-[#ff6b00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalRevenue.toLocaleString()}€</div>
                  <p className="text-xs text-gray-400">+{stats.monthlyGrowth}% ce mois</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Applications</CardTitle>
                  <Smartphone className="h-4 w-4 text-[#ff6b00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalApplications}</div>
                  <p className="text-xs text-gray-400">{stats.totalApplications - 1} actives</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Santé Système</CardTitle>
                  <Activity className="h-4 w-4 text-[#ff6b00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.systemHealth}%</div>
                  <p className="text-xs text-gray-400">Tous systèmes opérationnels</p>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques et activités récentes */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Activités récentes */}
              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader>
                  <CardTitle className="text-white">Activités Récentes</CardTitle>
                  <CardDescription className="text-gray-400">Dernières actions sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`mt-1 ${getSeverityColor(activity.severity)}`}>
                          {getSeverityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{activity.message}</p>
                          <p className="text-xs text-gray-400">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques rapides */}
              <Card className="bg-black/50 border-[#e50914]/30">
                <CardHeader>
                  <CardTitle className="text-white">Statistiques Rapides</CardTitle>
                  <CardDescription className="text-gray-400">Aperçu des métriques importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-[#ff6b00]" />
                        <span className="text-sm text-gray-300">Modérateurs actifs</span>
                      </div>
                      <Badge className="bg-green-600 hover:bg-green-700">{stats.activeModerators}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-[#ff6b00]" />
                        <span className="text-sm text-gray-300">Tickets support</span>
                      </div>
                      <Badge className="bg-yellow-600 hover:bg-yellow-700">{stats.supportTickets}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-[#ff6b00]" />
                        <span className="text-sm text-gray-300">Croissance mensuelle</span>
                      </div>
                      <Badge className="bg-blue-600 hover:bg-blue-700">+{stats.monthlyGrowth}%</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-[#ff6b00]" />
                        <span className="text-sm text-gray-300">Revenus moyens/utilisateur</span>
                      </div>
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        {Math.round(stats.totalRevenue / stats.totalUsers)}€
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <Card className="bg-black/50 border-[#e50914]/30">
              <CardHeader>
                <CardTitle className="text-white">Actions Rapides</CardTitle>
                <CardDescription className="text-gray-400">
                  Accès rapide aux fonctionnalités principales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button
                    onClick={() => setActiveTab("users")}
                    className="bg-[#e50914] hover:bg-[#e50914]/80 text-white h-20 flex-col space-y-2"
                  >
                    <Users className="h-6 w-6" />
                    <span>Gérer Utilisateurs</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("moderators")}
                    className="bg-[#e50914] hover:bg-[#e50914]/80 text-white h-20 flex-col space-y-2"
                  >
                    <Shield className="h-6 w-6" />
                    <span>Gérer Modérateurs</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("applications")}
                    className="bg-[#e50914] hover:bg-[#e50914]/80 text-white h-20 flex-col space-y-2"
                  >
                    <Smartphone className="h-6 w-6" />
                    <span>Gérer Applications</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("pricing")}
                    className="bg-[#e50914] hover:bg-[#e50914]/80 text-white h-20 flex-col space-y-2"
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Gérer Tarifs</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>

          <TabsContent value="moderators">
            <ModeratorManagement />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationManagement />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
