import type React from "react"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  if (!["admin", "moderator"].includes(user.role)) {
    redirect("/login?error=unauthorized")
  }

  return <>{children}</>
}
