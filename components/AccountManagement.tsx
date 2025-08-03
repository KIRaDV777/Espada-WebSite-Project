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
  Shield,
  UserCheck,
  Users,
  AlertTriangle,
  Mail,
  Key,
} from "lucide-react"

interface Account {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  role: "admin" | "user" | "moderator"
  status: "active" | "suspended" | "banned"
  plan: "free" | "pro" | "enterprise"
  registeredAt: string
  lastLogin: string
  downloads: number
  rating: number
  avatar?: string
  notes?: string
  billingInfo?: {
    company?: string
    vatNumber?: string
    paymentMethod?: string
    nextBilling?: string
  }
  permissions: string[]
  twoFactorEnabled: boolean
  emailVerified: boolean
}

export function AccountManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPlan, setSelectedPlan] = useState<string>("all")
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null)
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false)
  const [accountForPasswordReset, setAccountForPasswordReset] = useState<Account | null>(null)

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      name: "Alexandre Moreau",
      email: "alexandre.moreau@techflow.com",
      phone: "+33 6 12 34 56 78",
      address: "123 Rue de la Tech, 75001 Paris",
      role: "user",
      status: "active",
      plan: "pro",
      registeredAt: "2024-01-15",
      lastLogin: "2024-12-20",
      downloads: 15,
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Client VIP, très satisfait de nos services",
      billingInfo: {
        company: "TechFlow SAS",
        vatNumber: "FR12345678901",
        paymentMethod: "Carte de crédit",
        nextBilling: "2025-01-15",
      },
      permissions: ["download", "support", "api_access"],
      twoFactorEnabled: true,
      emailVerified: true,
    },
    {
      id: 2,
      name: "Sarah Dubois",
      email: "sarah.dubois@pharmacie-centrale.fr",
      phone: "+33 6 98 76 54 32",
      address: "456 Avenue de la Santé, 69000 Lyon",
      role: "user",
      status: "active",
      plan: "enterprise",
      registeredAt: "2024-02-03",
      lastLogin: "2024-12-19",
      downloads: 8,
      rating: 5.0,
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Utilise principalement le gestionnaire de pharmacie",
      billingInfo: {
        company: "Pharmacie Centrale",
        vatNumber: "FR98765432109",
        paymentMethod: "Virement bancaire",
        nextBilling: "2025-02-03",
      },
      permissions: ["download", "support", "api_access", "admin_panel"],
      twoFactorEnabled: false,
      emailVerified: true,
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
      permissions: ["download", "support", "api_access", "moderate"],
      twoFactorEnabled: true,
      emailVerified: true,
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
      permissions: ["download"],
      twoFactorEnabled: false,
      emailVerified: false,
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
      permissions: ["download", "support", "api_access", "admin_panel", "user_management"],
      twoFactorEnabled: true,
      emailVerified: true,
    },
  ])

  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    status: "active",
    plan: "free",
    notes: "",
    permissions: ["download"],
    twoFactorEnabled: false,
    emailVerified: false,
  })

  // Statistiques des comptes
  const accountStats = {
    total: accounts.length,
    active: accounts.filter((a) => a.status === "active").length,
    suspended: accounts.filter((a) => a.status === "suspended").length,
    banned: accounts.filter((a) => a.status === "banned").length,
    admins: accounts.filter((a) => a.role === "admin").length,
    moderators: accounts.filter((a) => a.role === "moderator").length,
    regularUsers: accounts.filter((a) => a.role === "user").length,
    verified: accounts.filter((a) => a.emailVerified).length,
    twoFactorEnabled: accounts.filter((a) => a.twoFactorEnabled).length,
  }

  // Filtrage des comptes
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || account.role === selectedRole
    const matchesStatus = selectedStatus === "all" || account.status === selectedStatus
    const matchesPlan = selectedPlan === "all" || account.plan === selectedPlan
    return matchesSearch && matchesRole && matchesStatus && matchesPlan
  })

  const handleCreateAccount = () => {
    const account: Account = {
      id: Math.max(...accounts.map((a) => a.id)) + 1,
      name: newAccount.name || "",
      email: newAccount.email || "",
      phone: newAccount.phone,
      address: newAccount.address,
      role: newAccount.role as Account["role"],
      status: newAccount.status as Account["status"],
      plan: newAccount.plan as Account["plan"],
      registeredAt: new Date().toISOString().split("T")[0],
      lastLogin: "Jamais",
      downloads: 0,
      rating: 0,
      notes: newAccount.notes,
      permissions: newAccount.permissions || ["download"],
      twoFactorEnabled: newAccount.twoFactorEnabled || false,
      emailVerified: newAccount.emailVerified || false,
    }
    setAccounts([...accounts, account])
    setNewAccount({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "user",
      status: "active",
      plan: "free",
      notes: "",
      permissions: ["download"],
      twoFactorEnabled: false,
      emailVerified: false,
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditAccount = (account: Account) => {
    setEditingAccount({ ...account })
    setIsEditDialogOpen(true)
  }

  const handleUpdateAccount = () => {
    if (editingAccount) {
      setAccounts(accounts.map((a) => (a.id === editingAccount.id ? editingAccount : a)))
      setIsEditDialogOpen(false)
      setEditingAccount(null)
    }
  }

  const handleDeleteAccount = (account: Account) => {
    setAccountToDelete(account)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteAccount = () => {
    if (accountToDelete) {
      setAccounts(accounts.filter((a) => a.id !== accountToDelete.id))
      setIsDeleteDialogOpen(false)
      setAccountToDelete(null)
    }
  }

  const handleStatusChange = (accountId: number, newStatus: Account["status"]) => {
    setAccounts(accounts.map((a) => (a.id === accountId ? { ...a, status: newStatus } : a)))
  }

  const handlePasswordReset = (account: Account) => {
    setAccountForPasswordReset(account)
    setIsPasswordResetDialogOpen(true)
  }

  const confirmPasswordReset = () => {
    // Ici, vous enverriez un email de réinitialisation
    console.log(`Password reset sent to ${accountForPasswordReset?.email}`)
    setIsPasswordResetDialogOpen(false)
    setAccountForPasswordReset(null)
  }

  const handleBulkAction = (action: string) => {
    if (selectedAccounts.length === 0) return

    switch (action) {
      case "activate":
        setAccounts(accounts.map((a) => (selectedAccounts.includes(a.id) ? { ...a, status: "active" } : a)))
        break
      case "suspend":
        setAccounts(accounts.map((a) => (selectedAccounts.includes(a.id) ? { ...a, status: "suspended" } : a)))
        break
      case "ban":
        setAccounts(accounts.map((a) => (selectedAccounts.includes(a.id) ? { ...a, status: "banned" } : a)))
        break
      case "delete":
        setAccounts(accounts.filter((a) => !selectedAccounts.includes(a.id)))
        break
      case "verify":
        setAccounts(accounts.map((a) => (selectedAccounts.includes(a.id) ? { ...a, emailVerified: true } : a)))
        break
    }
    setSelectedAccounts([])
  }

  const toggleAccountSelection = (accountId: number) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId],
    )
  }

  const toggleAllAccounts = () => {
    setSelectedAccounts(selectedAccounts.length === filteredAccounts.length ? [] : filteredAccounts.map((a) => a.id))
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

  const availablePermissions = [
    { id: "download", label: "Téléchargements" },
    { id: "support", label: "Support" },
    { id: "api_access", label: "Accès API" },
    { id: "admin_panel", label: "Panel Admin" },
    { id: "user_management", label: "Gestion Utilisateurs" },
    { id: "moderate", label: "Modération" },
  ]

  return (
    <div className="space-y-6">
      {/* En-tête et statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Gestion des Comptes</h3>
          <p className="text-sm text-gray-400">Gérez les comptes utilisateurs et leurs permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Compte
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouveau compte</DialogTitle>
              <DialogDescription className="text-gray-400">
                Ajoutez un nouveau compte utilisateur avec ses permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAccount.email}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={newAccount.phone}
                    onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={newAccount.role}
                    onValueChange={(value) => setNewAccount({ ...newAccount, role: value })}
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
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={newAccount.address}
                  onChange={(e) => setNewAccount({ ...newAccount, address: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                  placeholder="123 Rue de la Paix, 75001 Paris"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={newAccount.status}
                    onValueChange={(value) => setNewAccount({ ...newAccount, status: value })}
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
                  <Label htmlFor="plan">Plan</Label>
                  <Select
                    value={newAccount.plan}
                    onValueChange={(value) => setNewAccount({ ...newAccount, plan: value })}
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
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={newAccount.permissions?.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          const currentPermissions = newAccount.permissions || []
                          if (checked) {
                            setNewAccount({
                              ...newAccount,
                              permissions: [...currentPermissions, permission.id],
                            })
                          } else {
                            setNewAccount({
                              ...newAccount,
                              permissions: currentPermissions.filter((p) => p !== permission.id),
                            })
                          }
                        }}
                      />
                      <span className="text-sm text-white">{permission.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newAccount.emailVerified}
                    onCheckedChange={(checked) => setNewAccount({ ...newAccount, emailVerified: checked })}
                  />
                  <span className="text-sm text-white">Email vérifié</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newAccount.twoFactorEnabled}
                    onCheckedChange={(checked) => setNewAccount({ ...newAccount, twoFactorEnabled: checked })}
                  />
                  <span className="text-sm text-white">2FA activé</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAccount.notes}
                  onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                  placeholder="Notes sur ce compte..."
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
              <Button onClick={handleCreateAccount} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                Créer le compte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Comptes</CardTitle>
            <Users className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{accountStats.total}</div>
            <p className="text-xs text-gray-400">
              {accountStats.active} actifs, {accountStats.suspended} suspendus
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Comptes Vérifiés</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{accountStats.verified}</div>
            <p className="text-xs text-gray-400">
              {((accountStats.verified / accountStats.total) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">2FA Activé</CardTitle>
            <Shield className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{accountStats.twoFactorEnabled}</div>
            <p className="text-xs text-gray-400">
              {((accountStats.twoFactorEnabled / accountStats.total) * 100).toFixed(1)}% sécurisés
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Administrateurs</CardTitle>
            <Shield className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{accountStats.admins}</div>
            <p className="text-xs text-gray-400">{accountStats.moderators} modérateurs</p>
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
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-40 bg-[#121212] border-[#e50914]/50 text-white">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#e50914]/30">
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="free">Gratuit</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Entreprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedAccounts.length > 0 && (
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#e50914] text-[#e50914] hover:bg-[#e50914]/20 bg-transparent"
                    >
                      Actions ({selectedAccounts.length})
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
                      onClick={() => handleBulkAction("verify")}
                      className="text-blue-400 hover:bg-blue-400/20"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Vérifier emails
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

      {/* Table des comptes */}
      <Card className="bg-black/50 border-[#e50914]/30">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#e50914]/30 hover:bg-[#e50914]/10">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                    onCheckedChange={toggleAllAccounts}
                  />
                </TableHead>
                <TableHead className="text-gray-300">Compte</TableHead>
                <TableHead className="text-gray-300">Rôle</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Plan</TableHead>
                <TableHead className="text-gray-300">Sécurité</TableHead>
                <TableHead className="text-gray-300">Inscription</TableHead>
                <TableHead className="text-gray-300">Dernière connexion</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-[#e50914]/30 hover:bg-[#e50914]/5">
                  <TableCell>
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={() => toggleAccountSelection(account.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={account.avatar || "/placeholder.svg?height=32&width=32"}
                        alt={account.name}
                        className="w-8 h-8 rounded-full border border-[#e50914]/30"
                      />
                      <div>
                        <div className="font-medium text-white">{account.name}</div>
                        <div className="text-sm text-gray-400">{account.email}</div>
                        {account.phone && <div className="text-xs text-gray-500">{account.phone}</div>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(account.role)}
                      <span className="text-white capitalize">{account.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                  <TableCell>{getPlanBadge(account.plan)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {account.emailVerified ? (
                        <Badge className="bg-green-600 text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          Non vérifié
                        </Badge>
                      )}
                      {account.twoFactorEnabled && (
                        <Badge className="bg-blue-600 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          2FA
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{account.registeredAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-300">{account.lastLogin}</span>
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
                          onClick={() => handleEditAccount(account)}
                          className="text-white hover:bg-[#e50914]/20"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePasswordReset(account)}
                          className="text-blue-400 hover:bg-blue-400/20"
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Réinitialiser mot de passe
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {account.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(account.id, "suspended")}
                            className="text-yellow-400 hover:bg-yellow-400/20"
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Suspendre
                          </DropdownMenuItem>
                        )}
                        {account.status === "suspended" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(account.id, "active")}
                            className="text-green-400 hover:bg-green-400/20"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Réactiver
                          </DropdownMenuItem>
                        )}
                        {account.status !== "banned" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(account.id, "banned")}
                            className="text-red-400 hover:bg-red-400/20"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Bannir
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteAccount(account)}
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

      {/* Dialog d'édition de compte */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le compte</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations et permissions de ce compte.
            </DialogDescription>
          </DialogHeader>
          {editingAccount && (
            <div className="grid gap-6 py-4">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white border-b border-[#e50914]/30 pb-2">
                  Informations personnelles
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nom complet</Label>
                    <Input
                      id="edit-name"
                      value={editingAccount.name}
                      onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingAccount.email}
                      onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Téléphone</Label>
                    <Input
                      id="edit-phone"
                      value={editingAccount.phone || ""}
                      onChange={(e) => setEditingAccount({ ...editingAccount, phone: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">Adresse</Label>
                    <Input
                      id="edit-address"
                      value={editingAccount.address || ""}
                      onChange={(e) => setEditingAccount({ ...editingAccount, address: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Paramètres du compte */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white border-b border-[#e50914]/30 pb-2">
                  Paramètres du compte
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Rôle</Label>
                    <Select
                      value={editingAccount.role}
                      onValueChange={(value) =>
                        setEditingAccount({ ...editingAccount, role: value as Account["role"] })
                      }
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
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Statut</Label>
                    <Select
                      value={editingAccount.status}
                      onValueChange={(value) =>
                        setEditingAccount({ ...editingAccount, status: value as Account["status"] })
                      }
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
                      value={editingAccount.plan}
                      onValueChange={(value) =>
                        setEditingAccount({ ...editingAccount, plan: value as Account["plan"] })
                      }
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
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white border-b border-[#e50914]/30 pb-2">Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={editingAccount.permissions?.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          const currentPermissions = editingAccount.permissions || []
                          if (checked) {
                            setEditingAccount({
                              ...editingAccount,
                              permissions: [...currentPermissions, permission.id],
                            })
                          } else {
                            setEditingAccount({
                              ...editingAccount,
                              permissions: currentPermissions.filter((p) => p !== permission.id),
                            })
                          }
                        }}
                      />
                      <span className="text-sm text-white">{permission.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sécurité */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white border-b border-[#e50914]/30 pb-2">Sécurité</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={editingAccount.emailVerified}
                      onCheckedChange={(checked) => setEditingAccount({ ...editingAccount, emailVerified: checked })}
                    />
                    <span className="text-sm text-white">Email vérifié</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={editingAccount.twoFactorEnabled}
                      onCheckedChange={(checked) => setEditingAccount({ ...editingAccount, twoFactorEnabled: checked })}
                    />
                    <span className="text-sm text-white">Authentification à deux facteurs</span>
                  </div>
                </div>
              </div>

              {/* Informations de facturation */}
              {editingAccount.billingInfo && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white border-b border-[#e50914]/30 pb-2">
                    Informations de facturation
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-company">Entreprise</Label>
                      <Input
                        id="edit-company"
                        value={editingAccount.billingInfo.company || ""}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            billingInfo: { ...editingAccount.billingInfo, company: e.target.value },
                          })
                        }
                        className="bg-black/50 border-[#e50914]/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-vat">Numéro TVA</Label>
                      <Input
                        id="edit-vat"
                        value={editingAccount.billingInfo.vatNumber || ""}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            billingInfo: { ...editingAccount.billingInfo, vatNumber: e.target.value },
                          })
                        }
                        className="bg-black/50 border-[#e50914]/50 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-payment">Méthode de paiement</Label>
                      <Input
                        id="edit-payment"
                        value={editingAccount.billingInfo.paymentMethod || ""}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            billingInfo: { ...editingAccount.billingInfo, paymentMethod: e.target.value },
                          })
                        }
                        className="bg-black/50 border-[#e50914]/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-next-billing">Prochaine facturation</Label>
                      <Input
                        id="edit-next-billing"
                        type="date"
                        value={editingAccount.billingInfo.nextBilling || ""}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            billingInfo: { ...editingAccount.billingInfo, nextBilling: e.target.value },
                          })
                        }
                        className="bg-black/50 border-[#e50914]/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingAccount.notes || ""}
                  onChange={(e) => setEditingAccount({ ...editingAccount, notes: e.target.value })}
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
            <Button onClick={handleUpdateAccount} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
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
              Êtes-vous sûr de vouloir supprimer le compte "{accountToDelete?.name}" ? Cette action est irréversible.
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
            <Button onClick={confirmDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de réinitialisation de mot de passe */}
      <Dialog open={isPasswordResetDialogOpen} onOpenChange={setIsPasswordResetDialogOpen}>
        <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white">
          <DialogHeader>
            <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
            <DialogDescription className="text-gray-400">
              Un email de réinitialisation sera envoyé à "{accountForPasswordReset?.email}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 p-4 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg">
              <Key className="h-5 w-5 text-[#ff6b00]" />
              <div>
                <p className="text-sm font-medium text-[#ff6b00]">Réinitialisation sécurisée</p>
                <p className="text-xs text-gray-300">
                  L'utilisateur recevra un lien temporaire pour créer un nouveau mot de passe.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordResetDialogOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Annuler
            </Button>
            <Button onClick={confirmPasswordReset} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Envoyer l'email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
