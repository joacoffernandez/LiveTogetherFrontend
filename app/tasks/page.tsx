"use client"

import { Home, CheckSquare, FileText, User, Star, Plus, Filter, Search, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function TasksPage() {
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
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Mis Tareas
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
          {/* Search and Filter */}
          <section className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar tareas..."
                className="pl-10 bg-white/80 backdrop-blur-sm border-green-200 focus:border-green-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filtros
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Clock className="w-4 h-4 mr-1" />
                Hoy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Target className="w-4 h-4 mr-1" />
                Pendientes
              </Button>
            </div>
          </section>

          {/* Stats Overview */}
          <section>
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-green-100 to-emerald-200 border-green-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-800 mb-1">8</div>
                  <p className="text-green-700 text-xs font-medium">Pendientes</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-coral-100 to-coral-200 border-coral-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-coral-800 mb-1">3</div>
                  <p className="text-coral-700 text-xs font-medium">Vencen hoy</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-1">12</div>
                  <p className="text-blue-700 text-xs font-medium">Completadas</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tasks List */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Tareas pendientes</h2>
            </div>

            <div className="space-y-3">
              {/* Today's Tasks */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Hoy</h3>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 border-2 border-green-300 rounded-full flex flex-col items-center justify-center text-green-800 font-bold shadow-md flex-shrink-0">
                        <span className="text-lg">HOY</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 flex-1">Lavar los platos</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-green-400 text-green-400" />
                              <Star className="w-4 h-4 text-gray-300" />
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-bold text-green-600">5 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Lavar todos los platos del desayuno y almuerzo. Incluir ollas y sartenes.
                        </p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-coral-50 to-red-50 border-coral-200 shadow-sm relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <div className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-coral-100 to-coral-200 border-2 border-coral-300 rounded-full flex flex-col items-center justify-center text-coral-800 font-bold shadow-md flex-shrink-0">
                        <span className="text-lg">HOY</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 flex-1">Comprar medicinas</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-bold text-green-600">15 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ir a la farmacia y comprar las medicinas de mamá. Lista en la nevera.
                        </p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* This Week */}
              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Esta semana</h3>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-full flex flex-col items-center justify-center text-gray-800 font-bold shadow-md flex-shrink-0">
                        <span className="text-lg">15</span>
                        <span className="text-xs">ENE</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 flex-1">Organizar el closet</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-bold text-green-600">15 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ordenar y doblar toda la ropa de invierno. Separar lo que ya no se usa.
                        </p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-full flex flex-col items-center justify-center text-gray-800 font-bold shadow-md flex-shrink-0">
                        <span className="text-lg">18</span>
                        <span className="text-xs">ENE</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 flex-1">Limpiar el garaje</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                            </div>
                            <span className="text-sm font-bold text-green-600">30 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Organizar herramientas y limpiar el piso. Revisar qué se puede donar.
                        </p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-full flex flex-col items-center justify-center text-gray-800 font-bold shadow-md flex-shrink-0">
                        <span className="text-lg">22</span>
                        <span className="text-xs">ENE</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 flex-1">Reparar la bicicleta</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                              <Star className="w-4 h-4 fill-red-400 text-red-400" />
                            </div>
                            <span className="text-sm font-bold text-green-600">30 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Cambiar la cadena y ajustar los frenos. Llevar a revisión si es necesario.
                        </p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Completed Tasks */}
              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Completadas recientemente
                </h3>

                <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-sm opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 border-2 border-green-300 rounded-full flex flex-col items-center justify-center text-green-800 font-bold shadow-md flex-shrink-0">
                        <CheckSquare className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-600 flex-1 line-through">Sacar la basura</h3>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-green-400 text-green-400" />
                              <Star className="w-4 h-4 text-gray-300" />
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-bold text-green-600">+5 pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Completada ayer por la mañana</p>
                        <div className="flex justify-center">
                          <Button className="w-4/5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-medium rounded-lg py-2 transition-all duration-200 hover:shadow-lg">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Marcar como completada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 tap-target bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2"
            >
              <CheckSquare className="w-5 h-5" />
              <span className="text-xs font-medium">Tareas</span>
            </Button>

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
