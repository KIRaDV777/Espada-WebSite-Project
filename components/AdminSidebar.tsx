"use client"

import { Settings, BarChart3, Euro, MessageSquare, Package, Users, Download, Shield, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Tarifs",
    url: "#",
    icon: Euro,
  },
  {
    title: "Avis Clients",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "Applications",
    url: "#",
    icon: Package,
  },
  {
    title: "Utilisateurs",
    url: "#",
    icon: Users,
  },
  {
    title: "Téléchargements",
    url: "#",
    icon: Download,
  },
]

const adminItems = [
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
  {
    title: "Sécurité",
    url: "#",
    icon: Shield,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar className="bg-[#121212] border-r border-[#e50914]/30">
      <SidebarHeader className="border-b border-[#e50914]/30 p-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">😈</div>
          <div>
            <div className="text-xl font-bold text-[#e50914]">Espada Admin</div>
            <div className="text-sm text-gray-400">Panel d'administration</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#121212]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#ff6b00] font-semibold">Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-[#e50914]/20 hover:text-[#ff6b00] data-[active=true]:bg-[#e50914] data-[active=true]:text-white"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-[#e50914]/30" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[#ff6b00] font-semibold">Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-[#e50914]/20 hover:text-[#ff6b00] data-[active=true]:bg-[#e50914] data-[active=true]:text-white"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#e50914]/30 p-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Connecté en tant que:</div>
          <div className="text-white font-medium">Admin</div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-[#e50914] text-[#e50914] hover:bg-[#e50914] hover:text-white bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
