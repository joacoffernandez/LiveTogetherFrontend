"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Plus, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { TaskModal } from "@/components/task-modal"

// Mock data for tasks
const mockTasks = {
  pending: [
    {
      id: 1,
      title: "Limpiar la cocina",
      assignee: { name: "Ana García", avatar: "/diverse-woman-portrait.png" },
      dueDate: "2024-01-15",
      priority: "high",
      description: "Limpiar encimeras, fregar platos y organizar despensa",
    },
    {
      id: 2,
      title: "Comprar comida",
      assignee: { name: "Carlos López", avatar: "/diverse-man-portrait.png" },
      dueDate: "2024-01-16",
      priority: "medium",
      description: "Lista de la compra semanal",
    },
  ],
  inProgress: [
    {
      id: 3,
      title: "Reparar grifo",
      assignee: { name: "María Rodríguez", avatar: "/diverse-woman-professional.png" },
      dueDate: "2024-01-14",
      priority: "high",
      description: "El grifo de la cocina gotea",
    },
  ],
  completed: [
    {
      id: 4,
      title: "Sacar la basura",
      assignee: { name: "Juan Pérez", avatar: "/diverse-man-casual.png" },
      dueDate: "2024-01-13",
      priority: "low",
      description: "Basura orgánica y reciclaje",
    },
  ],
}

const columns = [
  {
    id: "pending",
    title: "Pendientes",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "inProgress",
    title: "En Progreso",
    icon: AlertCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "completed",
    title: "Completadas",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
}

export function TaskBoard() {
  const [tasks, setTasks] = useState(mockTasks)
  const [draggedTask, setDraggedTask] = useState<any>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [activeColumn, setActiveColumn] = useState<string>("pending")

  const handleDragStart = (e: React.DragEvent, task: any, columnId: string) => {
    setDraggedTask({ ...task, sourceColumn: columnId })
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault()

    if (!draggedTask || draggedTask.sourceColumn === targetColumn) {
      setDraggedTask(null)
      return
    }

    setTasks((prev) => {
      const newTasks = { ...prev }

      // Remove from source column
      newTasks[draggedTask.sourceColumn as keyof typeof newTasks] = newTasks[
        draggedTask.sourceColumn as keyof typeof newTasks
      ].filter((task) => task.id !== draggedTask.id)

      // Add to target column
      newTasks[targetColumn as keyof typeof newTasks] = [
        ...newTasks[targetColumn as keyof typeof newTasks],
        { ...draggedTask, sourceColumn: undefined },
      ]

      return newTasks
    })

    setDraggedTask(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  }

  const isOverdue = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    return dueDate < today
  }

  const handleAddTask = (newTask: any) => {
    setTasks((prev) => ({
      ...prev,
      [activeColumn]: [...prev[activeColumn as keyof typeof prev], newTask],
    }))
  }

  const openTaskModal = (columnId: string) => {
    setActiveColumn(columnId)
    setIsTaskModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Made title responsive */}
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Tablero de Tareas</h2>
      </div>

      {/* Enhanced responsive grid - mobile stacking, tablet 2 cols, desktop 3 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {columns.map((column) => {
          const columnTasks = tasks[column.id as keyof typeof tasks]
          const Icon = column.icon

          return (
            <div
              key={column.id}
              className="space-y-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              {/* Made padding responsive */}
              <div className={`${column.bgColor} rounded-lg p-3 sm:p-4 border`}>
                <div className="flex items-center gap-2 mb-2">
                  {/* Made icon size responsive */}
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${column.color}`} />
                  {/* Made title text responsive */}
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">{column.title}</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              {/* Task Cards */}
              {/* Made min-height responsive */}
              <div className="space-y-3 min-h-[300px] sm:min-h-[400px]">
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                    className="cursor-move hover:shadow-md transition-smooth shadow-card"
                  >
                    {/* Made card padding responsive */}
                    <CardHeader className="pb-2 p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
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
                      {/* Description */}
                      <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

                      {/* Assignee */}
                      <div className="flex items-center gap-2">
                        {/* Made avatar size responsive */}
                        <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {/* Added truncate for long names */}
                        <span className="text-xs font-medium truncate">{task.assignee.name}</span>
                      </div>

                      {/* Due Date and Priority */}
                      {/* Added gap for better mobile spacing */}
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`flex items-center gap-1 text-xs ${
                            isOverdue(task.dueDate) ? "text-red-600" : "text-muted-foreground"
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {/* Added truncate for date */}
                          <span className="truncate">{formatDate(task.dueDate)}</span>
                        </div>

                        <Badge
                          variant="outline"
                          className={`text-xs flex-shrink-0 ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                        >
                          {priorityLabels[task.priority as keyof typeof priorityLabels]}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                {/* Made button height and text size responsive */}
                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-12 border-dashed border-2 hover:bg-accent/50 transition-smooth bg-transparent text-xs sm:text-sm"
                  onClick={() => openTaskModal(column.id)}
                >
                  {/* Made icon size responsive */}
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Añadir tarea
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <TaskModal open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen} onSubmit={handleAddTask} />
    </div>
  )
}
