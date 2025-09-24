"use client"

import { Home, CheckSquare, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Inicio", active: true },
    { icon: CheckSquare, label: "Tareas", active: false },
    { icon: FileText, label: "Notas", active: false },
    { icon: User, label: "Perfil", active: false },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 h-auto ${
              item.active ? "text-primary bg-blue-50" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}
