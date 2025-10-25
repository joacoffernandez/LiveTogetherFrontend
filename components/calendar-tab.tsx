"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export default function CalendarTab() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDay, setSelectedDay] = useState(now.getDate()+1)

  const [familyId, setFamilyId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([]);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  interface Task {
    idTask: number
    name: string
    creator: { username: string, firstName: string }
    assignedTo: { username: string, firstName: string } | null
    timeValue: number
    timeUnit: string
    difficulty: { name: string, points: number}
    deadline: string
    completedByUser: boolean;
    completedByAdmin: boolean;
  }

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
      const storedFamilyId = localStorage.getItem("familyId")
      if (storedFamilyId) {
        setFamilyId(storedFamilyId)
      } else {
        console.warn("No se encontró familyId en localStorage")
      }
    }, [])

  useEffect(() => {
    if (!familyId) return

    loadTasks()
  }, [familyId])

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Calculate days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
  const days = ["D", "L", "M", "X", "J", "V", "S"]

  const getTasksForDay = (day: number) => {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    return tasks.filter((task) => task.deadline.split("T")[0] === dateStr)
  }

  return (
    <div className="p-6 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendario</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4 bg-white border-emerald-100">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {days.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayTasks = getTasksForDay(day)
            const isToday = day === 24 && currentMonth === 9 && currentYear === 2025
            const isSelected = day === selectedDay

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-sm relative transition-colors ${
                  isToday
                    ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                    : isSelected
                      ? "bg-emerald-100 border-emerald-400"
                      : dayTasks.length > 0
                        ? "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                        : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className={isToday ? "text-white" : ""}>{day}</span>
                {dayTasks.length > 0 && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {dayTasks.slice(0, 3).map((task, idx) => (
                      <div
                        key={idx}
                        className={`w-1 h-1 rounded-full ${
                          task.completedByUser ? "bg-gray-400" : isToday ? "bg-white" : "bg-emerald-600"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Tareas del {selectedDay} de {monthNames[currentMonth]}
        </h3>
        {getTasksForDay(selectedDay).length > 0 ? (
          getTasksForDay(selectedDay).map((task) => (
            <Card
              key={task.idTask}
              className={`p-3 border shadow-sm ${
                task.completedByUser ? "bg-gray-50 border-gray-200 opacity-60" : "bg-white border-emerald-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-semibold text-sm ${task.completedByUser ? "line-through text-muted-foreground" : ""}`}>
                    {task.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">Por {task.creator.firstName}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">{task.difficulty.points} pts</span>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-4 bg-white border-emerald-100">
            <p className="text-sm text-muted-foreground text-center">No hay tareas para este día</p>
          </Card>
        )}
      </div>
    </div>
  )
}
