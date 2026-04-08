"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react"; // Añadimos useRef
import WebSocketService from "@/services/webSocketService";
import { useUserContext } from "./userContext";
import { useFamilyContext } from "./familyContext";

interface WebSocketContextType {
  toastMessage: string | null;
  closeToast: () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  toastMessage: null,
  closeToast: () => {},
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserContext();
  const { family, incrementFamilyUnseen, reloadFamilyContext } = useFamilyContext();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Referencia para el timeout

  const closeToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToastMessage(null);
  };

  // 👉 Función para mostrar notificación visual
  const triggerToast = (msg: string) => {
    // Limpiamos cualquier timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToastMessage(msg);

    // Configuramos nuevo timeout y guardamos la referencia
    timeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      timeoutRef.current = null;
    }, 7000); // 7 segundos
  };

  useEffect(() => {
    if (!token) return;

    const socket = WebSocketService.connect(token);

    const listener = (payload: any) => {
      if (!payload?.type) return;

      switch (payload.type) {
        case "Notification":
          if (payload.idFamily) {
            // aumentar unseenCount global
            console.log("📨 Notificacion recibida");
            reloadFamilyContext();

            // 👉 Si esta notificación es de la familia que está viendo el usuario
            if (family?.idFamily === payload.idFamily) {
              triggerToast(payload.title ?? "Tienes una nueva notificación");
            }
          }
          break;

        case "Invitation":
          console.log("📨 Invitación recibida");
          triggerToast(`Nueva invitación de ${payload.familyName}`);
          break;
      }
    };

    socket.on("notification", listener);

    return () => {
      socket.off("notification", listener);
      // Limpiamos el timeout al desmontar el componente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [token, family, incrementFamilyUnseen]);

  return (
    <WebSocketContext.Provider value={{ toastMessage, closeToast }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);