"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFamilyContext } from "@/contexts/familyContext"
import { api } from "@/lib/api"

interface CreateTaskTabProps {
  onBack?: () => void
}

export default function CreateTaskTab({ onBack }: CreateTaskTabProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const { family } = useFamilyContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Validaciones básicas
      if (!family?.idFamily) {
        setError("No hay una familia seleccionada")
        return
      }

      if (!title.trim() || !description.trim() || !difficulty || !dueDate) {
        setError("Todos los campos son requeridos")
        return
      }

      // Mapear dificultad de string a número según tu enum del backend
      const difficultyMap: { [key: string]: number } = {
        "facil": 1,
        "medio": 2, 
        "dificil": 3
      }

      const difficultyNumber = difficultyMap[difficulty]

      if (!difficultyNumber) {
        setError("Dificultad no válida")
        return
      }

      // Preparar datos para la API
      const taskData = {
        name: title.trim(),
        description: description.trim(),
        familyId: family.idFamily,
        difficulty: difficultyNumber,
        deadline: new Date(dueDate).toISOString() // Convertir a formato ISO
      }

      console.log("Enviando tarea:", taskData)

      // 🔹 Hacer la petición POST usando tu API
      const result = await api.post('/task/create', taskData)

      if (result.success) {
        console.log("✅ Tarea creada exitosamente:", result.data)
        // Limpiar formulario
        setTitle("")
        setDescription("")
        setDifficulty("")
        setDueDate("")
        
        // Navegar de vuelta
        if (onBack) {
          onBack()
        } else {
          setError("Tarea creada exitosamente") // Por si no hay onBack
        }
      } else {
        setError(result.error || "Error al crear la tarea")
        console.error("❌ Error en la respuesta:", result)
      }

    } catch (err) {
      setError("Error de conexión con el servidor")
      console.error("❌ Error al crear tarea:", err)
    } finally {
      setIsSubmitting(false)
    }
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

  // Validar que la fecha no sea en el pasado
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
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

      {/* Mensaje de error */}
      {error && (
        <div className={`p-4 rounded-lg ${
          error.includes("éxito") 
            ? "bg-green-100 text-green-700 border border-green-200" 
            : "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {error}
        </div>
      )}

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </label>
        </Card>

        <Card className="p-4 bg-white border-emerald-100">
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground">Dificultad</span>
            <Select value={difficulty} onValueChange={setDifficulty} required disabled={isSubmitting}>
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
              min={getMinDate()}
              disabled={isSubmitting}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            La fecha no puede ser anterior a hoy
          </p>
        </Card>

        <Button 
          type="submit" 
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creando tarea...
            </div>
          ) : (
            "Crear Tarea"
          )}
        </Button>
      </form>

      {/* Información de depuración (opcional) */}
      <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg">
        <p>Familia seleccionada: {family?.name || "Ninguna"}</p>
        <p>ID Familia: {family?.idFamily || "No disponible"}</p>
      </div>
    </div>
  )
}