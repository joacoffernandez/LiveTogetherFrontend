"use client";

import { Home, CheckSquare, FileText, User, Bell, Star, Users, Sparkles, Trophy, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"

import { api } from '@/lib/api';
import { Checkbox } from "@/components/ui/checkbox";

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

export default function HomePage() {
  const [showFamilyMenu, setShowFamilyMenu] = useState(false)
  const [families, setFamilies] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<number>(0);

const toggleTaskCompletion = async (taskId: string) => {
  try {
    const res = await api.post(`/task/complete/user/${taskId}`);
    console.log(res);
    if (res.success) {

      setTasks(prev =>
        prev.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );
    }
  } catch (err) {
    console.error('Error al marcar tarea completada:', err);
  }
};

useEffect(() => {
  async function loadTasks() {
    const familyId = localStorage.getItem('activeFamilyId');
    if (!familyId) return;

    const tasksRes = await api.get(`/task/assigned/uncompleted/${familyId}`);
    if (tasksRes.success) {
      setTasks(tasksRes.data.tasks || []);
    }

    const pointsRes = await api.get(`/user/meInFamily/${familyId}`);
    if (pointsRes.success) {
      console.log(pointsRes.data.familyUser.points);
      setPoints(pointsRes.data.familyUser.points);
    }
  }

  loadTasks();

  // escuchar cambios en localStorage
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, [key, value]);
    if (key === 'activeFamilyId') {
      loadTasks();
    }
  };

  return () => {
    localStorage.setItem = originalSetItem;
  };
}, []);


  useEffect(() => {
    async function loadData() {
      const res = await api.get('/family/checkfamilies'); 
      if (res.success) {
        setFamilies(res.data.families || [])
      };
      setLoading(false);
    }
    if (loading) {
      loadData();
    }
    
  }, []);


  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br  relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-700/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-gradient-to-br from-coral-400/20 to-coral-500/30 rounded-full blur-lg"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-200/50 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                LT | Familia González
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/notifications">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-600 text-white border-2 border-white font-bold">
                    3
                  </Badge>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Mis tareas pendientes</h2>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => {
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
                              <span className="text-sm font-bold text-green-600">{task.difficulty.points} pts</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>

                        <div className="">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.idTask)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-bold text-gray-800">Estado del grupo</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-green-900 border-0 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                <CardContent className="p-4 text-center relative">
                  <Users className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
                  <div className="text-2xl font-bold text-white drop-shadow-sm">12</div>
                  <p className="text-xs text-green-100 font-medium">Tareas familiares</p>
                </CardContent>
              </Card>

              <Card className="bg-emerald-900 border-0 shadow-md relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-white/20 rounded-full translate-y-5 -translate-x-5"></div>
                <CardContent className="p-4 text-center relative">
                  <Star className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
                  <div className="text-2xl font-bold text-white drop-shadow-sm">{points}</div>
                  <p className="text-xs text-emerald-100 font-medium">Aurapoints</p>
                </CardContent>
              </Card>

              <Card className="col-span-2 bg-green-900 border-0 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-1/2 w-16 h-16 bg-white/20 rounded-full -translate-y-8 -translate-x-8"></div>
                <CardContent className="p-4 text-center relative">
                  <FileText className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
                  <div className="text-2xl font-bold text-white drop-shadow-sm">3</div>
                  <p className="text-xs text-green-100 font-medium">Notas activas</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-coral-500" />
              <h2 className="text-lg font-bold text-gray-800">Mi ranking</h2>
            </div>
            <Card className="bg-gradient-to-br from-green-700 to-emerald-800 border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 -translate-x-12"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 translate-x-10"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-6xl font-bold text-white drop-shadow-sm mr-4">3°</div>
                    <div className="text-green-100">
                      <p className="text-sm font-medium">Puesto actual</p>
                      <p className="text-xs opacity-80">en la familia</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-coral-400 to-coral-500 rounded-full flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white font-bold text-lg">245</div>
                    <p className="text-xs text-green-100">puntos</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-100 font-medium">Progreso al siguiente puesto</span>
                    <span className="text-white font-bold">50/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-coral-400 to-coral-500 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-100 text-center font-medium">A 50 puntos del siguiente puesto</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-4 bg-white hover:bg-gray-100 text-green-800 border-0 font-medium"
                >
                  Ver ranking completo
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {showFamilyMenu && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end flex-col">
          <div className="w-full h-[20vh]" onClick={() => setShowFamilyMenu(false)}></div>
          <div className="w-full h-[80vh] bg-white rounded-t-3xl animate-in slide-in-from-bottom duration-300 ease-out">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Seleccionar Familia</h3>
                <div className="flex items-center gap-2">
                  <Link href="/invitations">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => setShowFamilyMenu(false)}
                    >
                      <Users className="w-5 h-5 text-green-600" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFamilyMenu(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {families.map((family) => (
                  <Card
                    key={family.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      family.isActive ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                    onClick={
                      () => {
                        setShowFamilyMenu(false);
                        localStorage.setItem('activeFamilyId', family.idFamily);
                      }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white shadow-md flex items-center justify-center flex-shrink-0">
                          <img
                            src={family.avatar || "/placeholder.svg"}
                            alt={family.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{family.name}</h4>
                        </div>
                        {family.isActive && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-md border-t border-green-200/50 shadow-lg z-50">
        <div className="max-w-md mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 tap-target bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs font-medium">Inicio</span>
            </Button>
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
