"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateTaskTabProps {
  onBack?: () => void
}

export default function CreateTaskTab({ onBack }: CreateTaskTabProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the task creation
    console.log("[v0] Creating task:", { title, description, difficulty, dueDate })
    // Navigate back after creation
    onBack?.()
  }

  const getDifficultyPoints = (diff: string) => {
    switch (diff) {
      case "facil":
        return 5
      case "medio":
        return 10
      case "dificil":
        return 15
      default:
        return 0
    }
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold">Crear Tarea</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="p-4 bg-white border-emerald-100">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground">Título</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Lavar los platos"
              className="mt-1 border-emerald-200"
              required
            />
          </label>
        </Card>

        <Card className="p-4 bg-white border-emerald-100">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground">Descripción</span>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe la tarea..."
              className="mt-1 border-emerald-200 min-h-[100px]"
              required
            />
          </label>
        </Card>

        <Card className="p-4 bg-white border-emerald-100">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground">Dificultad</span>
            <Select value={difficulty} onValueChange={setDifficulty} required>
              <SelectTrigger className="mt-1 border-emerald-200">
                <SelectValue placeholder="Selecciona la dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facil">
                  <div className="flex items-center justify-between w-full">
                    <span>Fácil</span>
                    <span className="ml-4 text-emerald-600 font-semibold">5 pts</span>
                  </div>
                </SelectItem>
                <SelectItem value="medio">
                  <div className="flex items-center justify-between w-full">
                    <span>Medio</span>
                    <span className="ml-4 text-emerald-600 font-semibold">10 pts</span>
                  </div>
                </SelectItem>
                <SelectItem value="dificil">
                  <div className="flex items-center justify-between w-full">
                    <span>Difícil</span>
                    <span className="ml-4 text-emerald-600 font-semibold">15 pts</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </label>
          {difficulty && (
            <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                Esta tarea otorgará <span className="font-bold">{getDifficultyPoints(difficulty)} puntos</span> al
                completarse
              </p>
            </div>
          )}
        </Card>

        <Card className="p-4 bg-white border-emerald-100">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground">Fecha límite</span>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 border-emerald-200"
              required
            />
          </label>
        </Card>

        <Button type="submit" className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
          Crear Tarea
        </Button>
      </form>
    </div>
  )
}
