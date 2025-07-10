"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  MessageSquare,
  BarChart3,
  Database,
  Shield,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText, badge: "12" },
  { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon, badge: "24" },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Translations", href: "/admin/translations", icon: Globe },
  { name: "Contact Forms", href: "/admin/contacts", icon: MessageSquare, badge: "3" },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users, adminOnly: true },
  { name: "Backup", href: "/admin/backup", icon: Database, adminOnly: true },
  { name: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
]

const helpLinks = [
  { name: "Documentation", href: "/admin/help", icon: HelpCircle },
  { name: "User Roles", href: "/admin/help/roles", icon: Shield },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Mock user role - in real app, get from auth context
  const userRole = "admin" // or "editor"

  const filteredNavigation = navigation.filter((item) => !item.adminOnly || userRole === "admin")

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-gray-900">DIW Admin</span>
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-gold text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className={cn("flex-shrink-0 w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Help Section */}
        <div className="border-t border-gray-200 p-2">
          {helpLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className={cn("flex-shrink-0 w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
