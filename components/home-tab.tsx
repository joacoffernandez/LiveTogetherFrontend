"use client"

import { Trophy, CheckCircle2, Users, Target, Zap, Plus, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import LoadingScreen from "./loading"

import { useUserContext } from '../contexts/userContext';
import { useFamilyContext } from '@/contexts/familyContext';
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface DailyProgress {
  completedTasks: number;
  totalTasks: number;
}

export default function HomeTab() {
  const weekStreak = 7
  const router = useRouter()

  const { user, loading: userLoading } = useUserContext();
  const { family, familyUser, loading } = useFamilyContext();
  
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [progressLoading, setProgressLoading] = useState(false);

  // Fetch del progreso diario
  const fetchDailyProgress = async () => {
    if (!family?.idFamily) return;
    
    try {
      setProgressLoading(true);
      const res = await api.get(`/task/familydailyprogress/${family.idFamily}`);
      
      if (res.success && res.data.progress) {
        setDailyProgress(res.data.progress);
      }
    } catch (err) {
      console.error("Error cargando progreso diario:", err);
    } finally {
      setProgressLoading(false);
    }
  };

  const onNavigateToCreateTask = () => {
    router.push('/tasks/create');
  };

  useEffect(() => {
    if (family?.idFamily) {
      fetchDailyProgress();
    }
  }, [family?.idFamily]);

  const progressPercentage = dailyProgress && dailyProgress.totalTasks > 0 
    ? Math.round((dailyProgress.completedTasks / dailyProgress.totalTasks) * 100)
    : 0;


  if ( userLoading || progressLoading || loading ) return <LoadingScreen></LoadingScreen>

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">¡Hola, {user?.firstName}!</h2>
          <p className="text-muted-foreground">Este es el resumen de <span className="font-bold text-emerald-500">{family?.name}</span></p>
        </div>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* Background circle */}
          <circle cx="40" cy="40" r="38" fill="#D1FAE5" />

          {/* House shape */}
          <path d="M25 45 L40 30 L55 45 L55 60 C55 62 54 63 52 63 L28 63 C26 63 25 62 25 60 Z" fill="#10B981" />

          {/* Roof detail */}
          <path d="M40 30 L55 45 L52 45 L40 33 L28 45 L25 45 Z" fill="#059669" />

          {/* Door */}
          <rect x="36" y="52" width="8" height="11" rx="1" fill="#FFFFFF" />

          {/* Window left */}
          <rect x="30" y="48" width="6" height="6" rx="1" fill="#FFFFFF" />

          {/* Window right */}
          <rect x="44" y="48" width="6" height="6" rx="1" fill="#FFFFFF" />

          {/* Heart above house */}
          <path
            d="M40 25 C38 22 34 22 32 24 C30 26 30 28 32 30 L40 38 L48 30 C50 28 50 26 48 24 C46 22 42 22 40 25 Z"
            fill="#EF4444"
          />

          {/* Decorative leaves */}
          <ellipse cx="20" cy="35" rx="3" ry="5" fill="#34D399" opacity="0.6" />
          <ellipse cx="60" cy="38" rx="3" ry="5" fill="#34D399" opacity="0.6" />
          <ellipse cx="23" cy="55" rx="4" ry="3" fill="#34D399" opacity="0.4" />
        </svg>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-white border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{dailyProgress && (dailyProgress.totalTasks - dailyProgress.completedTasks)}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{familyUser?.points || 0}</p>
              <p className="text-xs text-muted-foreground">Puntos</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{dailyProgress?.completedTasks}</p>
              <p className="text-xs text-muted-foreground">Tareas hechas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weekStreak}</p>
              <p className="text-xs text-muted-foreground">Días racha</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Family Status */}
      <Card className="p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-md">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white font-bold text-lg">Estado Familiar</h3>
            <p className="text-emerald-100 text-sm">
              {progressLoading 
                ? "Cargando progreso..." 
                : dailyProgress 
                  ? `${dailyProgress.completedTasks} de ${dailyProgress.totalTasks} tareas completadas`
                  : "Todos activos hoy"
              }
            </p>
          </div>
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-end text-sm">
            <span className="text-emerald-100 font-semibold">Progreso del día</span>
            <span className="text-white font-bold text-2xl">
              {progressLoading ? "..." : `${progressPercentage}%`}
            </span>
          </div>
          <Progress 
            value={progressLoading ? 0 : progressPercentage} 
            className="h-2 bg-emerald-400" 
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onNavigateToCreateTask}
          className="h-12 p-4 bg-white hover:bg-white border-2 hover:cursor-pointer border-emerald-200 shadow-md text-white font-semibold text-black"
        >
          <Plus className="w-5 h-5 mr-2 text-emerald-700 font-bold" />
          Crear Tarea
        </Button>
        <Button
          /* onClick={onNavigateToCreateNote} */
          className="h-12 p-4 bg-white hover:bg-white border-2 border-emerald-200 shadow-md text-white font-semibold text-black"
        >
          <FileText className="w-5 h-5 mr-2 text-emerald-700 font-bold" />
          Crear Nota
        </Button>
      </div>


      <div>
        <h3 className="font-bold text-lg mb-3">Tus tareas de hoy</h3>
        <div className="space-y-3">
          <Card className="p-4 bg-white border-emerald-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                P
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Lavar los platos</h4>
                <p className="text-xs text-muted-foreground">Asignado por Pedro • Quedan 2 horas</p>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            </div>
          </Card>

          <Card className="p-4 bg-white border-emerald-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
                L
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Sacar la basura</h4>
                <p className="text-xs text-muted-foreground">Asignado por Laura • Falta 1 día</p>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}