"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PageHeader from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import { api } from "@/lib/api"
import { useFamilyContext } from "@/contexts/familyContext"

export default function CreateNotePage() {
  const router = useRouter()
  const { family } = useFamilyContext()
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

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

      if (!name.trim() || !content.trim()) {
        setError("Todos los campos son requeridos")
        return
      }

      // Preparar datos para la API
      const noteData = {
        name: name.trim(),
        familyId: family.idFamily,
        desc: content.trim()
      }

      console.log("Enviando nota:", noteData)

      // Hacer la petición POST usando la API
      const result = await api.post('/note/create', noteData)

      if (result.success) {
        console.log("✅ Nota creada exitosamente:", result.data)
        // Limpiar formulario
        setName("")
        setContent("")
        
        router.push("/note")
      } else {
        setError(result.error || "Error al crear la nota")
        console.error("❌ Error en la respuesta:", result)
      }

    } catch (err) {
      setError("Error de conexión con el servidor")
      console.error("❌ Error al crear nota:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (!isSubmitting) {
      router.back()
    }
  }

  return (
    <div className="w-full min-h-screen bg-background max-w-[430px] mx-auto">
      <PageHeader/>

      <div className="p-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack} 
            className="h-10 w-10"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>
          <h2 className="text-2xl font-bold">Crear Nota</h2>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="p-4 bg-white border-emerald-100">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-foreground">Nombre</span>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("") // Limpiar error cuando el usuario empiece a escribir
                }}
                placeholder="Ej: Lista de compras"
                className="mt-1 border-emerald-200"
                required
                disabled={isSubmitting}
              />
            </label>
          </Card>

          <Card className="p-4 bg-white border-emerald-100">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-foreground">Contenido</span>
              <Textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                  setError("") // Limpiar error cuando el usuario empiece a escribir
                }}
                placeholder="Escribe el contenido de la nota..."
                className="mt-1 border-emerald-200 min-h-[250px]"
                required
                disabled={isSubmitting}
              />
            </label>
          </Card>

          <Button 
            type="submit" 
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creando nota...
              </div>
            ) : (
              "Crear Nota"
            )}
          </Button>
        </form>
      </div>

      <BottomNavigation/>
    </div>
  )
}