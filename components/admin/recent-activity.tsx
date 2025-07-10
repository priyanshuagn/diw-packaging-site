"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, ImageIcon, MessageSquare, User } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "blog",
    action: "published",
    item: "The Future of Sustainable Packaging",
    user: "Maria Novak",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    type: "portfolio",
    action: "added",
    item: "Premium Watch Box",
    user: "Peter Koval",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "4 hours ago",
    icon: ImageIcon,
  },
  {
    id: 3,
    type: "contact",
    action: "received",
    item: "New contact form submission",
    user: "System",
    avatar: null,
    time: "6 hours ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "user",
    action: "registered",
    item: "New editor account",
    user: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 day ago",
    icon: User,
  },
]

const actionColors = {
  published: "bg-green-100 text-green-800",
  added: "bg-blue-100 text-blue-800",
  received: "bg-yellow-100 text-yellow-800",
  registered: "bg-purple-100 text-purple-800",
}

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="bg-gray-100 rounded-full p-2">
                <activity.icon className="w-4 h-4 text-gray-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={actionColors[activity.action as keyof typeof actionColors]}>
                    {activity.action}
                  </Badge>
                  <span className="text-sm font-medium">{activity.item}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {activity.avatar ? (
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-4 h-4 bg-gray-300 rounded-full" />
                  )}
                  <span>by {activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
