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
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  Star,
  Shield,
  UserCheck,
  Users,
  AlertTriangle,
} from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: "admin" | "user" | "moderator"
  status: "active" | "suspended" | "banned"
  plan: "free" | "pro" | "enterprise"
  registeredAt: string
  lastLogin: string
  downloads: number
  rating: number
  avatar?: string
  notes?: string
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Alexandre Moreau",
      email: "alexandre.moreau@techflow.com",
      phone: "+33 6 12 34 56 78",
      role: "user",
      status: "active",
      plan: "pro",
      registeredAt: "2024-01-15",
      lastLogin: "2024-12-20",
      downloads: 15,
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Client VIP, très satisfait de nos services",
    },
    {
      id: 2,
      name: "Sarah Dubois",
      email: "sarah.dubois@pharmacie-centrale.fr",
      phone: "+33 6 98 76 54 32",
      role: "user",
      status: "active",
      plan: "enterprise",
      registeredAt: "2024-02-03",
      lastLogin: "2024-12-19",
      downloads: 8,
      rating: 5.0,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Utilise principalement le gestionnaire de pharmacie",
    },
    {
      id: 3,
      name: "Marc Laurent",
      email: "marc.laurent@streampro.com",
      phone: "+33 6 45 67 89 12",
      role: "moderator",
      status: "active",
      plan: "pro",
      registeredAt: "2024-01-28",
      lastLogin: "2024-12-18",
      downloads: 22,
      rating: 4.7,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Modérateur actif, aide beaucoup la communauté",
    },
    {
      id: 4,
      name: "Julie Martin",
      email: "julie.martin@example.com",
      role: "user",
      status: "suspended",
      plan: "free",
      registeredAt: "2024-03-10",
      lastLogin: "2024-12-10",
      downloads: 3,
      rating: 3.2,
      notes: "Suspendu pour violation des conditions d'utilisation",
    },
    {
      id: 5,
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
      phone: "+33 6 11 22 33 44",
      role: "admin",
      status: "active",
      plan: "enterprise",
      registeredAt: "2023-12-01",
      lastLogin: "2024-12-21",
      downloads: 45,
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Administrateur principal",
    },
    {
      id: 6,
      name: "Emma Rousseau",
      email: "emma.rousseau@example.com",
      role: "user",
      status: "banned",
      plan: "free",
      registeredAt: "2024-02-20",
      lastLogin: "2024-11-15",
      downloads: 1,
      rating: 2.1,
      notes: "Banni pour activité suspecte",
    },
  ])

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
    plan: "free",
    notes: "",
  })

  // Statistiques des utilisateurs
  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    banned: users.filter((u) => u.status === "banned").length,
    admins: users.filter((u) => u.role === "admin").length,
    moderators: users.filter((u) => u.role === "moderator").length,
    regularUsers: users.filter((u) => u.role === "user").length,
  }

  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = () => {
    const user: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: newUser.name || "",
      email: newUser.email || "",
      phone: newUser.phone,
      role: newUser.role as User["role"],
      status: newUser.status as User["status"],
      plan: newUser.plan as User["plan"],
      registeredAt: new Date().toISOString().split("T")[0],
      lastLogin: "Jamais",
      downloads: 0,
      rating: 0,
      notes: newUser.notes,
    }
    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "user",
      status: "active",
      plan: "free",
      notes: "",
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
      setIsEditDialogOpen(false)
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleStatusChange = (userId: number, newStatus: User["status"]) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return

    switch (action) {
      case "activate":
        setUsers(users.map((u) => (selectedUsers.includes(u.id) ? { ...u, status: "active" } : u)))
        break
      case "suspend":
        setUsers(users.map((u) => (selectedUsers.includes(u.id) ? { ...u, status: "suspended" } : u)))
        break
      case "ban":
        setUsers(users.map((u) => (selectedUsers.includes(u.id) ? { ...u, status: "banned" } : u)))
        break
      case "delete":
        setUsers(users.filter((u) => !selectedUsers.includes(u.id)))
        break
    }
    setSelectedUsers([])
  }

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAllUsers = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((u) => u.id))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "moderator":
        return <UserCheck className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-yellow-600 hover:bg-yellow-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspendu
          </Badge>
        )
      case "banned":
        return (
          <Badge className="bg-red-600 hover:bg-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Banni
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "free":
        return <Badge variant="outline">Gratuit</Badge>
      case "pro":
        return <Badge className="bg-[#ff6b00] text-black hover:bg-[#ff6b00]/80">Pro</Badge>
      case "enterprise":
        return <Badge className="bg-[#e50914] hover:bg-[#e50914]/80">Entreprise</Badge>
      default:
        return <Badge variant="secondary">{plan}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête et statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Gestion des Utilisateurs</h3>
          <p className="text-sm text-gray-400">Gérez les comptes utilisateurs de votre plateforme</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
              <DialogDescription className="text-gray-400">
                Ajoutez un nouveau compte utilisateur à la plateforme.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                      <SelectItem value="banned">Banni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={newUser.plan} onValueChange={(value) => setNewUser({ ...newUser, plan: value })}>
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="free">Gratuit</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={newUser.notes}
                  onChange={(e) => setNewUser({ ...newUser, notes: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                  placeholder="Notes sur cet utilisateur..."
                />
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
              <Button onClick={handleCreateUser} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                Créer l'utilisateur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.total}</div>
            <p className="text-xs text-gray-400">
              {userStats.active} actifs, {userStats.suspended} suspendus
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Administrateurs</CardTitle>
            <Shield className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.admins}</div>
            <p className="text-xs text-gray-400">{userStats.moderators} modérateurs</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Utilisateurs Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.active}</div>
            <p className="text-xs text-gray-400">{((userStats.active / userStats.total) * 100).toFixed(1)}% du total</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Problèmes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.suspended + userStats.banned}</div>
            <p className="text-xs text-gray-400">{userStats.banned} bannis définitivement</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="bg-black/50 border-[#e50914]/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#121212] border-[#e50914]/50 text-white"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40 bg-[#121212] border-[#e50914]/50 text-white">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#e50914]/30">
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                  <SelectItem value="moderator">Modérateurs</SelectItem>
                  <SelectItem value="user">Utilisateurs</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40 bg-[#121212] border-[#e50914]/50 text-white">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#e50914]/30">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                  <SelectItem value="banned">Bannis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#e50914] text-[#e50914] hover:bg-[#e50914]/20 bg-transparent"
                    >
                      Actions ({selectedUsers.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#121212] border-[#e50914]/30">
                    <DropdownMenuLabel className="text-white">Actions en lot</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("activate")}
                      className="text-green-400 hover:bg-green-400/20"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("suspend")}
                      className="text-yellow-400 hover:bg-yellow-400/20"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Suspendre
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("ban")}
                      className="text-red-400 hover:bg-red-400/20"
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Bannir
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("delete")}
                      className="text-red-400 hover:bg-red-400/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table des utilisateurs */}
      <Card className="bg-black/50 border-[#e50914]/30">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#e50914]/30 hover:bg-[#e50914]/10">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={toggleAllUsers}
                  />
                </TableHead>
                <TableHead className="text-gray-300">Utilisateur</TableHead>
                <TableHead className="text-gray-300">Rôle</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Plan</TableHead>
                <TableHead className="text-gray-300">Inscription</TableHead>
                <TableHead className="text-gray-300">Dernière connexion</TableHead>
                <TableHead className="text-gray-300">Téléchargements</TableHead>
                <TableHead className="text-gray-300">Note</TableHead>
                <TableHead className="text-gray-300 w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-[#e50914]/30 hover:bg-[#e50914]/5">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || "/placeholder.svg?height=32&width=32"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-[#e50914]/30"
                      />
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                        {user.phone && <div className="text-xs text-gray-500">{user.phone}</div>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span className="text-white capitalize">{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{user.registeredAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-300">{user.lastLogin}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Download className="h-3 w-3" />
                      <span className="text-sm">{user.downloads}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-[#ff6b00] fill-current" />
                        <span className="text-sm text-white">{user.rating}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
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
                          onClick={() => handleEditUser(user)}
                          className="text-white hover:bg-[#e50914]/20"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "suspended")}
                            className="text-yellow-400 hover:bg-yellow-400/20"
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Suspendre
                          </DropdownMenuItem>
                        )}
                        {user.status === "suspended" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "active")}
                            className="text-green-400 hover:bg-green-400/20"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Réactiver
                          </DropdownMenuItem>
                        )}
                        {user.status !== "banned" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "banned")}
                            className="text-red-400 hover:bg-red-400/20"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Bannir
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-400 hover:bg-red-400/20"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations de cet utilisateur.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom complet</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Téléphone</Label>
                  <Input
                    id="edit-phone"
                    value={editingUser.phone || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Rôle</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value as User["role"] })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={editingUser.status}
                    onValueChange={(value) => setEditingUser({ ...editingUser, status: value as User["status"] })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                      <SelectItem value="banned">Banni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-plan">Plan</Label>
                  <Select
                    value={editingUser.plan}
                    onValueChange={(value) => setEditingUser({ ...editingUser, plan: value as User["plan"] })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="free">Gratuit</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingUser.notes || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, notes: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                />
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
            <Button onClick={handleUpdateUser} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir supprimer l'utilisateur "{userToDelete?.name}" ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Annuler
            </Button>
            <Button onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
