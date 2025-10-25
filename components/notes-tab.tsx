import { ImageIcon, LinkIcon, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotesTab() {
  const notes = [
    {
      id: 1,
      title: "Lista de compras",
      content: "Leche, pan, huevos, frutas, verduras para la semana",
      author: "Laura",
      date: "Hace 2 horas",
      hasImage: false,
      hasLink: false,
    },
    {
      id: 2,
      title: "Recordatorio: Cita médica",
      content: "Cita con el dentista el viernes a las 10:00 AM. No olvidar llevar la tarjeta del seguro.",
      author: "Pedro",
      date: "Ayer",
      hasImage: false,
      hasLink: false,
    },
    {
      id: 3,
      title: "Receta de paella",
      content: "Ingredientes y pasos para hacer la paella familiar del domingo",
      author: "María",
      date: "Hace 3 días",
      hasImage: true,
      hasLink: true,
    },
    {
      id: 4,
      title: "Contraseña WiFi",
      content: "Nueva contraseña del router: FamiliaGarcia2025",
      author: "Carlos",
      date: "Hace 1 semana",
      hasImage: false,
      hasLink: false,
    },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notas</h2>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-1" />
          Nueva
        </Button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <Card key={note.id} className="p-4 bg-white border-emerald-100 shadow-sm">
            <h3 className="font-semibold text-sm mb-2">{note.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{note.content}</p>

            {(note.hasImage || note.hasLink) && (
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
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{note.author}</span>
              <span>{note.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
