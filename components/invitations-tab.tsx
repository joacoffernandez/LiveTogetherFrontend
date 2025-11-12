"use client"

import { useState, useEffect } from 'react'
import { Mail, Check, X, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from '@/lib/api'

interface Family {
  name: string;
  idFamily: string;
}

interface Invitation {
  idFamily: string;
  idInvitation: string;
  idUserInvited: string;
  idUserInviter: string;
  accepted: boolean | null;
  seen: boolean;
  family: Family;
}

export default function InvitationsTab() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processingIds, setProcessingIds] = useState<string[]>([])

  // Cargar invitaciones al montar el componente
  useEffect(() => {
    fetchInvitations()
  }, [])

  const fetchInvitations = async () => {
    try {
      setLoading(true)
      const result = await api.get('/invitation/get')
      
      if (result.success && result.data) {
        setInvitations(result.data.invitation)
      } else {
        setError('Error al cargar las invitaciones')
      }
    } catch (err) {
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (invitationId: string) => {
    try {
      setProcessingIds(prev => [...prev, invitationId])
      setError('')

      const result = await api.post(`/invitation/accept/${invitationId}`, {})
      
      if (result.success) {
        // Remover la invitación aceptada de la lista
        setInvitations(prev => prev.filter(inv => inv.idInvitation !== invitationId))
      } else {
        setError('Error al aceptar la invitación')
      }
    } catch (err) {
      setError('Error de conexión con el servidor')
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== invitationId))
    }
  }

  const handleReject = async (invitationId: string) => {
    try {
      setProcessingIds(prev => [...prev, invitationId])
      setError('')

      const result = await api.post(`/invitation/reject/${invitationId}`, {})
      
      if (result.success) {
        // Remover la invitación rechazada de la lista
        setInvitations(prev => prev.filter(inv => inv.idInvitation !== invitationId))
      } else {
        setError('Error al rechazar la invitación')
      }
    } catch (err) {
      setError('Error de conexión con el servidor')
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== invitationId))
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Invitaciones</h2>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Cargando...
          </Badge>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Invitaciones</h2>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {invitations.length} pendientes
        </Badge>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

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
            <Card key={invitation.idInvitation} className="p-4 border border-emerald-100 bg-white">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1">{invitation.family.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Invitado por <span className="font-semibold">{invitation.idUserInviter}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">ID Familia: {invitation.idFamily}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 pl-15">
                Te han invitado a unirte a esta familia
              </p>

              <div className="flex items-center justify-between pl-15">
                <span className="text-xs text-muted-foreground">
                  {invitation.seen ? 'Vista' : 'No vista'}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                    onClick={() => handleReject(invitation.idInvitation)}
                    disabled={processingIds.includes(invitation.idInvitation)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    {processingIds.includes(invitation.idInvitation) ? 'Procesando...' : 'Rechazar'}
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleAccept(invitation.idInvitation)}
                    disabled={processingIds.includes(invitation.idInvitation)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {processingIds.includes(invitation.idInvitation) ? 'Procesando...' : 'Aceptar'}
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