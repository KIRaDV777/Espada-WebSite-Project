import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const secretKey = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const key = new TextEncoder().encode(secretKey)

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "moderator"
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function login(email: string, password: string): Promise<User | null> {
  // Simulation d'une base de données - remplacer par une vraie DB
  const users = [
    {
      id: "1",
      email: "admin@espada.pro",
      password: "admin123", // En production, utiliser bcrypt
      name: "Administrateur",
      role: "admin" as const,
    },
    {
      id: "2",
      email: "moderator@espada.pro",
      password: "mod123",
      name: "Modérateur",
      role: "moderator" as const,
    },
  ]

  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  try {
    const payload = await decrypt(session)
    return payload.user
  } catch {
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set("session", "", { expires: new Date(0) })
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  if (!session) return

  try {
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const res = new Response(null, {
      status: 200,
      headers: {
        "Set-Cookie": `session=${await encrypt(parsed)}; Path=/; HttpOnly; SameSite=strict; Secure=${process.env.NODE_ENV === "production"}`,
      },
    })
    return res
  } catch {
    return new Response(null, { status: 401 })
  }
}
