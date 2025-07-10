import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { AdminProvider } from "@/components/admin/admin-provider"

export const metadata: Metadata = {
  title: "Admin Dashboard - DIW Packaging",
  description: "Content management system for DIW Packaging website",
}

// In a real app, this would check authentication
async function checkAuth() {
  // Simulate auth check
  const isAuthenticated = true // Replace with actual auth logic
  if (!isAuthenticated) {
    redirect("/admin/login")
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth()

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
