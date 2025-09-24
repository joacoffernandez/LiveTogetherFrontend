"use client"

import { CheckCircle, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TaskSummary() {
  const completedTasks = 8
  const totalTasks = 13
  const pendingTasks = totalTasks - completedTasks

  return (
    <Card className="bg-white shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">Mis tareas pendientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-700 mb-1">{pendingTasks}</div>
              <p className="text-sm text-green-600">Tareas asignadas a ti</p>
            </div>
            <div className="bg-green-200 p-3 rounded-full">
              <Target className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>{completedTasks} completadas</span>
          </div>
          <div className="flex items-center space-x-1 text-green-700">
            <Clock className="w-4 h-4" />
            <span>{pendingTasks} pendientes</span>
          </div>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Ver todas las tareas</Button>
      </CardContent>
    </Card>
  )
}
