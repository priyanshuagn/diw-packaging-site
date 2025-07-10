"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Upload, Settings, BarChart3, Users, Globe } from "lucide-react"

const quickActions = [
  {
    title: "New Blog Post",
    description: "Create a new blog post",
    href: "/admin/blog/create",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Upload Media",
    description: "Add images and files",
    href: "/admin/media",
    icon: Upload,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Manage Users",
    description: "Add or edit user accounts",
    href: "/admin/users",
    icon: Users,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "View Analytics",
    description: "Check website performance",
    href: "/admin/analytics",
    icon: BarChart3,
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Translations",
    description: "Manage multi-language content",
    href: "/admin/translations",
    icon: Globe,
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    title: "Settings",
    description: "Configure site settings",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gray-500 hover:bg-gray-600",
  },
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-shadow bg-transparent"
              >
                <div className={`rounded-lg p-2 mr-3 text-white ${action.color}`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
