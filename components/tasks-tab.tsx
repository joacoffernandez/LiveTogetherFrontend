"use client"

import { useEffect, useState } from "react"
import { Calendar, Plus, Sparkles } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { useUserContext } from '../contexts/userContext';
import { useFamilyContext } from "@/contexts/familyContext"
import LoadingScreen from "./loading"
import TaskItem from "./task-item"

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

interface TaskHook {
  tasks?: Task[];
  reloadTasks?: () => void;
}

interface TasksTabProps {
  onNavigateToCalendar?: () => void;
  onNavigateToCreateTask?: () => void;
  isWidget: boolean; 
}

type TaskFilter = "assigned" | "unassigned" | "review" | "all"

interface TimeInfo {
  number: number,
  text: string, 
  urgent: boolean, 
}

export default function TasksTab({ 
  tasks: hookTasks, 
  reloadTasks,
  onNavigateToCalendar, 
  onNavigateToCreateTask,
  isWidget, 
}: TaskHook & TasksTabProps) {

  const [activeFilter, setActiveFilter] = useState<TaskFilter>("assigned")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [autoAssignLoading, setAutoAssignLoading] = useState(false)

  const { family, isAdmin, familyMembers, reloadFamilyMembers, membersLoading } = useFamilyContext(); 

  const [tasks, setTasks] = useState<Task[]>(hookTasks || []);
  const { user, loading: userLoading } = useUserContext();

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

    setTasks(updatedTasks);

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
      setTasks(previousTasks);
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
      setTasks(previousTasks);
    }
  };

  const handleAutoAssign = async () => {
    if (!family?.idFamily) {
      console.error("No family ID available");
      return;
    }

    try {
      setAutoAssignLoading(true);
      const response = await api.post(`/task/automaticallyAsign/${family.idFamily}`);
      
      if (response.success) {
        console.log("Tareas asignadas automáticamente");
        // Reload tasks if reloadTasks function is provided
        if (reloadTasks) {
          reloadTasks();
        }
      } else {
        console.error("Error al asignar automáticamente:", response.error);
      }
    } catch (error) {
      console.error("Error al asignar automáticamente:", error);
    } finally {
      setAutoAssignLoading(false);
    }
  };

  // Filtrar tareas para el modo widget - solo tareas asignadas al usuario actual
  const widgetTasks = tasks.filter(task => 
    task.assignedTo?.username === user?.username && !task.completedByUser
  );

  const filteredTasks = tasks.filter((task) => {
    // user filter
    if (isAdmin && selectedUser !== "all") {
      if (task.assignedTo?.username !== selectedUser) return false
    }

    // type filter
    switch (activeFilter) {
      case "assigned":
        // Para usuarios normales: solo sus tareas asignadas y no completadas
        // Para admin: tareas asignadas que no están completadas por admin (incluye en revisión)
        if (!isAdmin) {
          return task.assignedTo?.username === user?.username && !task.completedByUser;
        } else {
          // Admin ve tareas asignadas que no están completadas por admin
          return task.assignedTo !== null && !task.completedByAdmin;
        }
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

  if (userLoading || !user || !reloadTasks) return <LoadingScreen/>

  if (isWidget) {
    return (
      <div className="space-y-4">
        {/* Header simplificado para widget */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tus Tareas</h2>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            {widgetTasks.length} pendientes
          </Badge>
        </div>

        <div className="space-y-3">
          {widgetTasks.length > 0 ? (
            widgetTasks.map((task) => (
              <TaskItem
                key={task.idTask}
                task={task}
                isAdmin={isAdmin}
                familyMembers={familyMembers}
                user={user}
                reloadTasks={reloadTasks}
                currentUser={user}
                onTaskAction={handleTaskAction}
                onReviewApproval={handleReviewApproval}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No tienes tareas pendientes</p>
            </div>
          )}
        </div>      
      </div>
    );
  }

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
          {tasks.filter((t) => t.assignedTo?.username === user?.username && !t.completedByUser).length} pendientes
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
          Pendientes
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
          </>
        )}
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
      </div>

      {isAdmin && activeFilter === "unassigned" && (
        <Button
          onClick={handleAutoAssign}
          disabled={autoAssignLoading || filteredTasks.length === 0}
          className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-emerald-400/30"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          <span>
            {autoAssignLoading 
              ? "Asignando automáticamente..." 
              : filteredTasks.length === 0
              ? "No hay tareas sin asignar"
              : `Asignar automáticamente (${filteredTasks.length})`
            }
          </span>
        </Button>
      )}

      {isAdmin && !membersLoading && (
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full border-emerald-200">
            <SelectValue placeholder="Filtrar por usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los usuarios</SelectItem>
            {familyMembers.map((member) => (
              <SelectItem key={member?.idFamilyUser} value={member.user?.username}>
                {member.user?.username == user?.username ? "Yo" : member.user?.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.idTask}
            task={task}
            isAdmin={isAdmin}
            familyMembers={familyMembers}
            user={user}
            reloadTasks={reloadTasks}
            currentUser={user}
            onTaskAction={handleTaskAction}
            onReviewApproval={handleReviewApproval}
          />
        ))}
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