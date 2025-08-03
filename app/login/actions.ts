"use server"

import { cookies } from "next/headers"
import { login, encrypt } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validation
  if (!email || !password) {
    return { success: false, error: "Email et mot de passe requis" }
  }

  if (!email.includes("@")) {
    return { success: false, error: "Email invalide" }
  }

  if (password.length < 6) {
    return { success: false, error: "Mot de passe trop court" }
  }

  try {
    const user = await login(email, password)

    if (!user) {
      return { success: false, error: "Identifiants incorrects" }
    }

    // Vérifier le rôle
    if (!["admin", "moderator"].includes(user.role)) {
      return { success: false, error: "Accès non autorisé" }
    }

    // Créer la session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ user, expires })

    // Définir le cookie
    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.set("session", "", { expires: new Date(0) })
  redirect("/login")
}
