import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/hooks/useTranslation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Espada - Desktop Applications",
  description: "Powerful desktop applications for your business",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  )
}
