"use client"

import { FileText, ImageIcon, LinkIcon, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useFamilyContext } from "@/contexts/familyContext"

interface Note {
  idNote: string
  name: string
  desc: string
  familyId: string
  creatorId: string
  createdAt: string
  user: {
    idUser: string
    username: string
    firstName: string
    lastName: string
  }
}

export default function NotesTab() {
  const router = useRouter()
  const { family } = useFamilyContext()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Función para formatear la fecha relativa
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    if (diffHours < 1) {
      const minutes = Math.floor(diffMs / (1000 * 60))
      return minutes <= 1 ? "Hace 1 minuto" : `Hace ${minutes} minutos`
    } else if (diffHours < 24) {
      const hours = Math.floor(diffHours)
      return hours === 1 ? "Hace 1 hora" : `Hace ${hours} horas`
    } else if (diffDays < 7) {
      const days = Math.floor(diffDays)
      return days === 1 ? "Ayer" : `Hace ${days} días`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return weeks === 1 ? "Hace 1 semana" : `Hace ${weeks} semanas`
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    }
  }

  // Función para cargar las notas
  const fetchNotes = async () => {
    if (!family?.idFamily) return
    
    try {
      setLoading(true)
      setError("")
      
      const result = await api.get(`/note/get/${family.idFamily}`)
      
      if (result.success && result.data.notes) {
        setNotes(result.data.notes)
      } else {
        setError(result.error || "Error al cargar las notas")
      }
    } catch (err) {
      setError("Error de conexión con el servidor")
      console.error("Error cargando notas:", err)
    } finally {
      setLoading(false)
    }
  }

  // Cargar notas cuando la familia esté disponible
  useEffect(() => {
    if (family?.idFamily) {
      fetchNotes()
    }
  }, [family?.idFamily])

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notas</h2>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-1" />
            Nueva
          </Button>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl font-bold">Notas</h2>
        <Button 
          size="sm" 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => { router.push('/notes/create') }}
        >
          <Plus className="w-4 h-4 mr-1" />
          Nueva
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Card key={note.idNote} className="p-4 bg-white border-emerald-100 shadow-sm" onClick={() => {router.push('/notes/' + note.idNote)}}>
              <h3 className="font-semibold text-md mb-1">{note.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{note.desc}</p>

              {/* esto es por si incluimos imagenes o links mas adelante  */}
              {/* {(note.hasImage || note.hasLink) && (
                <div className="flex gap-2 mb-3">
                  {note.hasImage && (
                    <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                  )}
                  {note.hasLink && (
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <LinkIcon className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              )} */}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-emerald-500">{note.user.firstName}</span>
                <span>{getRelativeTime(note.createdAt)}</span>
              </div>
            </Card>
          ))
        ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No hay notas en la familia</h3>
          <p className="text-sm text-muted-foreground">Se el primero y crea una nota para tu familia!</p>
        </div>
        )}
      </div>
    </div>
  )
}