import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function FamilyMembers() {
  const members = [
    {
      name: "María García",
      role: "Mamá",
      avatar: "/loving-mother.png",
      initials: "MG",
      status: "activa",
      tasksCompleted: 8,
    },
    {
      name: "Carlos García",
      role: "Papá",
      avatar: "/father-and-child.png",
      initials: "CG",
      status: "activo",
      tasksCompleted: 6,
    },
    {
      name: "Ana García",
      role: "Hija",
      avatar: "/daughter.jpg",
      initials: "AG",
      status: "ocupada",
      tasksCompleted: 4,
    },
    {
      name: "Luis García",
      role: "Hijo",
      avatar: "/son.jpg",
      initials: "LG",
      status: "activo",
      tasksCompleted: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
      case "activo":
        return "bg-primary text-primary-foreground"
      case "ocupada":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-4 shadow-soft">
      <h3 className="font-serif font-bold text-lg mb-4 text-foreground">Familia García</h3>

      <div className="grid grid-cols-2 gap-3">
        {members.map((member, index) => (
          <div key={index} className="p-3 rounded-lg bg-muted/50 text-center transition-smooth hover:bg-muted">
            <Avatar className="h-12 w-12 mx-auto mb-2">
              <AvatarImage src={member.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground">{member.initials}</AvatarFallback>
            </Avatar>

            <h4 className="font-medium text-sm text-foreground mb-1">{member.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{member.role}</p>

            <Badge className={`text-xs mb-2 ${getStatusColor(member.status)}`}>{member.status}</Badge>

            <p className="text-xs text-muted-foreground">{member.tasksCompleted} tareas completadas</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
