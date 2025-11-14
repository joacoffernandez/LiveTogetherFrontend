import { io, Socket } from "socket.io-client";

class WebSocketService {
    private static socket: Socket | null = null;

    static connect(token: string): Socket {
        if (this.socket) return this.socket;

        this.socket = io("http://localhost:8080", {
            auth: { token },
            transports: ["websocket"],
            autoConnect: true,
            reconnection: true
        });

        this.socket.on("connect", () => {
            console.log("WS conectado:", this.socket?.id);
        });

        this.socket.on("connect_error", (err: Error) => {
            console.log("Error de conexión al WS:", err.message);
        });

        this.socket.on("disconnect", () => {
            console.log("WS desconectado");
        });

        return this.socket;
    }

    static getSocket(): Socket | null {
        return this.socket;
    }
}

export default WebSocketService;
