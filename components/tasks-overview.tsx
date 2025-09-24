import { CheckCircle, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TasksOverview() {
  const tasks = [
    {
      id: 1,
      title: "Comprar ingredientes para cena",
      assignee: "María",
      avatar: "/loving-mother.png",
      initials: "MG",
      priority: "alta",
      dueTime: "18:00",
      status: "pending",
    },
    {
      id: 2,
      title: "Recoger a los niños del colegio",
      assignee: "Carlos",
      avatar: "/father-and-child.png",
      initials: "CG",
      priority: "media",
      dueTime: "15:30",
      status: "completed",
    },
    {
      id: 3,
      title: "Hacer la tarea de matemáticas",
      assignee: "Ana",
      avatar: "/daughter.jpg",
      initials: "AG",
      priority: "alta",
      dueTime: "20:00",
      status: "pending",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-destructive text-destructive-foreground"
      case "media":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-4 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-lg text-foreground">Tareas de Hoy</h3>
        <Badge variant="secondary" className="bg-primary text-primary-foreground">
          3 pendientes
        </Badge>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-smooth hover:bg-muted"
          >
            <div className="flex-shrink-0">
              {task.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <Clock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {task.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{task.assignee}</span>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-medium text-foreground">{task.dueTime}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
