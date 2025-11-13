"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { useFamilyContext } from "@/contexts/familyContext"

interface CreateFamilyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateFamilyModal({ isOpen, onClose }: CreateFamilyModalProps) {
  const [familyName, setFamilyName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { families, reloadFamilyContext } = useFamilyContext();

  const handleCreateFamily = async () => {
    if (!familyName.trim()) {
      setError("Por favor ingresa un nombre para la familia")
      return
    }

    if (families.length >= 3) {
        setError("No podes estar en mas de 3 familias")
        return 
    }

    try {
      setLoading(true)
      setError("")

      const result = await api.post('/family/create', {
        name: familyName.trim()
      })

      if (result.success) {
        console.log("Familia creada exitosamente:", result.data)
        setFamilyName("")
        onClose()

        reloadFamilyContext()
        router.refresh()
      } else {
        setError(result.error || "Error al crear la familia")
      }
    } catch (err) {
      setError("Error de conexión con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFamilyName("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6" onClick={handleClose}>
      <div className="bg-background rounded-2xl p-8 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Crear nueva familia</h3>
          <button 
            onClick={handleClose} 
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mostrar error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre de la familia"
          value={familyName}
          onChange={(e) => {
            setFamilyName(e.target.value)
            setError("") 
          }}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleCreateFamily()}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6 text-base"
          autoFocus
          disabled={loading}
        />
        <button
          onClick={handleCreateFamily}
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creando familia..." : "Crear familia"}
        </button>
      </div>
    </div>
  )
}