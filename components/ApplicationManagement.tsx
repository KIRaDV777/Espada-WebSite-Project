"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Smartphone,
  FileText,
  Users,
  DollarSign,
  Download,
} from "lucide-react"
import { PDFGenerator } from "@/lib/pdfGenerator"

interface Application {
  id: number
  name: string
  description: string
  category: string
  version: string
  status: "active" | "maintenance" | "deprecated"
  downloads: number
  activeUsers: number
  revenue: number
  releaseDate: string
  lastUpdate: string
  features: string[]
  price: number
  icon: string
}

const APPLICATION_CATEGORIES = [
  "Optimisation Réseau",
  "Gestion Médicale",
  "Streaming & IPTV",
  "Facturation & Finance",
  "Productivité",
  "Sécurité",
  "Utilitaires",
]

export function ApplicationManagement() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "Optimiseur de Ping",
      description: "Application pour optimiser la latence réseau et améliorer les performances gaming",
      category: "Optimisation Réseau",
      version: "2.1.4",
      status: "active",
      downloads: 15420,
      activeUsers: 8950,
      revenue: 12450.5,
      releaseDate: "2023-03-15",
      lastUpdate: "2024-01-10",
      features: ["Optimisation automatique", "Monitoring temps réel", "Rapports détaillés"],
      price: 29.99,
      icon: "🚀",
    },
    {
      id: 2,
      name: "Gestionnaire de Pharmacie",
      description: "Solution complète pour la gestion des stocks et prescriptions pharmaceutiques",
      category: "Gestion Médicale",
      version: "1.8.2",
      status: "active",
      downloads: 3240,
      activeUsers: 1850,
      revenue: 8750.0,
      releaseDate: "2023-01-20",
      lastUpdate: "2024-01-05",
      features: ["Gestion stocks", "Prescriptions", "Facturation", "Rapports"],
      price: 149.99,
      icon: "💊",
    },
    {
      id: 3,
      name: "Panel IPTV Pro",
      description: "Interface d'administration avancée pour serveurs IPTV et streaming",
      category: "Streaming & IPTV",
      version: "3.0.1",
      status: "active",
      downloads: 8760,
      activeUsers: 4320,
      revenue: 18900.75,
      releaseDate: "2023-06-10",
      lastUpdate: "2024-01-12",
      features: ["Gestion utilisateurs", "Monitoring serveurs", "Analytics", "API REST"],
      price: 79.99,
      icon: "📺",
    },
    {
      id: 4,
      name: "Facturation Express",
      description: "Système de facturation rapide et automatisé pour PME",
      category: "Facturation & Finance",
      version: "2.5.0",
      status: "maintenance",
      downloads: 5680,
      activeUsers: 2340,
      revenue: 15600.25,
      releaseDate: "2023-04-05",
      lastUpdate: "2023-12-20",
      features: ["Facturation automatique", "Devis", "Paiements en ligne", "Comptabilité"],
      price: 59.99,
      icon: "💰",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<Application | null>(null)
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    name: "",
    description: "",
    category: "",
    version: "1.0.0",
    status: "active",
    features: [],
    price: 0,
    icon: "📱",
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleCreateApplication = () => {
    const application: Application = {
      id: Math.max(...applications.map((a) => a.id)) + 1,
      name: newApplication.name || "",
      description: newApplication.description || "",
      category: newApplication.category || "",
      version: newApplication.version || "1.0.0",
      status: newApplication.status as Application["status"],
      downloads: 0,
      activeUsers: 0,
      revenue: 0,
      releaseDate: new Date().toISOString().split("T")[0],
      lastUpdate: new Date().toISOString().split("T")[0],
      features: newApplication.features || [],
      price: newApplication.price || 0,
      icon: newApplication.icon || "📱",
    }
    setApplications([...applications, application])
    setNewApplication({
      name: "",
      description: "",
      category: "",
      version: "1.0.0",
      status: "active",
      features: [],
      price: 0,
      icon: "📱",
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application)
    setIsEditDialogOpen(true)
  }

  const handleUpdateApplication = () => {
    if (editingApplication) {
      setApplications(applications.map((a) => (a.id === editingApplication.id ? editingApplication : a)))
      setIsEditDialogOpen(false)
      setEditingApplication(null)
    }
  }

  const handleDeleteApplication = (applicationId: number) => {
    setApplications(applications.filter((a) => a.id !== applicationId))
  }

  const generateApplicationPDFReport = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdfData = {
        date: new Date().toLocaleDateString("fr-FR"),
        stats: {
          total: applicationStats.total,
          active: applicationStats.active,
          totalDownloads: applicationStats.totalDownloads,
          totalRevenue: applicationStats.totalRevenue.toFixed(2),
        },
        applications: applications.map((app) => ({
          name: app.name,
          category: app.category,
          version: app.version,
          status: app.status,
          downloads: app.downloads,
          activeUsers: app.activeUsers,
          revenue: app.revenue.toFixed(2),
        })),
      }

      const pdfBlob = await PDFGenerator.generateApplicationReport(pdfData)
      const filename = `rapport-applications-${new Date().toISOString().split("T")[0]}.html`
      await PDFGenerator.downloadPDF(pdfBlob, filename)
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "deprecated":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 hover:bg-green-700">Actif</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Maintenance</Badge>
      case "deprecated":
        return <Badge className="bg-red-600 hover:bg-red-700">Déprécié</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const applicationStats = {
    total: applications.length,
    active: applications.filter((a) => a.status === "active").length,
    maintenance: applications.filter((a) => a.status === "maintenance").length,
    deprecated: applications.filter((a) => a.status === "deprecated").length,
    totalDownloads: applications.reduce((acc, a) => acc + a.downloads, 0),
    totalUsers: applications.reduce((acc, a) => acc + a.activeUsers, 0),
    totalRevenue: applications.reduce((acc, a) => acc + a.revenue, 0),
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#ff6b00]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Gestion des Applications</h3>
          <p className="text-sm text-gray-400">Gérez votre catalogue d'applications Espada</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={generateApplicationPDFReport}
            disabled={isGeneratingPDF}
            variant="outline"
            className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00]/20 bg-transparent"
          >
            {isGeneratingPDF ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Rapport PDF
              </>
            )}
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Application
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle application</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Ajoutez une nouvelle application à votre catalogue.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'application</Label>
                    <Input
                      id="name"
                      value={newApplication.name}
                      onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="Optimiseur de Ping"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={newApplication.category}
                      onValueChange={(value) => setNewApplication({ ...newApplication, category: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        {APPLICATION_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newApplication.description}
                    onChange={(e) => setNewApplication({ ...newApplication, description: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="Description détaillée de l'application"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={newApplication.version}
                      onChange={(e) => setNewApplication({ ...newApplication, version: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="1.0.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newApplication.price}
                      onChange={(e) =>
                        setNewApplication({ ...newApplication, price: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="29.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icône</Label>
                    <Input
                      id="icon"
                      value={newApplication.icon}
                      onChange={(e) => setNewApplication({ ...newApplication, icon: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="🚀"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Annuler
                </Button>
                <Button onClick={handleCreateApplication} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                  Créer l'application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Applications</CardTitle>
            <Smartphone className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{applicationStats.total}</div>
            <p className="text-xs text-gray-400">{applicationStats.active} actives</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Téléchargements</CardTitle>
            <Download className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{applicationStats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Total</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Utilisateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{applicationStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenus</CardTitle>
            <DollarSign className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{applicationStats.totalRevenue.toLocaleString()}€</div>
            <p className="text-xs text-gray-400">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des applications */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <Card key={application.id} className="bg-black/50 border-[#e50914]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{application.icon}</div>
                  <div>
                    <CardTitle className="text-white text-lg">{application.name}</CardTitle>
                    <p className="text-sm text-gray-400">v{application.version}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(application.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#121212] border-[#e50914]/30">
                      <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleEditApplication(application)}
                        className="text-white hover:bg-[#e50914]/20"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteApplication(application.id)}
                        className="text-red-400 hover:bg-red-400/20"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{application.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Statut:</span>
                  {getStatusBadge(application.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Catégorie:</span>
                  <Badge variant="outline" className="border-[#ff6b00] text-[#ff6b00]">
                    {application.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Prix:</span>
                  <span className="text-sm font-medium text-white">{application.price}€</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Téléchargements:</span>
                  <span className="text-sm font-medium text-white">{application.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Utilisateurs actifs:</span>
                  <span className="text-sm font-medium text-white">{application.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Revenus:</span>
                  <span className="text-sm font-medium text-white">{application.revenue.toLocaleString()}€</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'application</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations de cette application.
            </DialogDescription>
          </DialogHeader>
          {editingApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom de l'application</Label>
                  <Input
                    id="edit-name"
                    value={editingApplication.name}
                    onChange={(e) => setEditingApplication({ ...editingApplication, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Catégorie</Label>
                  <Select
                    value={editingApplication.category}
                    onValueChange={(value) => setEditingApplication({ ...editingApplication, category: value })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      {APPLICATION_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingApplication.description}
                  onChange={(e) => setEditingApplication({ ...editingApplication, description: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-version">Version</Label>
                  <Input
                    id="edit-version"
                    value={editingApplication.version}
                    onChange={(e) => setEditingApplication({ ...editingApplication, version: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Prix (€)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingApplication.price}
                    onChange={(e) =>
                      setEditingApplication({ ...editingApplication, price: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={editingApplication.status}
                    onValueChange={(value) =>
                      setEditingApplication({ ...editingApplication, status: value as Application["status"] })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="deprecated">Déprécié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Annuler
            </Button>
            <Button onClick={handleUpdateApplication} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
