"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface NoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (note: any) => void
}

export function NoteModal({ open, onOpenChange, onSubmit }: NoteModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) return

    const newNote = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      author: { name: "Ana García", avatar: "/diverse-woman-portrait.png" }, // Mock current user
      createdAt: new Date().toISOString(),
      isRecent: true,
    }

    onSubmit(newNote)
    setFormData({ title: "", content: "" })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nueva nota compartida</DialogTitle>
          <DialogDescription>Crea una nueva nota que será visible para todos los miembros del grupo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note-title">Título *</Label>
            <Input
              id="note-title"
              placeholder="Ej: Lista de la compra"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-content">Contenido *</Label>
            <Textarea
              id="note-content"
              placeholder="Escribe el contenido de la nota..."
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={8}
              className="resize-none"
              required
            />
            <div className="text-xs text-muted-foreground">{formData.content.length} caracteres</div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || !formData.content.trim()}>
              Crear nota
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
