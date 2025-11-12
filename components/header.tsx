"use client";
import { Users, Bell, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFamilyContext } from "@/contexts/familyContext";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function PageHeader() {
  const router = useRouter()
  const { family } = useFamilyContext()
  const newNotificationsCount = 1; // Esto podría venir de un contexto
  const [showInviteModal, setShowInviteModal] = useState(false)
    const [inviteUsername, setInviteUsername] = useState("")

  const goToNotifications = () => {
    router.push('/notifications')
  }

  useEffect(() => {
    if (showInviteModal) {
      document.body.style.overflow = 'hidden' // desactivar scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showInviteModal])

  const handleInvite = () => {
  if (inviteUsername.trim()) {
    console.log("Invitando a:", inviteUsername)
    setInviteUsername("")
    setShowInviteModal(false)
  }
}

  return (
    <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-emerald-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{family?.name}</h1>
        </div>
      </div>
      <div className="flex gap-4">
    <button onClick={() => setShowInviteModal(true)} className="transition-colors text-white hover:text-white/80">
          <UserPlus className="w-5 h-5 text-black" />
        </button>
          <button
            onClick={() => goToNotifications()}
            className="relative transition-colors text-white hover:text-white/80"
          >
            <Bell className="w-5 h-5 text-black" />
            {newNotificationsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">{newNotificationsCount}</span>
              </div>
            )}
          </button>
      </div>

{showInviteModal && (
  createPortal(
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowInviteModal(false)}
        >
          <div className="bg-background rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Invita a un usuario</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Username del usuario"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
              autoFocus
            />
            <button
              onClick={handleInvite}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Enviar invitación
            </button>
          </div>
        </div>
      , document.body))}
    </div>
  );
}