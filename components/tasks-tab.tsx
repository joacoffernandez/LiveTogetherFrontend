"use client"

import { useEffect, useState } from "react"
import { Calendar, CheckSquare, UserPlus, CheckCircle2, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { useUserContext } from '../contexts/userContext';

interface Task {
  idTask: number
  name: string
  description: string
  creator: { username: string, firstName: string }
  assignedTo: { username: string, firstName: string } | null
  timeValue: number
  timeUnit: string
  urgent: boolean
  difficulty: { name: string, points: number}
  deadline: string
  completedByUser: boolean;
  completedByAdmin: boolean;
  status: string
}

interface TasksTabProps {
  onNavigateToCalendar?: () => void
  onNavigateToCreateTask?: () => void // Added prop for navigation to create task
}

type TaskFilter = "assigned" | "unassigned" | "review" | "all"

function getTimeRemaining(isoDateString: string) {
  const dueDate = new Date(isoDateString);
  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();

  if (diffMs <= 0) return { text: "VENCIDA", urgent: false };

  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 24) {
    if (diffHours < 1) {
      const minutes = Math.floor(diffMs / (1000 * 60));
      return { number: minutes, text: `MIN`, urgent: true };
    }
    const hours = Math.floor(diffHours);
    return { number: hours, text: `HORAS`,urgent: true };
  } else {
    const days = Math.floor(diffDays);
    if (days === 1) return { text: "1 DÍA", color: "yellow", urgent: false };
    return { number: days, text: `DÍAS`,  urgent: false };
  }
}

export default function TasksTab({ onNavigateToCalendar, onNavigateToCreateTask }: TasksTabProps) {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("assigned")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [familyId, setFamilyId] = useState<string | null>(null)
  const isAdmin = true // This would come from auth context in real app

  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
      const storedFamilyId = localStorage.getItem("idFamily")
      if (storedFamilyId) {
        setFamilyId(storedFamilyId)
      } else {
        console.warn("No se encontró familyId en localStorage")
      }
    }, [])

  const loadTasks = async () => {
    try {
      const [assignedRes, unassignedRes, underReviewRes] = await Promise.all([
        api.get(`/task/assigned/uncompleted/${familyId}`),
        api.get(`/task/unassigned/${familyId}`),
        api.get(`/task/underreview/${familyId}`),
      ])

      console.log("Tareas pendientes:", assignedRes.data.tasks)
      console.log("Tareas no asignadas:", unassignedRes.data.tasks)
      console.log("Tareas underreview:", underReviewRes.data.tasks)

      setTasks([
        ...assignedRes.data.tasks,
        ...unassignedRes.data.tasks,
        ...underReviewRes.data.tasks,
      ])

    } catch (err) {
      console.error("Error cargando tareas:", err)
    }
  }

  useEffect(() => {
    if (!familyId) return

    loadTasks()
  }, [familyId])


  const familyMembers = ["María", "Pedro", "Laura", "Carlos"]

const handleTaskAction = async (taskId: number) => {

  const previousTasks = [...tasks];
  const updatedTasks = tasks.map(task => {
    if (task.idTask !== taskId) return task;

    // asignar tarea
    if (!task.assignedTo) {
      if (!user?.username || !user?.firstName) return task;
      return {
        ...task,
        assignedTo: { username: user.username, firstName: user.firstName },
      };
    }

    // marcar / desmarcar
    return { ...task, completedByUser: !task.completedByUser };
  });

  setTasks(updatedTasks); // actualiza el frontend de una

  // luego hace los cambios en el backend, en caso de error revierte el frontend
  try {
    const currentTask = updatedTasks.find(t => t.idTask === taskId);
    if (!currentTask) return;

    if (!previousTasks.find(t => t.idTask === taskId)?.assignedTo) {
      await api.post(`/task/autoassign/${taskId}`);
    } else {
      if (updatedTasks.find(t => t.idTask === taskId)?.completedByUser) {
        await api.post(`/task/complete/user/${taskId}`);
      } else {
        await api.post(`/task/revertcompletion/${taskId}`);
      }
      
    }

  } catch (err) {
    console.error("Error actualizando tarea:", err);
    setTasks(previousTasks); // revertir cambios en caso de error
  } finally {

    await loadTasks();
  }
};


  const handleReviewApproval = async (taskId: number) => {
    const previousTasks = [...tasks];

    const newTasks = tasks.map(task => {
      if (task.idTask !== taskId) return task;
      return { ...task, completedByAdmin: true };
    });
    setTasks(newTasks);

    try {
      await api.post(`/task/complete/admin/${taskId}`);

    } catch (err) {
      console.error("Error aprobando tarea:", err);
      setTasks(previousTasks); // revertir
    } finally {
      await loadTasks();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    // user filter
    if (isAdmin && selectedUser !== "all") {
      if (task.assignedTo?.username !== selectedUser) return false
    }

    // type filter
    switch (activeFilter) {
      case "assigned":
        return task.assignedTo?.username === user?.username && !task.completedByUser // Current user's tasks
      case "unassigned":
        return !task.assignedTo
      case "review":
        return task.completedByUser && !task.completedByAdmin
      case "all":
        return true
      default:
        return true
    }
  })

  return (
    <div className="p-6 space-y-4 pb-24">
      <Button
        onClick={onNavigateToCalendar}
        variant="outline"
        className="w-full h-14 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-transparent"
      >
        <Calendar className="w-5 h-5 mr-2" />
        <span className="font-semibold">Calendario</span>
      </Button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tareas</h2>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {filteredTasks.filter((t) => t.assignedTo?.username === user?.username && !t.completedByUser).length} pendientes
        </Badge>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === "assigned" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("assigned")}
          className={
            activeFilter === "assigned"
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "border-emerald-200 hover:bg-emerald-50"
          }
        >
          Mis tareas
        </Button>
        <Button
          variant={activeFilter === "unassigned" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("unassigned")}
          className={
            activeFilter === "unassigned"
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "border-emerald-200 hover:bg-emerald-50"
          }
        >
          Sin asignar
        </Button>
        {isAdmin && (
          <>
            <Button
              variant={activeFilter === "review" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("review")}
              className={
                activeFilter === "review"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-emerald-200 hover:bg-emerald-50"
              }
            >
              En revisión
            </Button>
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={
                activeFilter === "all"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-emerald-200 hover:bg-emerald-50"
              }
            >
              Todas
            </Button>
          </>
        )}
      </div>

      {isAdmin && (
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full border-emerald-200">
            <SelectValue placeholder="Filtrar por usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los usuarios</SelectItem>
            {familyMembers.map((member) => (
              <SelectItem key={member} value={member}>
                {member}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isUnassigned = !task.assignedTo?.username
          const isUnderReview = task.completedByUser && !task.completedByAdmin
          const timeInfo = getTimeRemaining(task.deadline)

          return (
            <Card
              key={task.idTask}
              className={`p-4 border shadow-sm transition-all ${
                task.status === "completed" ? "bg-white border-emerald-100" : "bg-white border-emerald-100"
              }`}
            >
              <div className="flex items-center gap-3">
           
                <div
                  className={`flex flex-col items-center justify-center flex-shrink-0 min-w-[50px] transition-opacity ${
                    task.completedByUser ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold leading-none ${
                      task.completedByUser  ? "text-gray-400" : timeInfo.urgent ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    {timeInfo.number}
                  </span>
                  <span
                    className={`text-[10px] uppercase mt-0.5 ${
                      task.completedByUser
                        ? "text-gray-400"
                        : timeInfo.urgent
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {timeInfo.text}
                  </span>
                </div>

                {/* Task Content - with opacity transition when completed */}
                <div
                  className={`flex-1 min-w-0 transition-opacity ${
                    task.completedByUser ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <h3
                    className={`font-semibold text-sm mb-1 ${
                      task.completedByUser ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Por {task.creator.firstName}</span>
                    {task.assignedTo && (
                      <>
                        <span>•</span>
                        <span>Para {task.assignedTo.firstName}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{task.difficulty.points} pts</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskAction(task.idTask);
                    }}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.completedByUser
                        ? "bg-emerald-600 border-emerald-600"
                        : isUnassigned
                          ? "border-blue-400 hover:bg-blue-50 hover:border-blue-600"
                          : "border-gray-300 hover:border-emerald-600"
                    }`}
                  >
                    {task.completedByUser ? (
                      <CheckSquare className="w-4 h-4 text-white" />
                    ) : isUnassigned ? (
                      <UserPlus className="w-4 h-4 text-blue-600" />
                    ) : null}
                  </button>


                  {isAdmin && isUnderReview && (
                    <button
                      onClick={() => handleReviewApproval(task.idTask)}
                      className="w-6 h-6 rounded border-2 border-blue-400 hover:bg-blue-50 hover:border-blue-600 flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Button
        onClick={onNavigateToCreateTask}
        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span>Crear Tarea</span>
      </Button>
    </div>
  )
}
