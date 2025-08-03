import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminDashboardClient } from "@/components/AdminDashboardClient"

export default async function AdminDashboard() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  if (!["admin", "moderator"].includes(user.role)) {
    redirect("/login?error=unauthorized")
  }

  return <AdminDashboardClient user={user} />
}
