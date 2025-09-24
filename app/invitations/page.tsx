"use client"

import { ArrowLeft, Users, CheckCircle, Clock, Gift } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function InvitationsPage() {
  const invitations = [
    {
      id: 1,
      type: "family_invite",
      title: "Invitación a familia",
      message: "La familia Rodríguez te invitó a unirte",
      time: "Hace 30 minutos",
      avatar: "/diverse-user-avatars.png",
      isRead: false,
    },
    {
      id: 2,
      type: "task_collaboration",
      title: "Colaboración en tarea",
      message: "Pedro te invitó a colaborar en 'Limpiar el jardín'",
      time: "Hace 3 horas",
      avatar: "/animated-tasks-vector.jpg",
      isRead: false,
    },
    {
      id: 3,
      type: "group_challenge",
      title: "Desafío grupal",
      message: "Nueva competencia familiar disponible",
      time: "Hace 1 día",
      avatar: "/colorful-family-vector.jpg",
      isRead: true,
    },
  ]

  const getInvitationIcon = (type: string) => {
    switch (type) {
      case "family_invite":
        return <Users className="w-5 h-5 text-green-500" />
      case "task_collaboration":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case "group_challenge":
        return <Gift className="w-5 h-5 text-coral-500" />
      default:
        return <Users className="w-5 h-5 text-gray-500" />
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Invitaciones
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Invitaciones pendientes</h2>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                Ver todas
              </Button>
            </div>
            {invitations.map((invitation) => (
              <Card
                key={invitation.id}
                className={`${
                  !invitation.isRead
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    : "bg-white border-gray-200"
                } shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={invitation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {invitation.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-1">
                          {getInvitationIcon(invitation.type)}
                          <h3 className="font-semibold text-gray-800 text-sm">{invitation.title}</h3>
                        </div>
                        {!invitation.isRead && <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{invitation.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {invitation.time}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-3 py-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                          >
                            Rechazar
                          </Button>
                          <Button size="sm" className="text-xs px-3 py-1 bg-green-500 hover:bg-green-600 text-white">
                            Aceptar
                          </Button>
                        </div>
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
