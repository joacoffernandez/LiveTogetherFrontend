// components/TaskItem.tsx
import { useState, useRef, useEffect } from "react"
import { CheckSquare, UserPlus, CheckCircle2, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { api } from "@/lib/api"

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

interface FamilyMember {
  idFamilyUser: string;
  idUser: string;
  idRole: number;
  points: number;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
  completedTasks: number;
}

interface TimeInfo {
  number: number,
  text: string, 
  urgent: boolean, 
}

interface User {
  idUser: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface TaskItemProps {
  task: Task
  isAdmin: boolean
  familyMembers: FamilyMember[]
  user: User
  reloadTasks: () => void
  currentUser: { username: string; firstName: string } | null
  onTaskAction: (taskId: number) => void
  onReviewApproval: (taskId: number) => void
  //onTaskUpdate?: () => void // Nueva prop para actualizar la lista después de asignar
}

function getTimeRemaining(isoDateString: string): TimeInfo {
  const dueDate = new Date(isoDateString);
  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();

  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (Math.abs(diffHours) < 24) {
    if (Math.abs(diffHours) < 3) {
      const minutes = Math.floor(diffMs / (1000 * 60));
      return { number: minutes, text: `MIN`, urgent: true };
    }
    const hours = Math.floor(diffHours);
    if (hours === 1) return { number: 1, text: "HORA", urgent: true };
    return { number: hours, text: `HORAS`,urgent: true };
  } else {
    const days = Math.floor(diffDays);
    if (days === 1) return { number: 1, text: "DÍA", urgent: false };
    return { number: days, text: `DÍAS`,  urgent: false };
  }
}

export default function TaskItem({ 
  task, 
  isAdmin, 
  familyMembers,
  user,
  reloadTasks,
  currentUser, 
  onTaskAction, 
  onReviewApproval,
  //onTaskUpdate 
}: TaskItemProps) {
  const isUnassigned = !task.assignedTo?.username
  const isUnderReview = task.completedByUser && !task.completedByAdmin
  const isAssignedToOther = task.assignedTo && task.assignedTo.username !== currentUser?.username
  const timeInfo: TimeInfo = getTimeRemaining(task.deadline);
  
  const [showAssignMenu, setShowAssignMenu] = useState(false)
  const [assignLoading, setAssignLoading] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAssignMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAssignToUser = async (userId: string) => {
    try {
      setAssignLoading(true)
      const result = await api.post(`/task/assign/${task.idTask}/${userId}`, {})
      
      if (result.success) {
        console.log("✅ Tarea asignada exitosamente")
        reloadTasks()
        setShowAssignMenu(false)

      } else {
        console.error("❌ Error al asignar tarea:", result.error)
      }
    } catch (err) {
      console.error("❌ Error de conexión:", err)
    } finally {
      setAssignLoading(false)
    }
  }

  const handleAdminAssignClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowAssignMenu(!showAssignMenu)
  }

  return (
    <Card
      key={task.idTask}
      className={`p-4 border-2 shadow-sm transition-all ${
        task.status === "completed" ? "bg-white border-emerald-100" : "bg-white border-emerald-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Time Display */}
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

        {/* Task Content */}
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
            <span>Por <span className="text-emerald-500 font-medium">{task.creator.firstName}</span></span>
            {task.assignedTo && (
              <>
                <span>•</span>
                <span>Para <span className="text-emerald-500 font-medium">{task.assignedTo.firstName}</span></span>
              </>
            )}
            <span>•</span>
            <span className="text-emerald-600 font-semibold">{task.difficulty.points} pts</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 relative" ref={menuRef}>
          {isAssignedToOther ? (
            <div></div>
          ) : (
            <>
              {/* Botón para admin asignar tarea no asignada */}
              {isUnassigned && isAdmin ? (
                <div className="relative">
                  <button
                    onClick={handleAdminAssignClick}
                    disabled={assignLoading}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      assignLoading
                        ? "border-gray-300 bg-gray-100"
                        : "border-blue-400 hover:bg-blue-50 hover:border-blue-600"
                    }`}
                  >
                    {assignLoading ? (
                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <MoreVertical className="w-4 h-4 text-blue-600" />
                    )}
                  </button>

                  {/* Menú desplegable */}
                  {showAssignMenu && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-600">Asignar a:</p>
                      </div>
                      {familyMembers.map((member) => (
                        <button
                          key={member.idUser}
                          onClick={() => handleAssignToUser(member.idUser)}
                          disabled={assignLoading}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-emerald-100 hover:cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          <div className="min-w-6 min-h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-600">
                            {member.user.firstName[0]}
                          </div>
                          <span className="truncate">{member.user.username === user.username ? (<>Tu</>) : (<>{member.user.firstName} {member.user.lastName}</>)} </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Botón normal para usuarios no-admin o tareas asignadas */
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskAction(task.idTask);
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
              )}
            </>
          )}

          {/* Botón de revisión para admin */}
          {isAdmin && isUnderReview && (
            <button
              onClick={() => onReviewApproval(task.idTask)}
              className="w-6 h-6 rounded border-2 border-blue-400 hover:bg-blue-50 hover:border-blue-600 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}