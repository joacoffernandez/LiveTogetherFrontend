"use client"

import { Users, Star, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GroupStatus() {
  return (
    <Card className="bg-white shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">Estado del grupo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Family tasks */}
          <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">12</div>
            <div className="text-xs text-gray-600">Tareas familiares</div>
            <div className="text-xs text-green-600 mt-1">pendientes</div>
          </div>

          {/* Aurapoints */}
          <div className="text-center p-3 bg-green-100 rounded-xl border border-green-200">
            <Star className="w-6 h-6 text-green-700 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">245</div>
            <div className="text-xs text-gray-600">Aurapoints</div>
            <div className="text-xs text-green-700 mt-1">+15 hoy</div>
          </div>

          {/* Active notes */}
          <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100 col-span-2">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">3</div>
            <div className="text-xs text-gray-600">Notas activas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
