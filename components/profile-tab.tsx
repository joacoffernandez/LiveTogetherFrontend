import { useState } from 'react'
import { Trophy, Star, Award, TrendingUp, LogOut, Crown, Medal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUserContext } from "@/contexts/userContext"
import { useFamilyContext } from "@/contexts/familyContext"
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function ProfileTab() {
  const { user, loading: userLoading, logout } = useUserContext()
  const { familyMembers } = useFamilyContext()
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

  // Encontrar la posición del usuario actual en el ranking
  const getUserRankingPosition = () => {
    if (!user || !familyMembers) return 0
    return familyMembers.findIndex(member => member.idUser === user.idUser) + 1
  }

  // Calcular estadísticas del usuario actual
  const getUserStats = () => {
    const userMember = familyMembers?.find(member => member.idUser === user?.idUser)
    return {
      points: userMember?.points || 0,
      position: getUserRankingPosition(),
      completedTasks: userMember?.completedTasks || 0
    }
  }

  const userStats = getUserStats()

  if (userLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />
      case 3:
        return <Medal className="w-4 h-4 text-amber-600" />
      default:
        return <span className="font-bold text-emerald-600 w-6 text-sm">#{position}</span>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
          {user?.firstName?.[0] || 'U'}
        </div>
        <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
        <p className="text-sm text-emerald-500 font-semibold">@{user?.username}</p>
      </div>

      {/* Stats */}
      <Card className="p-5 bg-white border-emerald-100 shadow-sm">
        <h3 className="font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Estadísticas
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Tareas completadas</span>
              <span className="font-semibold">
                {userStats.completedTasks > 0 ? Math.round((userStats.completedTasks / (userStats.completedTasks + 5)) * 100) : 0}%
              </span>
            </div>
            <Progress 
              value={userStats.completedTasks > 0 ? Math.round((userStats.completedTasks / (userStats.completedTasks + 5)) * 100) : 0} 
              color="emerald-500"
              className="h-2 bg-emerald-200" 
            />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{userStats.completedTasks}</p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">#{userStats.position}</p>
              <p className="text-xs text-muted-foreground">Ranking</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{userStats.points}</p>
              <p className="text-xs text-muted-foreground">Puntos</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Family Ranking */}
      <Card className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 border-2 shadow-sm">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Ranking Familiar
        </h3>
        <div className="space-y-2">
          {familyMembers && familyMembers.length > 0 ? (
            familyMembers.map((member, index) => {
              const position = index + 1
              const isCurrentUser = member.idUser === user?.idUser
              
              return (
                <div
                  key={member.idFamilyUser}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrentUser ? "bg-white shadow-sm border-2   border-emerald-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6">
                      {getPositionIcon(position)}
                    </div>
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-semibold text-emerald-600">
                      {member.user.firstName[0]}
                    </div>
                    <div>
                      <span className={`font-medium text-sm ${isCurrentUser ? "text-emerald-600" : ""}`}>
                        {isCurrentUser ? "Tú" : member.user.firstName}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-emerald-600">{member.points} pts</span>
                    <div className="text-xs text-muted-foreground">
                      {member.completedTasks} tareas
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No formas parte de ninguna familia
            </div>
          )}
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