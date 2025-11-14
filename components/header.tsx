"use client";
import { Users, Bell, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useFamilyContext } from "@/contexts/familyContext";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import { useWebSocketContext } from "@/contexts/webSocketContext";

export default function PageHeader() {
  const router = useRouter();
  const { family, isAdmin } = useFamilyContext();
  const { toastMessage, closeToast } = useWebSocketContext();
  const [progress, setProgress] = useState<number>(0)
  const [isExiting, setIsExiting] = useState(false)

  // Referencias para los intervalos
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const newNotificationsCount = family?.unseenCount ?? 0;
  
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para limpiar todos los timers
  const clearAllTimers = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (autoCloseTimeoutRef.current) {
      clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }
  };

  const goToNotifications = () => {
    router.push("/notifications");
  };

  useEffect(() => {
    if (toastMessage) {
      // Limpiar timers anteriores antes de empezar nuevos
      clearAllTimers();
      setIsExiting(false);
      setProgress(100);
      
      // Animate progress bar from 100% to 0% over 6.5 seconds
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / 65); // 65 steps in 6.5 seconds (100ms intervals)
          if (newProgress <= 0) {
            clearAllTimers();
            setIsExiting(true);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      // Auto-close después de 6.5 segundos
      autoCloseTimeoutRef.current = setTimeout(() => {
        setIsExiting(true);
      }, 6500);

    } else {
      setIsExiting(false); 
      clearAllTimers(); // Limpiar timers cuando no hay mensaje
    }

    // Cleanup function
    return () => {
      clearAllTimers();
    };
  }, [toastMessage]);

  // Efecto para manejar el cierre completo después de la animación
  useEffect(() => {
    if (isExiting && toastMessage) {
      const timer = setTimeout(() => {
        closeToast();
        setProgress(0);
        clearAllTimers();
      }, 300); // Coincide con la duración de la animación de salida

      return () => clearTimeout(timer);
    }
  }, [isExiting, toastMessage, closeToast]);

  // Limpiar timers cuando el componente se desmonte
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const handleToastClose = () => {
    if (!isExiting) {
      clearAllTimers();
      setIsExiting(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = showInviteModal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showInviteModal]);

  const handleInvite = async () => {
    if (!inviteUsername.trim()) {
      setError("Por favor ingresa un username");
      return;
    }

    if (!family?.idFamily) {
      setError("No se pudo identificar la familia");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await api.post("/invitation/create", {
        familyId: family.idFamily,
        username: inviteUsername.trim(),
      });

      if (result.success) {
        console.log("Invitación enviada exitosamente:", result.data);
        setInviteUsername("");
        setShowInviteModal(false);
      } else {
        setError(result.error || "Error al enviar la invitación");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-emerald-100 flex flex-col gap-3">

      {/* FILA PRINCIPAL */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{family?.name}</h1>
          </div>
        </div>

        <div className="flex gap-4">
          {isAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="transition-colors text-white hover:text-white/80"
            >
              <UserPlus className="w-5 h-5 text-black" />
            </button>
          )}

          <button
            onClick={() => goToNotifications()}
            className="relative transition-colors text-white hover:text-white/80"
          >
            <Bell className="w-5 h-5 text-black" />

            {newNotificationsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">
                  {newNotificationsCount}
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
      

      {/* ⬇️ TOAST (de WebSocketContext) */}
      {toastMessage && (
        <div className={`
          fixed top-4 left-1/2 transform -translate-x-1/2
          w-[calc(100%-2rem)] max-w-md
          overflow-hidden
          flex flex-col
          px-5 py-3
          rounded-lg
          backdrop-blur-xl
          bg-gradient-to-r from-emerald-500/95 to-emerald-600/95
          border border-emerald-300/40
          shadow-[0_20px_60px_-15px_rgba(16,185,129,0.6)]
          hover:shadow-[0_25px_80px_-15px_rgba(16,185,129,0.7)]
          transition-all duration-300
          z-[1000]
          ${isExiting 
            ? 'animate-out slide-out-to-top duration-300 ease-in' 
            : 'animate-in slide-in-from-top duration-300 ease-out'
          }
          group
        `}>
          
          <div className="flex items-center gap-4">
            <div className="relative z-10 shrink-0">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
                <Bell className="w-6 h-6 text-white animate-bounce-gentle" />
              </div>
            </div>
            
            {/* Mensaje */}
            <div className="flex-1 relative z-10 min-w-0">
              <p className="text-white font-semibold text-base tracking-wide drop-shadow-lg">
                {toastMessage}
              </p>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={handleToastClose}
              className="relative z-10 shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/20"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>


        <div className="absolute bottom-0 right-0 w-full">
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-emerald-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        </div>
      )}


      {/* MODAL */}
      {showInviteModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
            onClick={() => setShowInviteModal(false)}
          >
            <div
              className="bg-background rounded-2xl p-6 w-full max-w-sm shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Invita a un usuario a la familia
                </h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Username del usuario"
                value={inviteUsername}
                onChange={(e) => {
                  setInviteUsername(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleInvite()}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                autoFocus
                disabled={loading}
              />

              <button
                onClick={handleInvite}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando invitación..." : "Enviar invitación"}
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}