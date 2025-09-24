"use client"

import { Trophy, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function UserRanking() {
  const currentPosition = 3
  const pointsToNext = 50
  const progressToNext = 70 // percentage

  return (
    <Card className="bg-white shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">Mi ranking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current position */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div className="text-3xl font-bold text-primary">{currentPosition}°</div>
          </div>
          <p className="text-sm text-gray-600">Puesto actual</p>
        </div>

        {/* Progress to next */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progreso al siguiente puesto</span>
            <span className="font-medium text-primary">{pointsToNext} puntos</span>
          </div>
          <Progress value={progressToNext} className="h-2" />
          <p className="text-xs text-gray-500 text-center">A {pointsToNext} puntos del siguiente puesto</p>
        </div>

        {/* Trending indicator */}
        <div className="flex items-center justify-center space-x-1 text-secondary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+2 posiciones esta semana</span>
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          Ver ranking completo
        </Button>
      </CardContent>
    </Card>
  )
}
