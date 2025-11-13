// components/TaskItem.tsx
import { CheckSquare, UserPlus, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

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

interface TimeInfo {
  number: number,
  text: string, 
  urgent: boolean, 
}

interface TaskItemProps {
  task: Task
  isAdmin: boolean
  currentUser: { username: string; firstName: string } | null
  onTaskAction: (taskId: number) => void
  onReviewApproval: (taskId: number) => void
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
  currentUser, 
  onTaskAction, 
  onReviewApproval 
}: TaskItemProps) {
  const isUnassigned = !task.assignedTo?.username
  const isUnderReview = task.completedByUser && !task.completedByAdmin
  const isAssignedToOther = task.assignedTo && task.assignedTo.username !== currentUser?.username
  const timeInfo: TimeInfo = getTimeRemaining(task.deadline); 

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
        {isAssignedToOther ? (
          <div></div>
        ) : (
          <div className="flex flex-col gap-2">
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

            {isAdmin && isUnderReview && (
              <button
                onClick={() => onReviewApproval(task.idTask)}
                className="w-6 h-6 rounded border-2 border-blue-400 hover:bg-blue-50 hover:border-blue-600 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}