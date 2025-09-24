"use client"

import { Home, CheckSquare, FileText, User, Plus, Search, Pin, Edit3, Trash2, Heart, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function NotesPage() {
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Notas Familiares
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Nueva
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          {/* Search */}
          <section>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar notas..."
                className="pl-10 bg-white/80 backdrop-blur-sm border-green-200 focus:border-green-400"
              />
            </div>
          </section>

          {/* Stats */}
          <section>
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-green-100 to-emerald-200 border-green-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-800 mb-1">12</div>
                  <p className="text-green-700 text-xs font-medium">Total notas</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-coral-100 to-coral-200 border-coral-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-coral-800 mb-1">3</div>
                  <p className="text-coral-700 text-xs font-medium">Fijadas</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-1">5</div>
                  <p className="text-blue-700 text-xs font-medium">Compartidas</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Pinned Notes */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Pin className="w-5 h-5 text-coral-500" />
              <h2 className="text-xl font-bold text-gray-800">Notas fijadas</h2>
            </div>

            <div className="space-y-3">
              <Card className="bg-gradient-to-r from-coral-50 to-red-50 border-coral-200 shadow-sm relative">
                <div className="absolute top-3 right-3">
                  <Pin className="w-4 h-4 text-coral-500 fill-coral-500" />
                </div>
                <CardContent className="p-4">
                  <div className="pr-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Lista de compras</h3>
                    <p className="text-sm text-gray-600 mb-3">Leche, pan, huevos, tomates, cebolla, arroz, pollo...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-0.5">
                          <Avatar className="w-full h-full">
                            <AvatarImage src="/maria-avatar.jpg" />
                            <AvatarFallback className="bg-white text-green-600 font-bold text-xs">M</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-gray-500">María • Hace 2 horas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm relative">
                <div className="absolute top-3 right-3">
                  <Pin className="w-4 h-4 text-green-500 fill-green-500" />
                </div>
                <CardContent className="p-4">
                  <div className="pr-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Horarios de clases</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Ana: Lunes y miércoles 3pm. Carlos: Martes y jueves 4pm...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-coral-400 to-coral-500 rounded-full p-0.5">
                          <Avatar className="w-full h-full">
                            <AvatarImage src="/carlos-avatar.jpg" />
                            <AvatarFallback className="bg-white text-coral-600 font-bold text-xs">C</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-gray-500">Carlos • Ayer</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Notes */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Notas recientes</h2>
            </div>

            <div className="space-y-3">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Reunión escolar</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Recordar llevar los documentos de Ana. La reunión es mañana a las 3pm en el aula 205.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-0.5">
                        <Avatar className="w-full h-full">
                          <AvatarImage src="/ana-avatar.jpg" />
                          <AvatarFallback className="bg-white text-green-600 font-bold text-xs">A</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-gray-500">Ana • Hace 1 día</span>
                      <Badge className="text-xs bg-green-100 text-green-700 border-green-300">Importante</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-coral-600">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Ideas para el fin de semana</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Ir al parque, ver una película, hacer pizza casera, visitar a los abuelos...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full p-0.5">
                        <Avatar className="w-full h-full">
                          <AvatarImage src="/diverse-user-avatars.png" />
                          <AvatarFallback className="bg-white text-blue-600 font-bold text-xs">TU</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-gray-500">Tú • Hace 2 días</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="w-3 h-3" />
                        <span>3</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-coral-600">
                        <Heart className="w-4 h-4 fill-coral-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Receta de galletas</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    2 tazas de harina, 1 taza de azúcar, 1/2 taza de mantequilla, 2 huevos...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full p-0.5">
                        <Avatar className="w-full h-full">
                          <AvatarImage src="/maria-avatar.jpg" />
                          <AvatarFallback className="bg-white text-purple-600 font-bold text-xs">M</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-gray-500">María • Hace 3 días</span>
                      <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-300">Receta</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-coral-500 hover:text-coral-600">
                        <Heart className="w-4 h-4 fill-coral-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="pr-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Números importantes</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Pediatra: 555-0123, Plomero: 555-0456, Electricista: 555-0789...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full p-0.5">
                          <Avatar className="w-full h-full">
                            <AvatarImage src="/carlos-avatar.jpg" />
                            <AvatarFallback className="bg-white text-orange-600 font-bold text-xs">C</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-gray-500">Carlos • Hace 1 semana</span>
                        <Badge className="text-xs bg-orange-100 text-orange-700 border-orange-300">Contactos</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-coral-600">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-md">
                <div className="flex flex-col items-center gap-1">
                  <Plus className="w-5 h-5" />
                  <span className="text-sm font-medium">Nueva nota</span>
                </div>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white border-0 shadow-md">
                <div className="flex flex-col items-center gap-1">
                  <Pin className="w-5 h-5" />
                  <span className="text-sm font-medium">Fijar nota</span>
                </div>
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

            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 tap-target bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2"
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs font-medium">Notas</span>
            </Button>
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 tap-target text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">Perfil</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
