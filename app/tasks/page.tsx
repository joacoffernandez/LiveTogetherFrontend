"use client"

import { useEffect, useState } from "react"
import { Home, CheckSquare, FileText, User, Star, Plus, Filter, Search, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { api } from '@/lib/api';
import { Checkbox } from "@/components/ui/checkbox"

function getTimeRemaining(isoDateString: string) {
  const dueDate = new Date(isoDateString);
  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();

  if (diffMs <= 0) return { text: "VENCIDA", color: "red", isUrgent: false };

  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 24) {
    if (diffHours < 1) {
      const minutes = Math.floor(diffMs / (1000 * 60));
      return { text: `${minutes} MIN`, color: "red", isUrgent: true };
    }
    const hours = Math.floor(diffHours);
    return { text: `${hours} HORAS`, color: "red", isUrgent: true };
  } else {
    const days = Math.floor(diffDays);
    if (days === 1) return { text: "1 DÍA", color: "yellow", isUrgent: false };
    return { text: `${days} DÍAS`, color: "green", isUrgent: false };
  }
}

export default function TasksPage() {
  const [showFamilyMenu, setShowFamilyMenu] = useState(false)
  const [assignedTasks, setAssignedTasks] = useState<any[]>([])
  const [unassignedTasks, setUnassignedTasks] = useState<any[]>([])
  const [underReviewTasks, setUnderReviewTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [familyId, setFamilyId] = useState<string | null>(null)


  useEffect(() => {
    const storedFamilyId = localStorage.getItem("activeFamilyId")
    if (storedFamilyId) setFamilyId(storedFamilyId)
  }, [])


useEffect(() => {
    const storedFamilyId = localStorage.getItem("activeFamilyId")
    if (storedFamilyId) {
      setFamilyId(storedFamilyId)
    } else {
      console.warn("No se encontró familyId en localStorage")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!familyId) return

    const loadTasks = async () => {
      setLoading(true)
      try {
        const [assignedRes, unassignedRes, underReviewRes] = await Promise.all([
          api.get(`/task/assigned/uncompleted/${familyId}`),
          api.get(`/task/unassigned/${familyId}`),
          api.get(`/task/underreview/${familyId}`),
        ])

        console.log("Tareas underreview:", underReviewRes.data.tasks)

        setAssignedTasks(assignedRes.data.tasks || [])
        setUnassignedTasks(unassignedRes.data.tasks || [])
        setUnderReviewTasks(underReviewRes.data.tasks || [])
      } catch (err) {
        console.error("Error cargando tareas:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [familyId])

  // 🔹 UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-200/50 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Mis Tareas
            </span>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-1" />
            Nueva
          </Button>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10 max-w-md mx-auto">
        {loading ? (
          <p className="text-center text-gray-600 mt-10">Cargando tareas...</p>
        ) : (
          <>
            {/* 🔹 Asignadas */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                <CheckSquare className="w-5 h-5 text-green-500" />
                Asignadas
              </h2>
              {assignedTasks.length > 0 ? (assignedTasks.map((task) => {
                const timeInfo = getTimeRemaining(task.deadline)
                const difficultyConfig = {
                  1: { stars: 1, color: "green" },
                  2: { stars: 2, color: "orange" },
                  3: { stars: 3, color: "red" },
                }
                const config = difficultyConfig[task.idDifficulty as keyof typeof difficultyConfig]

                return (
                  <Card
                    key={task.id}
                    className={`${timeInfo.isUrgent ? "bg-gradient-to-r" : "bg-gradient-to-r"} relative`}
                  >
                    {timeInfo.isUrgent && (
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
                    )}
                    <CardContent className="px-3 py-1">
                      <div className="flex gap-4 items-center">

                        <div
                          className={`w-16 h-16 ${
                            timeInfo.color === "green"
                              ? "border-2 border-green-300 text-green-800"
                              : timeInfo.color === "red"
                                ? "bg-red border-2 border-red-300 text-red-800"
                                : timeInfo.color === "yellow"
                                  ? "bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 text-purple-800"
                                  : "bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300 text-red-800"
                          } rounded-full flex flex-col items-center justify-center font-bold shadow-md flex-shrink-0`}
                        >

                          <span className="text-xl">{timeInfo.text.split(" ")[0]}</span>
                          <span className="text-xs">{timeInfo.text.split(" ")[1] || ""}</span>

                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between  flex-wrap">
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{task.name}</h3>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 3 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < config.stars
                                        ? `fill-${config.color}-400 text-${config.color}-400`
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                           
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>

                        <div className="">
                          <Checkbox
                            checked={task.completed}
                            //onCheckedChange={() => toggleTaskCompletion(task.idTask)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })) : (
                <p className="text-gray-500 text-sm">No hay tareas asignadas.</p>
              )}
            </section>

            {/* 🔹 Sin asignar */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-emerald-500" />
                Sin asignar
              </h2>
              {unassignedTasks.length > 0 ? (unassignedTasks.map((task) => {
                const timeInfo = getTimeRemaining(task.deadline)
                const difficultyConfig = {
                  1: { stars: 1, color: "green" },
                  2: { stars: 2, color: "orange" },
                  3: { stars: 3, color: "red" },
                }
                const config = difficultyConfig[task.idDifficulty as keyof typeof difficultyConfig]

                return (
                  <Card
                    key={task.id}
                    className={`${timeInfo.isUrgent ? "bg-gradient-to-r" : "bg-gradient-to-r"} relative`}
                  >
                    {timeInfo.isUrgent && (
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
                    )}
                    <CardContent className="px-3 py-1">
                      <div className="flex gap-4 items-center">

                        <div
                          className={`w-16 h-16 ${
                            timeInfo.color === "green"
                              ? "border-2 border-green-300 text-green-800"
                              : timeInfo.color === "red"
                                ? "bg-red border-2 border-red-300 text-red-800"
                                : timeInfo.color === "yellow"
                                  ? "bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 text-purple-800"
                                  : "bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300 text-red-800"
                          } rounded-full flex flex-col items-center justify-center font-bold shadow-md flex-shrink-0`}
                        >

                          <span className="text-xl">{timeInfo.text.split(" ")[0]}</span>
                          <span className="text-xs">{timeInfo.text.split(" ")[1] || ""}</span>

                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between  flex-wrap">
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{task.name}</h3>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 3 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < config.stars
                                        ? `fill-${config.color}-400 text-${config.color}-400`
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                       
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>

                        <div className="">
                          <Checkbox
                            checked={task.completed}
                            //onCheckedChange={() => toggleTaskCompletion(task.idTask)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })) : (
                <p className="text-gray-500 text-sm">No hay tareas asignadas.</p>
              )}
            </section>

            {/* 🔹 Bajo revisión */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                Bajo revisión
              </h2>
              {underReviewTasks.length > 0 ? (underReviewTasks.map((task) => {
                const timeInfo = getTimeRemaining(task.deadline)
                const difficultyConfig = {
                  1: { stars: 1, color: "green" },
                  2: { stars: 2, color: "orange" },
                  3: { stars: 3, color: "red" },
                }
                const config = difficultyConfig[task.idDifficulty as keyof typeof difficultyConfig]

                return (
                  <Card
                    key={task.id}
                    className={`${timeInfo.isUrgent ? "bg-gradient-to-r" : "bg-gradient-to-r"} relative`}
                  >
                    {timeInfo.isUrgent && (
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
                    )}
                    <CardContent className="px-3 py-1">
                      <div className="flex gap-4 items-center">

                        <div
                          className={`w-16 h-16 ${
                            timeInfo.color === "green"
                              ? "border-2 border-green-300 text-green-800"
                              : timeInfo.color === "red"
                                ? "bg-red border-2 border-red-300 text-red-800"
                                : timeInfo.color === "yellow"
                                  ? "bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 text-purple-800"
                                  : "bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300 text-red-800"
                          } rounded-full flex flex-col items-center justify-center font-bold shadow-md flex-shrink-0`}
                        >

                          <span className="text-xl">{timeInfo.text.split(" ")[0]}</span>
                          <span className="text-xs">{timeInfo.text.split(" ")[1] || ""}</span>

                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between  flex-wrap">
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{task.name}</h3>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 3 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < config.stars
                                        ? `fill-${config.color}-400 text-${config.color}-400`
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
              
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>

                        <div className="">
                          <Checkbox
                            checked={task.completed}
                            //onCheckedChange={() => toggleTaskCompletion(task.idTask)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })) : (
                <p className="text-gray-500 text-sm">No hay tareas asignadas.</p>
              )}
            </section>
          </>
        )}
      </main>

      {/* 🔹 Nav inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-md border-t border-green-200/50 shadow-lg z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex-col gap-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Home className="w-5 h-5" />
              <span className="text-xs font-medium">Inicio</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col gap-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Tareas</span>
          </Button>
          <Link href="/notes">
            <Button variant="ghost" size="sm" className="flex-col gap-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-medium">Notas</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="flex-col gap-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
