"use client"

import { CheckCircle2, UserPlus, Calendar, ArrowLeft, Clock, Eye, AlertCircle, XCircle, UserX, ClipboardCheck } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useFamilyContext } from "@/contexts/familyContext"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"


enum NotificationType {
  TASK_CREATED = "TASK_CREATED",
  TASK_ASSIGNED = "TASK_ASSIGNED",
  TASK_EXPIRE_SOON = "TASK_EXPIRE_SOON",
  TASK_EXPIRED = "TASK_EXPIRED",
  TASK_UNASSIGNED = "TASK_UNASSIGNED",
  TASK_REJECTED = "TASK_REJECTED",
  TASK_TO_REVIEW = "TASK_TO_REVIEW",
  TASK_COMPLETED = "TASK_COMPLETED"
}

interface Notification {
  idNotification: string
  idUser: string
  idFamily: string
  type: string
  title: string
  idTask: string
  createdAt: string
  seen: boolean
}

export default function NotificationsTab() {
  const router = useRouter()
  const { family, reloadFamilyContext } = useFamilyContext()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Hace unos segundos"
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} hora${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''}`
    return `Hace ${Math.floor(diffInSeconds / 86400)} día${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''}`
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case NotificationType.TASK_CREATED:
        return Calendar
      case NotificationType.TASK_ASSIGNED:
        return UserPlus
      case NotificationType.TASK_EXPIRE_SOON:
        return Clock
      case NotificationType.TASK_EXPIRED:
        return AlertCircle
      case NotificationType.TASK_UNASSIGNED:
        return UserX
      case NotificationType.TASK_REJECTED:
        return XCircle
      case NotificationType.TASK_TO_REVIEW:
        return ClipboardCheck
      case NotificationType.TASK_COMPLETED:
        return CheckCircle2
      default:
        return Calendar
    }
  }

  const getNotificationMessage = (type: string) => {
    switch (type) {
      case NotificationType.TASK_CREATED:
        return "Nueva tarea creada"
      case NotificationType.TASK_ASSIGNED:
        return "Te asignaron una tarea"
      case NotificationType.TASK_EXPIRE_SOON:
        return "Una tarea está por vencer"
      case NotificationType.TASK_EXPIRED:
        return "Una tarea ha vencido"
      case NotificationType.TASK_UNASSIGNED:
        return "Te desasignaron de una tarea"
      case NotificationType.TASK_REJECTED:
        return "Una tarea fue rechazada"
      case NotificationType.TASK_TO_REVIEW:
        return "Hay una tarea para revisar"
      case NotificationType.TASK_COMPLETED:
        return "Tarea completada exitosamente"
      default:
        return "Tienes una notificación"
    }
  }

  const getNotificationStyle = (seen: boolean) => {
    return {
      cardClasses: seen 
        ? "!bg-gray-50 !border-gray-200/80" 
        : "!bg-gradient-to-br !from-emerald-500/10 !via-emerald-400/5 !to-teal-400/10 !border-emerald-400/50",
      iconBg: "bg-emerald-500",
      iconColor: "text-white"
    }
  }

  useEffect(() => {
    const loadNotifications = async () => {
      if (!family?.idFamily) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await api.get(`/notification/get/${family.idFamily}`)

        if (response.success && response.data?.notifications) {
          setNotifications(response.data.notifications)
        } else {
          setNotifications([])
        }
      } catch (error) {
        console.error("Error cargando notificaciones:", error)
        setNotifications([])
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
    reloadFamilyContext()
  }, [family?.idFamily])

  const handleViewTask = (idTask: string) => {
    console.log("Ver tarea:", idTask)
  }

  const unseenCount = notifications.filter(n => n.seen === false).length

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="w-8 h-8" />
          </Button>
          <h2 className="text-2xl font-bold">Notificaciones</h2>
        </div>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 font-semibold">
          {unseenCount} nueva{unseenCount !== 1 ? 's' : ''}
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tienes notificaciones</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            const isNew = notification.seen === false
            const cardClasses = isNew 
              ? "!bg-gradient-to-br !from-emerald-500/10 !via-emerald-400/5 !to-teal-400/10 !border-emerald-400/50 shadow-md" 
              : "!bg-gray-50 !border-gray-200/80"
            
            return (
              <Card
                key={notification.idNotification}
                className={`p-4 !border-2 transition-all hover:shadow-md ${cardClasses}`}
              >
                <div className="flex items-start gap-4">
                  {isNew && (
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1 bg-emerald-500 animate-pulse shadow-lg" />
                  )}
                  
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {getNotificationMessage(notification.type)}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-medium">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewTask(notification.idTask)}
                        className="h-8 text-xs gap-1.5 ml-auto font-semibold hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Ver Tarea
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
