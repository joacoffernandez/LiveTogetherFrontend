"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clipboard, Plus, Edit, Trash2 } from "lucide-react"
import { NoteModal } from "@/components/note-modal"

// Mock data for notes
const mockNotes = [
  {
    id: 1,
    title: "Lista de la compra",
    content:
      "Necesitamos comprar: leche, pan, huevos, tomates, queso, yogur, manzanas, pollo, arroz, aceite de oliva, detergente para la ropa y papel higiénico. También recordar revisar las ofertas del supermercado.",
    author: { name: "Ana García", avatar: "/diverse-woman-portrait.png" },
    createdAt: "2024-01-15T10:30:00Z",
    isRecent: true,
  },
  {
    id: 2,
    title: "Normas de convivencia",
    content:
      "1. Mantener las zonas comunes limpias\n2. Respetar los horarios de descanso\n3. Avisar si traes invitados\n4. Turnos de limpieza semanales\n5. No dejar platos sucios en el fregadero",
    author: { name: "Carlos López", avatar: "/diverse-man-portrait.png" },
    createdAt: "2024-01-14T15:45:00Z",
    isRecent: false,
  },
  {
    id: 3,
    title: "Gastos compartidos",
    content:
      "Internet: 30€/mes\nLuz: 45€/mes\nAgua: 25€/mes\nGas: 20€/mes\nLimpieza: 15€/mes\nTotal por persona: 27.5€/mes",
    author: { name: "María Rodríguez", avatar: "/diverse-woman-professional.png" },
    createdAt: "2024-01-13T09:15:00Z",
    isRecent: false,
  },
  {
    id: 4,
    title: "Contactos importantes",
    content:
      "Portero: 666 123 456\nAdministrador: 666 789 012\nFontanero: 666 345 678\nElectricista: 666 901 234\nVeterinario: 666 567 890",
    author: { name: "Juan Pérez", avatar: "/diverse-man-casual.png" },
    createdAt: "2024-01-12T14:20:00Z",
    isRecent: false,
  },
  {
    id: 5,
    title: "Reunión mensual",
    content:
      "Próxima reunión: 20 de enero a las 19:00\nTemas a tratar:\n- Revisión de gastos\n- Nuevas normas\n- Mejoras en la casa\n- Planificación de limpieza profunda",
    author: { name: "Ana García", avatar: "/diverse-woman-portrait.png" },
    createdAt: "2024-01-15T08:00:00Z",
    isRecent: true,
  },
]

export function NotesSection() {
  const [notes, setNotes] = useState(mockNotes)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  }

  const truncateContent = (content: string, maxLines = 3) => {
    const lines = content.split("\n")
    if (lines.length <= maxLines) {
      return content
    }
    return lines.slice(0, maxLines).join("\n") + "..."
  }

  const handleAddNote = (newNote: any) => {
    setNotes((prev) => [newNote, ...prev])
  }

  return (
    <div className="space-y-4 relative">
      {/* Header */}
      <div className="flex items-center gap-2">
        {/* Made icon size responsive */}
        <Clipboard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        {/* Made title text responsive */}
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Notas compartidas</h2>
        <Badge variant="secondary" className="ml-auto text-xs">
          {notes.length}
        </Badge>
      </div>

      {/* Notes Grid - Single column as specified */}
      {/* Made gap and min-height responsive */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 min-h-[300px] sm:min-h-[400px]">
        {notes.map((note) => (
          <Card key={note.id} className="shadow-card hover:shadow-md transition-smooth">
            {/* Made card padding responsive */}
            <CardHeader className="pb-2 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-semibold leading-tight">{note.title}</CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Made card content padding responsive */}
            <CardContent className="pt-0 p-3 sm:p-4 space-y-3">
              {/* Content */}
              <div className="text-xs text-muted-foreground">
                <pre className="whitespace-pre-wrap font-sans leading-relaxed line-clamp-3">
                  {truncateContent(note.content)}
                </pre>
              </div>

              {/* Author and Date */}
              {/* Added gap and min-width for better mobile layout */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Made avatar size responsive */}
                  <Avatar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                    <AvatarFallback className="text-xs">
                      {note.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {/* Added truncate for long names */}
                  <span className="text-xs font-medium truncate">{note.author.name}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
                </div>

                {note.isRecent && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/20 text-secondary-foreground flex-shrink-0"
                  >
                    Reciente
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <Clipboard className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-2">No hay notas aún</h3>
            <p className="text-sm text-muted-foreground mb-4">Crea la primera nota compartida para tu grupo</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {/* Made floating button position and size responsive */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:shadow-xl transition-smooth bg-primary hover:bg-primary/90"
          onClick={() => setIsNoteModalOpen(true)}
        >
          {/* Made floating button icon size responsive */}
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="sr-only">Nueva nota</span>
        </Button>
      </div>

      <NoteModal open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen} onSubmit={handleAddNote} />
    </div>
  )
}
