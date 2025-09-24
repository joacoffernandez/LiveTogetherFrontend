"use client"

import { Calendar, Plus, AlertTriangle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ImportantReminders() {
  const reminders = [
    {
      id: 1,
      task: "Comprar comida para la semana",
      dueDate: "Hoy",
      isUrgent: true,
      assignee: {
        name: "María",
        avatar: "/diverse-woman-portrait.png",
        initials: "MA",
      },
    },
    {
      id: 2,
      task: "Pagar factura de electricidad",
      dueDate: "Mañana",
      isUrgent: true,
      assignee: {
        name: "Carlos",
        avatar: "/diverse-man-portrait.png",
        initials: "CA",
      },
    },
    {
      id: 3,
      task: "Limpiar baño principal",
      dueDate: "En 2 días",
      isUrgent: false,
      assignee: {
        name: "Ana",
        avatar: "/diverse-woman-professional.png",
        initials: "AN",
      },
    },
  ]

  return (
    <Card className="bg-white shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">Próximos a vencer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Avatar className="w-10 h-10">
              <AvatarImage src={reminder.assignee.avatar || "/placeholder.svg"} alt={reminder.assignee.name} />
              <AvatarFallback>{reminder.assignee.initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{reminder.task}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className={`text-xs ${reminder.isUrgent ? "text-red-600 font-medium" : "text-gray-500"}`}>
                  {reminder.dueDate}
                </span>
                {reminder.isUrgent && <AlertTriangle className="w-3 h-3 text-red-500" />}
              </div>
            </div>
          </div>
        ))}

        <Button className="w-full mt-4 bg-transparent" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Agregar recordatorio
        </Button>
      </CardContent>
    </Card>
  )
}
