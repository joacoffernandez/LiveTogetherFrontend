"use client"

import { Check, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

interface FamilySwitcherProps {
  isOpen: boolean
  onClose: () => void
  currentFamily: string
  onSelectFamily: (family: string) => void
  onNavigateToInvitations: () => void
  newInvitationsCount: number
}

export default function FamilySwitcher({
  isOpen,
  onClose,
  currentFamily,
  onSelectFamily,
  onNavigateToInvitations,
  newInvitationsCount,
}: FamilySwitcherProps) {

  const [families, setFamilies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

/*   const families = [
    { name: "Familia García", members: 4, color: "bg-emerald-500" },
    { name: "Casa de la Playa", members: 6, color: "bg-blue-500" },
    { name: "Piso Estudiantes", members: 3, color: "bg-purple-500" },
  ] */

  if (!isOpen) return null

  if (loading) return (    <div className="absolute inset-0 bg-black/50 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Cambiar de familia</h3>
          <button
            onClick={() => {
              onNavigateToInvitations()
              onClose()
            }}
            className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative"
          >
            <Mail className="w-5 h-5 text-emerald-600" />
            {newInvitationsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{newInvitationsCount}</span>
              </div>
            )}
          </button>
        </div>
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold">Cargando familias...</h4>
        </div>
      </div>
    </div>
  )

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Cambiar de familia</h3>
          <button
            onClick={() => {
              onNavigateToInvitations()
              onClose()
            }}
            className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative"
          >
            <Mail className="w-5 h-5 text-emerald-600" />
            {newInvitationsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{newInvitationsCount}</span>
              </div>
            )}
          </button>
        </div>
        <div className="space-y-3 mb-6">
          {families.map((family) => (
            <Card
              key={family.name}
              className={`p-4 cursor-pointer transition-all border-2 ${
                currentFamily === family.name
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 hover:border-emerald-300"
              }`}
              onClick={() => {
                onSelectFamily(family.name)
                localStorage.setItem("familyId", family.idFamily)
                onClose()
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${family.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {family.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{family.name}</h4>
                  <p className="text-sm text-muted-foreground">{family.members} miembros</p>
                </div>
                {currentFamily === family.name && <Check className="w-5 h-5 text-emerald-600" />}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
