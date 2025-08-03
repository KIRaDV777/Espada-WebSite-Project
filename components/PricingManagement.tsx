"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
  DollarSign,
  Users,
  Crown,
  Zap,
  FileText,
  TrendingUp,
} from "lucide-react"
import { PDFGenerator } from "@/lib/pdfGenerator"

interface PricingPlan {
  id: number
  name: string
  description: string
  price: number
  currency: string
  billing: "monthly" | "yearly" | "lifetime"
  features: string[]
  limitations: string[]
  isPopular: boolean
  isActive: boolean
  subscribers: number
  revenue: number
  createdAt: string
  updatedAt: string
}

const BILLING_PERIODS = [
  { value: "monthly", label: "Mensuel" },
  { value: "yearly", label: "Annuel" },
  { value: "lifetime", label: "À vie" },
]

export function PricingManagement() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: 1,
      name: "Starter",
      description: "Parfait pour débuter avec nos applications",
      price: 9.99,
      currency: "EUR",
      billing: "monthly",
      features: ["Accès à 3 applications", "Support par email", "Mises à jour incluses", "Documentation complète"],
      limitations: ["Pas d'accès aux applications premium", "Support limité aux heures ouvrables"],
      isPopular: false,
      isActive: true,
      subscribers: 1250,
      revenue: 12497.5,
      createdAt: "2023-01-15",
      updatedAt: "2024-01-10",
    },
    {
      id: 2,
      name: "Professional",
      description: "Pour les professionnels qui veulent plus de fonctionnalités",
      price: 29.99,
      currency: "EUR",
      billing: "monthly",
      features: [
        "Accès à toutes les applications",
        "Support prioritaire 24/7",
        "Mises à jour en avant-première",
        "API access",
        "Rapports avancés",
        "Intégrations tierces",
      ],
      limitations: ["Limité à 5 projets simultanés"],
      isPopular: true,
      isActive: true,
      subscribers: 850,
      revenue: 25491.5,
      createdAt: "2023-01-15",
      updatedAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Enterprise",
      description: "Solution complète pour les grandes entreprises",
      price: 99.99,
      currency: "EUR",
      billing: "monthly",
      features: [
        "Accès illimité à toutes les applications",
        "Support dédié 24/7",
        "Déploiement on-premise",
        "Personnalisation avancée",
        "Formation équipe incluse",
        "SLA garanti 99.9%",
        "Intégrations sur mesure",
      ],
      limitations: [],
      isPopular: false,
      isActive: true,
      subscribers: 125,
      revenue: 12498.75,
      createdAt: "2023-02-01",
      updatedAt: "2024-01-08",
    },
    {
      id: 4,
      name: "Lifetime Pro",
      description: "Accès à vie à toutes nos applications",
      price: 299.99,
      currency: "EUR",
      billing: "lifetime",
      features: [
        "Accès à vie à toutes les applications",
        "Toutes les futures applications incluses",
        "Support prioritaire à vie",
        "Pas d'abonnement récurrent",
        "Licence commerciale incluse",
      ],
      limitations: ["Paiement unique requis"],
      isPopular: false,
      isActive: true,
      subscribers: 320,
      revenue: 95996.8,
      createdAt: "2023-06-01",
      updatedAt: "2024-01-05",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [newPlan, setNewPlan] = useState<Partial<PricingPlan>>({
    name: "",
    description: "",
    price: 0,
    currency: "EUR",
    billing: "monthly",
    features: [],
    limitations: [],
    isPopular: false,
    isActive: true,
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleCreatePlan = () => {
    const plan: PricingPlan = {
      id: Math.max(...pricingPlans.map((p) => p.id)) + 1,
      name: newPlan.name || "",
      description: newPlan.description || "",
      price: newPlan.price || 0,
      currency: newPlan.currency || "EUR",
      billing: newPlan.billing as PricingPlan["billing"],
      features: newPlan.features || [],
      limitations: newPlan.limitations || [],
      isPopular: newPlan.isPopular || false,
      isActive: newPlan.isActive || true,
      subscribers: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setPricingPlans([...pricingPlans, plan])
    setNewPlan({
      name: "",
      description: "",
      price: 0,
      currency: "EUR",
      billing: "monthly",
      features: [],
      limitations: [],
      isPopular: false,
      isActive: true,
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan)
    setIsEditDialogOpen(true)
  }

  const handleUpdatePlan = () => {
    if (editingPlan) {
      setPricingPlans(pricingPlans.map((p) => (p.id === editingPlan.id ? editingPlan : p)))
      setIsEditDialogOpen(false)
      setEditingPlan(null)
    }
  }

  const handleDeletePlan = (planId: number) => {
    setPricingPlans(pricingPlans.filter((p) => p.id !== planId))
  }

  const generatePricingPDFReport = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdfData = {
        date: new Date().toLocaleDateString("fr-FR"),
        stats: {
          totalPlans: pricingStats.totalPlans,
          activePlans: pricingStats.activePlans,
          totalSubscribers: pricingStats.totalSubscribers,
          totalRevenue: pricingStats.totalRevenue.toFixed(2),
        },
        plans: pricingPlans.map((plan) => ({
          name: plan.name,
          price: plan.price,
          billing: plan.billing,
          subscribers: plan.subscribers,
          revenue: plan.revenue.toFixed(2),
          isActive: plan.isActive,
        })),
      }

      const pdfBlob = await PDFGenerator.generatePricingReport(pdfData)
      const filename = `rapport-tarifs-${new Date().toISOString().split("T")[0]}.html`
      await PDFGenerator.downloadPDF(pdfBlob, filename)
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getBillingBadge = (billing: string) => {
    switch (billing) {
      case "monthly":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Mensuel</Badge>
      case "yearly":
        return <Badge className="bg-green-600 hover:bg-green-700">Annuel</Badge>
      case "lifetime":
        return <Badge className="bg-purple-600 hover:bg-purple-700">À vie</Badge>
      default:
        return <Badge variant="secondary">{billing}</Badge>
    }
  }

  const pricingStats = {
    totalPlans: pricingPlans.length,
    activePlans: pricingPlans.filter((p) => p.isActive).length,
    totalSubscribers: pricingPlans.reduce((acc, p) => acc + p.subscribers, 0),
    totalRevenue: pricingPlans.reduce((acc, p) => acc + p.revenue, 0),
    avgRevenuePerPlan: pricingPlans.reduce((acc, p) => acc + p.revenue, 0) / pricingPlans.length || 0,
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
          <h3 className="text-lg font-medium text-white">Gestion des Tarifs</h3>
          <p className="text-sm text-gray-400">Gérez vos plans tarifaires et abonnements</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={generatePricingPDFReport}
            disabled={isGeneratingPDF}
            variant="outline"
            className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00]/20 bg-transparent"
          >
            {isGeneratingPDF ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
                Nouveau Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] border-[#e50914]/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau plan tarifaire</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Ajoutez un nouveau plan à votre grille tarifaire.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du plan</Label>
                    <Input
                      id="name"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="Professional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: Number.parseFloat(e.target.value) || 0 })}
                      className="bg-black/50 border-[#e50914]/50 text-white"
                      placeholder="29.99"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                    placeholder="Description du plan tarifaire"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing">Facturation</Label>
                    <Select
                      value={newPlan.billing}
                      onValueChange={(value) => setNewPlan({ ...newPlan, billing: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        {BILLING_PERIODS.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={newPlan.currency}
                      onValueChange={(value) => setNewPlan({ ...newPlan, currency: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#e50914]/30">
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={newPlan.isPopular}
                    onCheckedChange={(checked) => setNewPlan({ ...newPlan, isPopular: checked })}
                  />
                  <Label htmlFor="popular">Plan populaire</Label>
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
                <Button onClick={handleCreatePlan} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
                  Créer le plan
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
            <CardTitle className="text-sm font-medium text-gray-300">Plans Actifs</CardTitle>
            <Zap className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pricingStats.activePlans}</div>
            <p className="text-xs text-gray-400">sur {pricingStats.totalPlans} total</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Abonnés</CardTitle>
            <Users className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pricingStats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Total</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenus</CardTitle>
            <DollarSign className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pricingStats.totalRevenue.toLocaleString()}€</div>
            <p className="text-xs text-gray-400">Total</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[#e50914]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Moyenne/Plan</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#ff6b00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pricingStats.avgRevenuePerPlan.toLocaleString()}€</div>
            <p className="text-xs text-gray-400">Revenus moyens</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des plans */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`bg-black/50 border-[#e50914]/30 ${plan.isPopular ? "ring-2 ring-[#ff6b00]" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {plan.isPopular && <Crown className="h-5 w-5 text-[#ff6b00]" />}
                  <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                  {plan.isPopular && <Badge className="bg-[#ff6b00] text-black">Populaire</Badge>}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#121212] border-[#e50914]/30">
                    <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditPlan(plan)} className="text-white hover:bg-[#e50914]/20">
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-400 hover:bg-red-400/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-400 text-sm">{plan.description}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">{plan.price}€</span>
                <span className="text-gray-400">
                  /{plan.billing === "monthly" ? "mois" : plan.billing === "yearly" ? "an" : "unique"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Statut:</span>
                  <div className="flex items-center space-x-1">
                    {plan.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-white">{plan.isActive ? "Actif" : "Inactif"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Facturation:</span>
                  {getBillingBadge(plan.billing)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Abonnés:</span>
                  <span className="text-sm font-medium text-white">{plan.subscribers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Revenus:</span>
                  <span className="text-sm font-medium text-white">{plan.revenue.toLocaleString()}€</span>
                </div>
                <div className="pt-2 border-t border-[#e50914]/20">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Fonctionnalités:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-[#ff6b00]">+{plan.features.length - 3} autres...</li>
                      )}
                    </ul>
                  </div>
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
            <DialogTitle>Modifier le plan tarifaire</DialogTitle>
            <DialogDescription className="text-gray-400">Modifiez les informations de ce plan.</DialogDescription>
          </DialogHeader>
          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom du plan</Label>
                  <Input
                    id="edit-name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Prix</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number.parseFloat(e.target.value) || 0 })}
                    className="bg-black/50 border-[#e50914]/50 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="bg-black/50 border-[#e50914]/50 text-white"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-billing">Facturation</Label>
                  <Select
                    value={editingPlan.billing}
                    onValueChange={(value) =>
                      setEditingPlan({ ...editingPlan, billing: value as PricingPlan["billing"] })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      {BILLING_PERIODS.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-currency">Devise</Label>
                  <Select
                    value={editingPlan.currency}
                    onValueChange={(value) => setEditingPlan({ ...editingPlan, currency: value })}
                  >
                    <SelectTrigger className="bg-black/50 border-[#e50914]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-[#e50914]/30">
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-popular"
                    checked={editingPlan.isPopular}
                    onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, isPopular: checked })}
                  />
                  <Label htmlFor="edit-popular">Plan populaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={editingPlan.isActive}
                    onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, isActive: checked })}
                  />
                  <Label htmlFor="edit-active">Plan actif</Label>
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
            <Button onClick={handleUpdatePlan} className="bg-[#e50914] hover:bg-[#e50914]/80 text-white">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
