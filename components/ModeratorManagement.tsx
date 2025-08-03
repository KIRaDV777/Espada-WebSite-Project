"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  Users,
  Star,
  Clock,
  FileText,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  Activity,
  Mail,
  Calendar,
} from "lucide-react"
import { PDFGenerator } from "@/lib/pdfGenerator"

interface Moderator {
  id: number
  name: string
  email: string
  status: "active" | "suspended" | "inactive"
  role: string
  specialization: string
  permissions: string[]
  ticketsResolved: number
  satisfaction: number
  responseTime: number
  joinDate: string
  lastActivity: string
}

const PERMISSIONS = [
  "user_management",
  "content_moderation",
  "support_tickets",
  "system_admin",
  "billing_access",
  "analytics_view",
  "security_audit",
  "api_access",
]

const PERMISSION_LABELS = {
  user_management: "Gestion Utilisateurs",
  content_moderation: "Modération Contenu",
  support_tickets: "Support Tickets",
  system_admin: "Administration Système",
  billing_access: "Accès Facturation",
  analytics_view: "Vue Analytics",
  security_audit: "Audit Sécurité",
  api_access: "Accès API",
}

const SPECIALIZATIONS = [
  "Support Technique",
  "Modération Contenu",
  "Formation Utilisateurs",
  "Sécurité",
  "Facturation",
  "Développement",
  "Marketing",
]

export function ModeratorManagement() {
  const [moderators, setModerators] = useState<Moderator[]>([
    {
      id: 1,
      name: "Alice Martin",
      email: "alice.martin@espada.pro",
      status: "active",
      role: "Senior Moderator",
      specialization: "Support Technique",
      permissions: ["user_management", "support_tickets", "analytics_view"],
      ticketsResolved: 245,
      satisfaction: 94,
      responseTime: 1.2,
      joinDate: "2023-01-15",
      lastActivity: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "Bob Dupont",
      email: "bob.dupont@espada.pro",
      status: "active",
      role: "Moderator",
      specialization: "Modération Contenu",
      permissions: ["content_moderation", "support_tickets"],
      ticketsResolved: 189,
      satisfaction: 87,
      responseTime: 2.1,
      joinDate: "2023-03-20",
      lastActivity: "2024-01-15T09:15:00Z",
    },
    {
      id: 3,
      name: "Claire Rousseau",
      email: "claire.rousseau@espada.pro",
      status: "suspended",
      role: "Junior Moderator",
      specialization: "Formation Utilisateurs",
      permissions: ["support_tickets"],
      ticketsResolved: 67,
      satisfaction: 78,
      responseTime: 3.5,
      joinDate: "2023-08-10",
      lastActivity: "2024-01-10T14:20:00Z",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingModerator, setEditingModerator] = useState<Moderator | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedModerators, setSelectedModerators] = useState<number[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [newModerator, setNewModerator] = useState<Partial<Moderator>>({
    name: "",
    email: "",
    role: "",
    specialization: "",
    permissions: [],
    status: "active",
  })

  const filteredModerators = moderators.filter((mod) => {
    const matchesSearch =
      mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || mod.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateModerator = () => {
    const moderator: Moderator = {
      id: Math.max(...moderators.map((m) => m.id)) + 1,
      name: newModerator.name || "",
      email: newModerator.email || "",
      status: newModerator.status as Moderator["status"],
      role: newModerator.role || "",
      specialization: newModerator.specialization || "",
      permissions: newModerator.permissions || [],
      ticketsResolved: 0,
      satisfaction: 0,
      responseTime: 0,
      joinDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString(),
    }
    setModerators([...moderators, moderator])
    setNewModerator({
      name: "",
      email: "",
      role: "",
      specialization: "",
      permissions: [],
      status: "active",
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditModerator = (moderator: Moderator) => {
    setEditingModerator(moderator)
    setIsEditDialogOpen(true)
  }

  const handleUpdateModerator = () => {
    if (editingModerator) {
      setModerators(moderators.map((m) => (m.id === editingModerator.id ? editingModerator : m)))
      setIsEditDialogOpen(false)
      setEditingModerator(null)
    }
  }

  const handleDeleteModerator = (moderatorId: number) => {
    setModerators(moderators.filter((m) => m.id !== moderatorId))
  }

  const handleBulkAction = (action: string) => {
    if (selectedModerators.length === 0) return

    switch (action) {
      case "activate":
        setModerators(
          moderators.map((m) => (selectedModerators.includes(m.id) ? { ...m, status: "active" as const } : m)),
        )
        break
      case "suspend":
        setModerators(
          moderators.map((m) => (selectedModerators.includes(m.id) ? { ...m, status: "suspended" as const } : m)),
        )
        break
      case "delete":
        setModerators(moderators.filter((m) => !selectedModerators.includes(m.id)))
        break
    }
    setSelectedModerators([])
  }

  const toggleModeratorSelection = (moderatorId: number) => {
    setSelectedModerators((prev) =>
      prev.includes(moderatorId) ? prev.filter((id) => id !== moderatorId) : [...prev, moderatorId],
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "suspended":
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
        return <Badge className="bg-green-600 hover:bg-green-700 text-white">Actif</Badge>
      case "suspended":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">Suspendu</Badge>
      case "inactive":
        return <Badge className="bg-red-600 hover:bg-red-700 text-white">Inactif</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const moderatorStats = {
    total: moderators.length,
    active: moderators.filter((m) => m.status === "active").length,
    suspended: moderators.filter((m) => m.status === "suspended").length,
    inactive: moderators.filter((m) => m.status === "inactive").length,
    avgSatisfaction: Math.round(moderators.reduce((acc, m) => acc + m.satisfaction, 0) / moderators.length) || 0,
    totalTickets: moderators.reduce((acc, m) => acc + m.ticketsResolved, 0),
    avgResponseTime:
      Math.round((moderators.reduce((acc, m) => acc + m.responseTime, 0) / moderators.length) * 10) / 10 || 0,
  }

  const generateModeratorPDFReport = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdfData = {
        date: new Date().toLocaleDateString("fr-FR"),
        stats: moderatorStats,
        moderators: moderators.map((mod) => ({
          name: mod.name,
          email: mod.email,
          status: mod.status,
          specialization: mod.specialization,
          ticketsResolved: mod.ticketsResolved,
          satisfaction: mod.satisfaction,
          responseTime: mod.responseTime,
        })),
      }

      const pdfBlob = await PDFGenerator.generateModeratorReport(pdfData)
      const filename = `rapport-moderateurs-${new Date().toISOString().split("T")[0]}.html`
      await PDFGenerator.downloadPDF(pdfBlob, filename)
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
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
          <h3 className="text-lg font-medium text-white">Gestion des Modérateurs</h3>
          <p className="text-sm text-gray-400">Gérez votre équipe de modération avec des outils avancés</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={generateModeratorPDFReport}
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
                Nouveau Modérateur
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau modérateur</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Ajoutez un nouveau membre à votre équipe de modération.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={newModerator.name}
                      onChange={(e) => setNewModerator({ ...newModerator, name: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="Alice Martin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newModerator.email}
                      onChange={(e) => setNewModerator({ ...newModerator, email: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="alice@espada.pro"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Input
                      id="role"
                      value={newModerator.role}
                      onChange={(e) => setNewModerator({ ...newModerator, role: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="Senior Moderator"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Spécialisation</Label>
                    <Select
                      value={newModerator.specialization}
                      onValueChange={(value) => setNewModerator({ ...newModerator, specialization: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue placeholder="Choisir une spécialisation" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        {SPECIALIZATIONS.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMISSIONS.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission}
                          checked={newModerator.permissions?.includes(permission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewModerator({
                                ...newModerator,
                                permissions: [...(newModerator.permissions || []), permission],
                              })
                            } else {
                              setNewModerator({
                                ...newModerator,
                                permissions: newModerator.permissions?.filter((p) => p !== permission),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={permission} className="text-sm">
                          {PERMISSION_LABELS[permission]}
                        </Label>
                      </div>
                    ))}
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
                <Button onClick={handleCreateModerator} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                  Créer le modérateur
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total</CardTitle>
            <Users className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.total}</div>
            <p className="text-xs text-gray-400">Modérateurs</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.active}</div>
            <p className="text-xs text-gray-400">En service</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Suspendus</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.suspended}</div>
            <p className="text-xs text-gray-400">Temporaire</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Inactifs</CardTitle>
            <XCircle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.inactive}</div>
            <p className="text-xs text-gray-400">Hors service</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.avgSatisfaction}%</div>
            <p className="text-xs text-gray-400">Moyenne</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Tickets</CardTitle>
            <Clock className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{moderatorStats.totalTickets}</div>
            <p className="text-xs text-gray-400">Résolus</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#e50914]/50 text-white w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-black/50 border-[#e50914]/50 text-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-[#e50914]/30">
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actifs</SelectItem>
              <SelectItem value="suspended">Suspendus</SelectItem>
              <SelectItem value="inactive">Inactifs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedModerators.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">{selectedModerators.length} sélectionné(s)</span>
            <Button size="sm" onClick={() => handleBulkAction("activate")} className="bg-green-600 hover:bg-green-700">
              <UserCheck className="mr-1 h-3 w-3" />
              Activer
            </Button>
            <Button size="sm" onClick={() => handleBulkAction("suspend")} className="bg-yellow-600 hover:bg-yellow-700">
              <UserX className="mr-1 h-3 w-3" />
              Suspendre
            </Button>
            <Button size="sm" onClick={() => handleBulkAction("delete")} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="mr-1 h-3 w-3" />
              Supprimer
            </Button>
          </div>
        )}
      </div>

      {/* Liste des modérateurs - Format tableau amélioré pour la lisibilité */}
      <div className="bg-black/50 border border-[#e50914]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e50914]/20 border-b border-[#e50914]/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <Checkbox
                    checked={selectedModerators.length === filteredModerators.length && filteredModerators.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedModerators(filteredModerators.map((m) => m.id))
                      } else {
                        setSelectedModerators([])
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Modérateur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Spécialisation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e50914]/20">
              {filteredModerators.map((moderator) => (
                <tr key={moderator.id} className="hover:bg-[#e50914]/10 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedModerators.includes(moderator.id)}
                      onCheckedChange={() => toggleModeratorSelection(moderator.id)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{getStatusIcon(moderator.status)}</div>
                      <div>
                        <div className="text-sm font-medium text-white">{moderator.name}</div>
                        <div className="text-sm text-gray-400 flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{moderator.email}</span>
                        </div>
                        <div className="text-xs text-gray-500">{moderator.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(moderator.status)}
                      <div className="text-xs text-gray-400 flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Depuis {new Date(moderator.joinDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant="outline" className="border-[#ff6b00] text-[#ff6b00]">
                      {moderator.specialization}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-white font-medium">{moderator.ticketsResolved} tickets</div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm text-white">{moderator.satisfaction}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className="text-sm text-white">{moderator.responseTime}h</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{moderator.permissions.length} permission(s)</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {moderator.permissions
                        .slice(0, 2)
                        .map((p) => PERMISSION_LABELS[p])
                        .join(", ")}
                      {moderator.permissions.length > 2 && "..."}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
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
                          onClick={() => handleEditModerator(moderator)}
                          className="text-white hover:bg-[#e50914]/20"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteModerator(moderator.id)}
                          className="text-red-400 hover:bg-red-400/20"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le modérateur</DialogTitle>
            <DialogDescription className="text-gray-400">Modifiez les informations de ce modérateur.</DialogDescription>
          </DialogHeader>
          {editingModerator && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom complet</Label>
                  <Input
                    id="edit-name"
                    value={editingModerator.name}
                    onChange={(e) => setEditingModerator({ ...editingModerator, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingModerator.email}
                    onChange={(e) => setEditingModerator({ ...editingModerator, email: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Rôle</Label>
                  <Input
                    id="edit-role"
                    value={editingModerator.role}
                    onChange={(e) => setEditingModerator({ ...editingModerator, role: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={editingModerator.status}
                    onValueChange={(value) =>
                      setEditingModerator({ ...editingModerator, status: value as Moderator["status"] })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-specialization">Spécialisation</Label>
                <Select
                  value={editingModerator.specialization}
                  onValueChange={(value) => setEditingModerator({ ...editingModerator, specialization: value })}
                >
                  <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] border-[#e50914]/30">
                    {SPECIALIZATIONS.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PERMISSIONS.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${permission}`}
                        checked={editingModerator.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingModerator({
                              ...editingModerator,
                              permissions: [...editingModerator.permissions, permission],
                            })
                          } else {
                            setEditingModerator({
                              ...editingModerator,
                              permissions: editingModerator.permissions.filter((p) => p !== permission),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`edit-${permission}`} className="text-sm">
                        {PERMISSION_LABELS[permission]}
                      </Label>
                    </div>
                  ))}
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
            <Button onClick={handleUpdateModerator} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
