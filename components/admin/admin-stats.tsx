"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Eye, MessageSquare, FileText } from "lucide-react"

const stats = [
  {
    title: "Total Visitors",
    value: "12,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Page Views",
    value: "45,678",
    change: "+8.2%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Contact Forms",
    value: "234",
    change: "+15.3%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Blog Posts",
    value: "12",
    change: "+2",
    trend: "up",
    icon: FileText,
  },
]

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
