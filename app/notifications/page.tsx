"use client"

import { ArrowLeft, Bell, CheckCircle, X, Clock, Gift } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "task_completed",
      title: "Tarea completada",
      message: "María completó 'Lavar los platos'",
      time: "Hace 5 minutos",
      avatar: "/diverse-user-avatars.png",
      isRead: false,
    },
    {
      id: 2,
      type: "task_assigned",
      title: "Nueva tarea asignada",
      message: "Se te asignó 'Organizar el closet'",
      time: "Hace 1 hora",
      avatar: "/colorful-family-vector.jpg",
      isRead: false,
    },
    {
      id: 3,
      type: "points_earned",
      title: "Puntos ganados",
      message: "Ganaste 15 puntos por completar tareas",
      time: "Hace 2 horas",
      avatar: "/animated-tasks-vector.jpg",
      isRead: true,
    },
    {
      id: 4,
      type: "ranking_change",
      title: "Cambio en ranking",
      message: "Subiste al 2° puesto en la familia",
      time: "Ayer",
      avatar: "/colorful-family-vector.jpg",
      isRead: true,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "task_assigned":
        return <Bell className="w-5 h-5 text-blue-500" />
      case "points_earned":
        return <Gift className="w-5 h-5 text-coral-500" />
      case "ranking_change":
        return <CheckCircle className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-200/50 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Notificaciones
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Notifications Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Notificaciones recientes</h2>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                Marcar todas como leídas
              </Button>
            </div>
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${
                  !notification.isRead
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    : "bg-white border-gray-200"
                } shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {notification.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-1">
                          {getNotificationIcon(notification.type)}
                          <h3 className="font-semibold text-gray-800 text-sm">{notification.title}</h3>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </span>
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100 rounded-full">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
