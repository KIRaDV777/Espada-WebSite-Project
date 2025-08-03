"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'une authentification
    setTimeout(() => {
      if (email === "admin@espada.pro" && password === "admin123") {
        router.push("/admin")
      } else {
        alert("Identifiants incorrects")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-black/50 border-[#e50914]/30">
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
            <form onSubmit={handleLogin} className="space-y-4">
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
                  className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00]"
                  required
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
                    className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00] pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
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
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg">
              <p className="text-sm text-[#ff6b00] font-medium mb-2">Identifiants de test:</p>
              <p className="text-xs text-gray-300">Email: admin@espada.pro</p>
              <p className="text-xs text-gray-300">Mot de passe: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
