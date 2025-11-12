import { useState } from 'react'
import { Trophy, Star, Award, TrendingUp, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUserContext } from "@/contexts/userContext"
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function ProfileTab() {
  const { user, loading, logout } = useUserContext()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const achievements = [
    { icon: Star, label: "Colaborador del mes", color: "text-yellow-600 bg-yellow-100" },
    { icon: Award, label: "50 tareas completadas", color: "text-purple-600 bg-purple-100" },
    { icon: TrendingUp, label: "Racha de 7 días", color: "text-emerald-600 bg-emerald-100" },
  ]

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      
      const result = await api.get('/user/signout')
      
      if (result.success) {
        logout()
        router.push('/login')
      } else {
        console.error('Error en logout:', result)
      }
    } catch (error) {
      console.error('Error durante logout:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
          {user?.firstName?.[0] || 'U'}
        </div>
        <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
        <p className="text-muted-foreground text-sm">@{user?.username}</p>
        <p className="text-muted-foreground text-sm">Miembro desde enero 2025</p>
      </div>

      {/* Stats */}
      <Card className="p-5 bg-white border-emerald-100 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Estadísticas
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Tareas completadas</span>
              <span className="font-semibold">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">52</p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">#2</p>
              <p className="text-xs text-muted-foreground">Ranking</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">7</p>
              <p className="text-xs text-muted-foreground">Racha días</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <div>
        <h3 className="font-bold mb-3">Logros</h3>
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-4 bg-white border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.color}`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">{achievement.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Family Ranking */}
      <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-sm">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          Ranking Familiar
        </h3>
        <div className="space-y-2">
          {[
            { name: "Pedro", tasks: 58, position: 1 },
            { name: user?.firstName || "Tú", tasks: 52, position: 2 },
            { name: "Laura", tasks: 45, position: 3 },
            { name: "Carlos", tasks: 38, position: 4 },
          ].map((member) => (
            <div
              key={member.name}
              className={`flex items-center justify-between p-2 rounded-lg ${
                member.name === user?.firstName ? "bg-white shadow-sm" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-600 w-6">#{member.position}</span>
                <span className="font-medium text-sm">{member.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{member.tasks} tareas</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Logout Button */}
      <button 
        className="w-full py-3 opacity-80 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        <LogOut className="w-4 h-4" />
        {loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </button>
    </div>
  )
}