"use client"

import { useEffect, useRef, useState } from "react"
import { Bell, X } from "lucide-react"
import { useWebSocketContext } from "@/contexts/webSocketContext"

export default function ToastMessage() {
  const { toastMessage, closeToast } = useWebSocketContext()

  const [progress, setProgress] = useState<number>(0)
  const [isExiting, setIsExiting] = useState(false)

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearAllTimers = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }

    if (autoCloseTimeoutRef.current) {
      clearTimeout(autoCloseTimeoutRef.current)
      autoCloseTimeoutRef.current = null
    }
  }

  useEffect(() => {
    if (toastMessage) {
      clearAllTimers()
      setIsExiting(false)
      setProgress(100)

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / 65)

          if (newProgress <= 0) {
            clearAllTimers()
            setIsExiting(true)
            return 0
          }

          return newProgress
        })
      }, 100)

      autoCloseTimeoutRef.current = setTimeout(() => {
        setIsExiting(true)
      }, 6500)

    } else {
      setIsExiting(false)
      clearAllTimers()
    }

    return () => {
      clearAllTimers()
    }
  }, [toastMessage])

  useEffect(() => {
    if (isExiting && toastMessage) {
      const timer = setTimeout(() => {
        closeToast()
        setProgress(0)
        clearAllTimers()
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isExiting, toastMessage, closeToast])

  const handleToastClose = () => {
    if (!isExiting) {
      clearAllTimers()
      setIsExiting(true)
    }
  }

  if (!toastMessage) return null

  return (
    <div
      className={`
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
        ${
          isExiting
            ? "animate-out slide-out-to-top duration-300 ease-in"
            : "animate-in slide-in-from-top duration-300 ease-out"
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div className="relative z-10 shrink-0">
          <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
            <Bell className="w-6 h-6 text-white animate-bounce-gentle" />
          </div>
        </div>

        <div className="flex-1 relative z-10 min-w-0">
          <p className="text-white font-semibold text-base tracking-wide drop-shadow-lg">
            {toastMessage}
          </p>
        </div>

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
  )
}
