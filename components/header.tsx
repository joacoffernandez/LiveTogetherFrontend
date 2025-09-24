"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, ChevronDown, Settings, LogOut } from "lucide-react"

// Mock data for groups and user
const mockGroups = [
  { id: 1, name: "Familia García", members: 4, avatar: "/diverse-family-portrait.png" },
  { id: 2, name: "Casa Estudiantes", members: 6, avatar: "/diverse-students-studying.png" },
  { id: 3, name: "Piso Compartido", members: 3, avatar: "/modern-city-apartment.png" },
]

const mockUser = {
  name: "Ana García",
  email: "ana@example.com",
  avatar: "/diverse-woman-portrait.png",
}

export function Header() {
  const [selectedGroup, setSelectedGroup] = useState(mockGroups[0])

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-3 max-w-[1400px]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground hidden sm:block">LiveTogether</h1>
            <h1 className="text-lg font-semibold text-foreground sm:hidden">LT</h1>
          </div>

          {/* Group Selector - Responsive width */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-center max-w-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:min-w-[200px] justify-between bg-transparent"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src={selectedGroup.avatar || "/placeholder.svg"} alt={selectedGroup.name} />
                      <AvatarFallback className="text-xs">
                        {selectedGroup.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium truncate">{selectedGroup.name}</span>
                    <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                      {selectedGroup.members}
                    </Badge>
                  </div>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[200px] sm:w-[250px]">
                {mockGroups.map((group) => (
                  <DropdownMenuItem
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                      <AvatarFallback className="text-xs">
                        {group.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{group.name}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {group.members}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Group Button - Responsive */}
            <Button size="sm" className="flex items-center gap-1 flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Nuevo grupo</span>
            </Button>
          </div>

          {/* User Menu - Responsive */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2 flex-shrink-0">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                  <AvatarFallback>
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium text-sm truncate">{mockUser.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{mockUser.email}</div>
                </div>
                <ChevronDown className="w-4 h-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="px-2 py-1.5">
                <div className="font-medium">{mockUser.name}</div>
                <div className="text-sm text-muted-foreground">{mockUser.email}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
