"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"

const mockUsers = [
  { id: 1, name: "Ana García", avatar: "/diverse-woman-portrait.png" },
  { id: 2, name: "Carlos López", avatar: "/diverse-man-portrait.png" },
  { id: 3, name: "María Rodríguez", avatar: "/diverse-woman-professional.png" },
  { id: 4, name: "Juan Pérez", avatar: "/diverse-man-casual.png" },
]

const priorities = [
  { value: "low", label: "Baja", color: "text-green-600" },
  { value: "medium", label: "Media", color: "text-yellow-600" },
  { value: "high", label: "Alta", color: "text-red-600" },
]

interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: any) => void
}

export function TaskModal({ open, onOpenChange, onSubmit }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeId: "",
    dueDate: "",
    priority: "medium",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const assignee = mockUsers.find((user) => user.id.toString() === formData.assigneeId)
    if (!assignee || !formData.title.trim()) return

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      assignee,
      dueDate: formData.dueDate,
      priority: formData.priority,
    }

    onSubmit(newTask)
    setFormData({
      title: "",
      description: "",
      assigneeId: "",
      dueDate: "",
      priority: "medium",
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nueva tarea</DialogTitle>
          <DialogDescription>Añade una nueva tarea al tablero. Completa todos los campos requeridos.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ej: Limpiar la cocina"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe los detalles de la tarea..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Asignado a *</Label>
              <Select value={formData.assigneeId} onValueChange={(value) => handleInputChange("assigneeId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar persona">
                    {formData.assigneeId && (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage
                            src={
                              mockUsers.find((u) => u.id.toString() === formData.assigneeId)?.avatar ||
                              "/placeholder.svg"
                            }
                            alt="Avatar"
                          />
                          <AvatarFallback className="text-xs">
                            {mockUsers
                              .find((u) => u.id.toString() === formData.assigneeId)
                              ?.name.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{mockUsers.find((u) => u.id.toString() === formData.assigneeId)?.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Fecha límite *</Label>
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prioridad</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <span className={priority.color}>{priority.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || !formData.assigneeId || !formData.dueDate}>
              Crear tarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
