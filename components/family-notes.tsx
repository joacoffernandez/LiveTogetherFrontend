import { MessageSquare, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function FamilyNotes() {
  const notes = [
    {
      id: 1,
      title: "Lista de la compra",
      content: "Leche, pan, huevos, frutas para el postre del domingo...",
      author: "María",
      avatar: "/loving-mother.png",
      initials: "MG",
      time: "hace 2h",
      reactions: 3,
    },
    {
      id: 2,
      title: "Recordatorio médico",
      content: "Cita con el pediatra para Ana el viernes a las 16:00",
      author: "Carlos",
      avatar: "/father-and-child.png",
      initials: "CG",
      time: "hace 5h",
      reactions: 1,
    },
  ]

  return (
    <Card className="p-4 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-lg text-foreground">Notas Familiares</h3>
        <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <MessageSquare className="h-4 w-4 mr-1" />
          Nueva
        </Button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="p-3 rounded-lg bg-muted/50 transition-smooth hover:bg-muted">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={note.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">{note.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-foreground">{note.title}</h4>
                  <span className="text-xs text-muted-foreground">{note.time}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {note.reactions}
                  </Button>
                  <span className="text-xs text-muted-foreground">por {note.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
