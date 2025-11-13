"use client"

import { Check, Mail, Plus, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useFamilyContext } from "@/contexts/familyContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CreateFamilyModal from "./create-family-popup"

interface FamilySwitcherProps {
  isOpen: boolean
  onClose: () => void
  newInvitationsCount: number
}

export default function FamilySwitcher({
  isOpen,
  onClose,
  newInvitationsCount,
}: FamilySwitcherProps) {
  const { families, selectFamily, loading, reloadFamilies, familyMembers } = useFamilyContext()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const [showCreateFamilyModal, setShowCreateFamilyModal] = useState(false)

  const onNavigateToInvitations = () => {
    router.push('/invitations')
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsVisible(true), 10)
      document.body.style.overflow = 'hidden' // desactivar scroll
    } else {
      setIsVisible(false)
      setTimeout(() => setShouldRender(false), 300) // tiempo para que complete la animacion antes de desaparecer 
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isOpen) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isOpen) {
        e.preventDefault()
      }
    }

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isOpen])

  if (!shouldRender) return null

  if (loading) return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <div
        className={`w-full bg-white rounded-t-3xl p-6 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Cambiar de familia</h3>
          <button
            onClick={onNavigateToInvitations}
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
    <div 
      className={`fixed inset-0 bg-black/50 z-50 flex items-end transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full bg-white rounded-t-3xl p-6 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Selecciona una familia</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateFamilyModal(true)}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-emerald-600" />
            </button>
            <button
              onClick={onNavigateToInvitations}
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
        </div>

            {families.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No formas parte de ninguna familia</h3>
                <p className="text-sm text-muted-foreground">Crea tu familia o revisa tus invitaciones!</p>
              </div>
            ) : (
                <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto">
                  {families.map((family) => (
                    <Card
                      key={family.name}
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        family.selected
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => {
                        selectFamily(family.idFamily)
                        onClose()
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {family.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{family.name}</h4>
                          <p className="text-sm text-muted-foreground">{family.members} miembros</p>
                        </div>
                        {family.selected && <Check className="w-5 h-5 text-emerald-600" />}
                      </div>
                    </Card>
                  ))}
                </div>
            )}


      </div>

      <CreateFamilyModal
        isOpen={showCreateFamilyModal}
        onClose={() => setShowCreateFamilyModal(false)}
      />
    </div>
  )
}