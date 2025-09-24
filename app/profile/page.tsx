"use client"

import {
  Home,
  CheckSquare,
  FileText,
  User,
  Star,
  Settings,
  Trophy,
  Target,
  Award,
  Edit,
  Camera,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function ProfilePage() {
  const [showFamilyMenu, setShowFamilyMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-700/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-200/50 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Mi Perfil
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Settings className="w-4 h-4 mr-1" />
                Ajustes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          {/* Profile Header */}
          <section>
            <Card className="bg-gradient-to-br from-green-700 to-emerald-800 border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 -translate-x-12"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 translate-x-10"></div>
              <CardContent className="p-6 relative text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-1 shadow-lg">
                    <Avatar className="w-full h-full">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback className="bg-white text-green-600 font-bold text-2xl">TU</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-8 h-8 p-0 bg-white hover:bg-gray-100 text-green-600 rounded-full shadow-md"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Tu Nombre</h1>
                <p className="text-green-100 text-sm mb-4">Miembro de Familia González</p>
                <div className="flex items-center justify-center gap-4 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">245</div>
                    <p className="text-xs text-green-100">Puntos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3°</div>
                    <p className="text-xs text-green-100">Posición</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-green-100">Completadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Stats */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-green-100 to-emerald-200 border-green-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-800 mb-1">8</div>
                  <p className="text-green-700 text-xs font-medium">Tareas pendientes</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-coral-100 to-coral-200 border-coral-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 text-coral-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-coral-800 mb-1">5</div>
                  <p className="text-coral-700 text-xs font-medium">Logros obtenidos</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Progress to Next Level */}
          <section>
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Progreso al siguiente nivel</h3>
                  <Badge className="bg-green-100 text-green-700 border-green-300">Nivel 3</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">245 / 400 puntos</span>
                    <span className="text-green-600 font-medium">61%</span>
                  </div>
                  <Progress value={61} className="h-3" />
                  <p className="text-xs text-gray-500 text-center">155 puntos más para alcanzar el Nivel 4</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Achievements */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-coral-500" />
              <h2 className="text-xl font-bold text-gray-800">Logros recientes</h2>
            </div>

            <div className="space-y-3">
              <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">Racha de 7 días</h3>
                      <p className="text-sm text-gray-600">Completaste tareas 7 días seguidos</p>
                      <p className="text-xs text-yellow-600 font-medium">+50 puntos bonus</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">Nuevo</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">Colaborador estrella</h3>
                      <p className="text-sm text-gray-600">Ayudaste en 10 tareas familiares</p>
                      <p className="text-xs text-green-600 font-medium">Hace 3 días</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">Organizador experto</h3>
                      <p className="text-sm text-gray-600">Completaste 5 tareas de organización</p>
                      <p className="text-xs text-blue-600 font-medium">Hace 1 semana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Family Ranking */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-coral-500" />
              <h2 className="text-xl font-bold text-gray-800">Ranking familiar</h2>
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-yellow-100 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-coral-500 rounded-full p-0.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage src="/maria-avatar.jpg" />
                        <AvatarFallback className="bg-white text-coral-600 font-bold text-xs">M</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">María</p>
                      <p className="text-xs text-gray-600">380 puntos</p>
                    </div>
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-0.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage src="/carlos-avatar.jpg" />
                        <AvatarFallback className="bg-white text-green-600 font-bold text-xs">C</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Carlos</p>
                      <p className="text-xs text-gray-600">295 puntos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-green-100 rounded-lg border-2 border-green-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-0.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage src="/diverse-user-avatars.png" />
                        <AvatarFallback className="bg-white text-green-600 font-bold text-xs">TU</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Tú</p>
                      <p className="text-xs text-gray-600">245 puntos</p>
                    </div>
                    <Badge className="bg-green-600 text-white text-xs">Tu posición</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full p-0.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage src="/ana-avatar.jpg" />
                        <AvatarFallback className="bg-white text-blue-600 font-bold text-xs">A</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Ana</p>
                      <p className="text-xs text-gray-600">180 puntos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Account Actions */}
          <section>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm">
                <Edit className="w-5 h-5 mr-3" />
                Editar perfil
              </Button>
              <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm">
                <Settings className="w-5 h-5 mr-3" />
                Configuración
              </Button>
              <Button className="w-full justify-start bg-white hover:bg-red-50 text-red-600 border border-red-200 shadow-sm">
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar sesión
              </Button>
            </div>
          </section>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-md border-t border-green-200/50 shadow-lg z-50">
        <div className="max-w-md mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-around">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 tap-target text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2"
              >
                <Home className="w-5 h-5" />
                <span className="text-xs font-medium">Inicio</span>
              </Button>
            </Link>
            <Link href="/tasks">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 tap-target text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2"
              >
                <CheckSquare className="w-5 h-5" />
                <span className="text-xs font-medium">Tareas</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="tap-target text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-2 relative"
              onClick={() => setShowFamilyMenu(true)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <img src="/colorful-family-vector.jpg" alt="Familia" className="w-8 h-8 rounded-full object-cover" />
              </div>
              {/* Invitations indicator */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-xs font-bold text-white">2</span>
              </div>
            </Button>

            <Link href="/notes">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 tap-target text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2"
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs font-medium">Notas</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 tap-target bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Perfil</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
