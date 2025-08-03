"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { loginAction } from "./actions"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "unauthorized") {
      setError("Accès non autorisé. Vous devez être administrateur.")
    } else if (errorParam === "invalid") {
      setError("Session invalide. Veuillez vous reconnecter.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const result = await loginAction(formData)

      if (result.success) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(result.error || "Erreur de connexion")
      }
    } catch (err) {
      setError("Une erreur inattendue s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#ff6b00] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au site
          </Link>
        </div>

        <Card className="bg-black/50 border-[#e50914]/30 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-[#e50914]/20 rounded-full">
                <Shield className="h-8 w-8 text-[#e50914]" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Administration Espada</CardTitle>
              <CardDescription className="text-gray-400">
                Connectez-vous pour accéder au panel d'administration
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@espada.pro"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00] focus:ring-[#ff6b00]"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00] focus:ring-[#ff6b00] pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#e50914] hover:bg-[#e50914]/80 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg">
              <p className="text-sm text-[#ff6b00] font-medium mb-2">Identifiants de test:</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-300">
                  <strong>Admin:</strong> admin@espada.pro / admin123
                </p>
                <p className="text-xs text-gray-300">
                  <strong>Modérateur:</strong> moderator@espada.pro / mod123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Problème de connexion ?{" "}
            <a href="mailto:support@espada.pro" className="text-[#ff6b00] hover:underline">
              Contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
