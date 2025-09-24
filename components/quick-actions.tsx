import { Plus, Calendar, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "Nueva Tarea", color: "bg-primary" },
    { icon: MessageSquare, label: "Nota Rápida", color: "bg-secondary" },
    { icon: Calendar, label: "Evento", color: "bg-accent" },
    { icon: Users, label: "Reunión", color: "bg-muted" },
  ]

  return (
    <Card className="p-4 shadow-soft">
      <h3 className="font-serif font-bold text-lg mb-4 text-foreground">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-20 flex-col gap-2 border-border hover:bg-muted transition-smooth bg-transparent"
          >
            <div className={`p-2 rounded-full ${action.color}`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  )
}
