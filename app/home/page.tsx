"use client"


import HomeTab from "@/components/home-tab"
import BottomNavigation from "@/components/bottom-navigation"
import PageHeader from "@/components/header"
import { useFamilyContext } from "@/contexts/familyContext"
import { Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading"

export default function LiveTogetherApp() {
  const { family, loading } = useFamilyContext()
  const router = useRouter()

  if (loading) return <LoadingScreen></LoadingScreen>

  if (!family) return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-6 max-w-[430px] mx-auto">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Decorative illustration */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">No tienes ninguna familia</h1>
          <p className="text-sm text-gray-600 max-w-xs">
            Revisa tus invitaciones pendientes para unirte a una familia o crea una nueva
          </p>
        </div>

        {/* Action button */}
        <Button
          onClick={() => router.push("/invitations")}
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
        >
          <Mail className="w-5 h-5 mr-2" />
          Ver Invitaciones
        </Button>

        {/* Decorative dots */}
        <div className="flex gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-emerald-300" />
          <div className="w-2 h-2 rounded-full bg-emerald-300" />
          <div className="w-2 h-2 rounded-full bg-emerald-300" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">

      <PageHeader></PageHeader>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <HomeTab />
      </div>


      <BottomNavigation></BottomNavigation>
    </div>
  )
}
