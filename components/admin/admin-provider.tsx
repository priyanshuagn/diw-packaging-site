"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AdminContextType {
  userRole: "admin" | "editor"
  permissions: {
    canManageUsers: boolean
    canManageSettings: boolean
    canManageBlog: boolean
    canManagePortfolio: boolean
    canViewAnalytics: boolean
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  // Mock user role - in real app, get from authentication
  const [userRole] = useState<"admin" | "editor">("admin")

  const permissions = {
    canManageUsers: userRole === "admin",
    canManageSettings: userRole === "admin",
    canManageBlog: true, // Both admin and editor can manage blog
    canManagePortfolio: true, // Both admin and editor can manage portfolio
    canViewAnalytics: userRole === "admin",
  }

  return <AdminContext.Provider value={{ userRole, permissions }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
