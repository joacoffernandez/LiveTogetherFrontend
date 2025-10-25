"use client"

import { Mail, Check, X, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function InvitationsTab() {
  const invitations = [
    {
      id: 1,
      familyName: "Casa del Lago",
      invitedBy: "Ana Martínez",
      members: 5,
      message: "¡Únete a nuestra familia para organizar las vacaciones!",
      date: "Hace 2 días",
    },
    {
      id: 2,
      familyName: "Departamento Centro",
      invitedBy: "Roberto Silva",
      members: 3,
      message: "Te invitamos a compartir gastos y tareas del depto",
      date: "Hace 5 días",
    },
    {
      id: 3,
      familyName: "Familia Rodríguez",
      invitedBy: "Carmen Rodríguez",
      members: 7,
      message: "Organicemos las reuniones familiares juntos",
      date: "Hace 1 semana",
    },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Invitaciones</h2>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {invitations.length} pendientes
        </Badge>
      </div>

      {invitations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No tienes invitaciones</h3>
          <p className="text-sm text-muted-foreground">Cuando alguien te invite a una familia, aparecerá aquí</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="p-4 border border-emerald-100 bg-white">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1">{invitation.familyName}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Invitado por <span className="font-semibold">{invitation.invitedBy}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{invitation.members} miembros</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 pl-15">{invitation.message}</p>

              <div className="flex items-center justify-between pl-15">
                <span className="text-xs text-muted-foreground">{invitation.date}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Rechazar
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Check className="w-4 h-4 mr-1" />
                    Aceptar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
