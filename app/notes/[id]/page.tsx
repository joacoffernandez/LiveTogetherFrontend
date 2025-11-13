"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Home, LinkIcon, SearchX } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState, use } from "react"
import { api } from "@/lib/api"
import BottomNavigation from "@/components/bottom-navigation"
import PageHeader from "@/components/header"

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

export default function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Desenvolver los params usando React.use()
  const { id } = use(params)

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

  // Función para cargar la nota específica
  const fetchNote = async () => {
    try {
      setLoading(true)
      setError("")
      
      const result = await api.get(`/note/getOnly/${id}`)
      
      if (result.success && result.data.note) {
        setNote(result.data.note)
      } else {
        setError(result.error || "Error al cargar la nota")
      }
    } catch (err) {
      setError("Error de conexión con el servidor")
      console.error("Error cargando nota:", err)
    } finally {
      setLoading(false)
    }
  }

  // Cargar la nota cuando el componente se monte
  useEffect(() => {
    if (id) {
      fetchNote()
    }
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background max-w-[430px] mx-auto">
        <PageHeader/>

        <div className="p-6 space-y-6 pb-24">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold">Detalle de Nota</h2>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>

        <BottomNavigation/>
      </div>
    )
  }

  if (error || !note) return (
    <div className="w-full min-h-screen bg-background max-w-[430px] mx-auto">
        <PageHeader/>


      <div className="flex flex-col items-center text-center space-y-8 mt-30">
        {/* Icon illustration */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <SearchX className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Tarea no encontrada</h1>
          <p className="text-sm text-gray-600 max-w-xs">
            Lo sentimos, la tarea que buscas no existe o ha sido eliminada
          </p>
        </div>

        {/* Action button */}
        <div className="w-full max-w-xs">
          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Button>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-red-300" />
          <div className="w-2 h-2 rounded-full bg-orange-300" />
          <div className="w-2 h-2 rounded-full bg-amber-300" />
        </div>
      </div>

      <BottomNavigation/>
    </div>
  )

/*   if (error || !note) {
    return (
      <div className="w-full min-h-screen bg-background max-w-[430px] mx-auto">
        <PageHeader/>

        <div className="p-6 space-y-6 pb-24">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold">Detalle de Nota</h2>
          </div>
          
          <Card className="p-6 bg-white border-emerald-100 shadow-sm">
            <div className="text-center py-8 text-muted-foreground">
              <p>{error || "Nota no encontrada"}</p>
              <Button 
                onClick={fetchNote}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
              >
                Reintentar
              </Button>
            </div>
          </Card>
        </div>

        <BottomNavigation/>
      </div>
    )
  } */

  return (
    <div className="w-full min-h-screen bg-background max-w-[430px] mx-auto">
        <PageHeader/>

      <div className="p-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Detalle de Nota</h2>
        </div>

        {/* Note Content */}
        <Card className="p-6 bg-white border-emerald-100 shadow-sm">
          <h1 className="text-2xl font-bold mb-4 text-foreground">{note.name}</h1>

          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{note.desc}</p>
          </div>

          {/* esto es por si mas adelante va a haber links o imagenes  */}
          {/* {(note.hasImage || note.hasLink) && (
            <div className="space-y-3 mb-6">
              {note.hasImage && note.imageUrl && (
                <div className="rounded-lg overflow-hidden bg-emerald-50">
                  <img
                    src={note.imageUrl || "/placeholder.svg"}
                    alt="Imagen de la nota"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              {note.hasLink && note.linkUrl && (
                <a
                  href={note.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 truncate">{note.linkUrl}</p>
                    <p className="text-xs text-blue-600">Abrir enlace</p>
                  </div>
                </a>
              )}
            </div>
          )} */}

          {/* Metadata */}
          <div className="pt-4 border-t-2 border-emerald-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-semibold text-xs">
                    {note.user.firstName[0]}
                  </span>
                </div>
                <span className="text-foreground font-medium">{note.user.firstName}</span>
              </div>
              <span className="text-muted-foreground">{getRelativeTime(note.createdAt)}</span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation/>
    </div>
  )
}