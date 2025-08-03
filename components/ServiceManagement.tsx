"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Database,
  Globe,
  Shield,
  Clock,
  Zap,
  FileText,
} from "lucide-react"
import { type Service, getServices } from "@/lib/stats"
import { PDFGenerator } from "@/lib/pdfGenerator"

export function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    description: "",
    endpoint: "",
    type: "api",
    status: "active",
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateService = () => {
    const service: Service = {
      id: Math.max(...services.map((s) => s.id)) + 1,
      name: newService.name || "",
      description: newService.description || "",
      endpoint: newService.endpoint || "",
      type: newService.type as Service["type"],
      status: newService.status as Service["status"],
      uptime: 100,
      responseTime: 0,
      lastCheck: new Date().toISOString(),
    }
    setServices([...services, service])
    setNewService({
      name: "",
      description: "",
      endpoint: "",
      type: "api",
      status: "active",
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setIsEditDialogOpen(true)
  }

  const handleUpdateService = () => {
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? editingService : s)))
      setIsEditDialogOpen(false)
      setEditingService(null)
    }
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((s) => s.id !== serviceId))
  }

  const handleRefreshService = async (serviceId: number) => {
    // Simulation d'un refresh
    setServices(
      services.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              lastCheck: new Date().toISOString(),
              responseTime: Math.floor(Math.random() * 500) + 50,
              uptime: Math.random() * 2 + 98,
            }
          : s,
      ),
    )
  }

  const generateServicePDFReport = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdfData = {
        date: new Date().toLocaleDateString("fr-FR"),
        stats: {
          total: serviceStats.total,
          active: serviceStats.active,
          maintenance: serviceStats.maintenance,
          avgUptime: serviceStats.avgUptime.toFixed(1),
        },
        services: services.map((service) => ({
          name: service.name,
          status: service.status,
          uptime: service.uptime.toFixed(2),
          responseTime: service.responseTime,
          lastCheck: new Date(service.lastCheck).toLocaleString("fr-FR"),
        })),
      }

      const pdfBlob = await PDFGenerator.generateServiceReport(pdfData)
      const filename = `rapport-services-${new Date().toISOString().split("T")[0]}.html`
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
      case "inactive":
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
      case "inactive":
        return <Badge className="bg-red-600 hover:bg-red-700">Inactif</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Activity className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "cdn":
        return <Globe className="h-4 w-4" />
      case "auth":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const serviceStats = {
    total: services.length,
    active: services.filter((s) => s.status === "active").length,
    maintenance: services.filter((s) => s.status === "maintenance").length,
    inactive: services.filter((s) => s.status === "inactive").length,
    avgUptime: services.reduce((acc, s) => acc + s.uptime, 0) / services.length || 0,
    avgResponseTime: services.reduce((acc, s) => acc + s.responseTime, 0) / services.length || 0,
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
      {/* En-tête et statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Gestion des Services</h3>
          <p className="text-sm text-gray-400">Surveillez et gérez l'état de vos services</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={generateServicePDFReport}
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
                Nouveau Service
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau service</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Ajoutez un nouveau service à surveiller.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du service</Label>
                    <Input
                      id="name"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="API Principal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newService.type}
                      onValueChange={(value) => setNewService({ ...newService, type: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="database">Base de données</SelectItem>
                        <SelectItem value="cdn">CDN</SelectItem>
                        <SelectItem value="auth">Authentification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="Description du service"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endpoint">Endpoint</Label>
                    <Input
                      id="endpoint"
                      value={newService.endpoint}
                      onChange={(e) => setNewService({ ...newService, endpoint: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="https://api.espada.pro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={newService.status}
                      onValueChange={(value) => setNewService({ ...newService, status: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Button onClick={handleCreateService} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                  Créer le service
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques des services */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Services</CardTitle>
            <Activity className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{serviceStats.total}</div>
            <p className="text-xs text-gray-400">
              {serviceStats.active} actifs, {serviceStats.maintenance} en maintenance
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Disponibilité Moyenne</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{serviceStats.avgUptime.toFixed(1)}%</div>
            <p className="text-xs text-gray-400">Uptime global</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Temps de Réponse</CardTitle>
            <Zap className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{Math.round(serviceStats.avgResponseTime)}ms</div>
            <p className="text-xs text-gray-400">Moyenne globale</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Services Actifs</CardTitle>
            <Activity className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{serviceStats.active}</div>
            <p className="text-xs text-gray-400">
              {((serviceStats.active / serviceStats.total) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des services */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="bg-black/50 border-[#e50914]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(service.type)}
                  <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(service.status)}
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
                        onClick={() => handleRefreshService(service.id)}
                        className="text-white hover:bg-[#e50914]/20"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Actualiser
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditService(service)}
                        className="text-white hover:bg-[#e50914]/20"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-400 hover:bg-red-400/20"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Statut:</span>
                  {getStatusBadge(service.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Disponibilité:</span>
                  <span className="text-sm font-medium text-white">{service.uptime.toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Temps de réponse:</span>
                  <span className="text-sm font-medium text-white">{service.responseTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Dernière vérification:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {new Date(service.lastCheck).toLocaleTimeString("fr-FR")}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#e50914]/20">
                  <p className="text-xs text-gray-500 truncate">{service.endpoint}</p>
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
            <DialogTitle>Modifier le service</DialogTitle>
            <DialogDescription className="text-gray-400">Modifiez les informations de ce service.</DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom du service</Label>
                  <Input
                    id="edit-name"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    value={editingService.type}
                    onValueChange={(value) => setEditingService({ ...editingService, type: value as Service["type"] })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="database">Base de données</SelectItem>
                      <SelectItem value="cdn">CDN</SelectItem>
                      <SelectItem value="auth">Authentification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-endpoint">Endpoint</Label>
                  <Input
                    id="edit-endpoint"
                    value={editingService.endpoint}
                    onChange={(e) => setEditingService({ ...editingService, endpoint: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={editingService.status}
                    onValueChange={(value) =>
                      setEditingService({ ...editingService, status: value as Service["status"] })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
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
            <Button onClick={handleUpdateService} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
