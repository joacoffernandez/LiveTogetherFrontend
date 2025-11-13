"use client"

import { CheckCircle2, UserPlus, Trophy, Calendar, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function NotificationsTab() {
  const router = useRouter()
  const notifications = [
    {
      id: 1,
      type: "task_completed",
      icon: CheckCircle2,
      title: "Tarea completada",
      message: "Pedro completó 'Limpiar el baño'",
      time: "Hace 5 min",
      read: false,
    },
    {
      id: 2,
      type: "task_assigned",
      icon: Calendar,
      title: "Nueva tarea asignada",
      message: "Laura te asignó 'Comprar leche'",
      time: "Hace 1 hora",
      read: false,
    },
    {
      id: 3,
      type: "member_joined",
      icon: UserPlus,
      title: "Nuevo miembro",
      message: "Carlos se unió a la familia",
      time: "Hace 2 horas",
      read: true,
    },
    {
      id: 4,
      type: "achievement",
      icon: Trophy,
      title: "¡Logro desbloqueado!",
      message: "Has completado 10 tareas esta semana",
      time: "Hace 1 día",
      read: true,
    },
    {
      id: 5,
      type: "task_review",
      icon: CheckCircle2,
      title: "Tarea en revisión",
      message: "María marcó 'Ordenar la sala' como completada",
      time: "Hace 2 días",
      read: true,
    },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
              <ArrowLeft className="w-8 h-8" />
            </Button>
          <h2 className="text-2xl font-bold">Notificaciones</h2>
        </div> 
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {notifications.filter((n) => !n.read).length} nuevas
        </Badge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <Card
              key={notification.id}
              className={`p-4 border transition-all ${
                notification.read ? "bg-white border-gray-200" : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.read ? "bg-gray-100" : "bg-emerald-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${notification.read ? "text-gray-600" : "text-emerald-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-2" />}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
