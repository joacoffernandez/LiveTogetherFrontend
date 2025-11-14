    "use client";

    import { createContext, useContext, useEffect, useState } from "react";
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
    const { family, incrementFamilyUnseen } = useFamilyContext();

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const closeToast = () => setToastMessage(null);

    // 👉 Función para mostrar notificación visual
    const triggerToast = (msg: string) => {
        setToastMessage(msg);

        setTimeout(() => {
        setToastMessage(null);
        }, 10000); // 10 segundos
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
                incrementFamilyUnseen(payload.idFamily);

                // 👉 Si esta notificación es de la familia que está viendo el usuario
                if (family?.idFamily === payload.idFamily) {
                triggerToast(payload.title ?? "Tienes una nueva notificación");
                }
            }
            break;

            case "Invitation":
            console.log("📨 Invitación recibida");
            break;
        }
        };

        socket.on("notification", listener);

        return () => {
        socket.off("notification", listener);
        };
    }, [token, family, incrementFamilyUnseen]);

    return (
        <WebSocketContext.Provider value={{ toastMessage, closeToast }}>
        {children}
        </WebSocketContext.Provider>
    );
    };

    export const useWebSocketContext = () => useContext(WebSocketContext);
