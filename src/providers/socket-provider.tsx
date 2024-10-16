import { type ReactNode, createContext, useContext, useMemo } from "react";
import io, { type Socket } from "socket.io-client";

interface SocketsContextType {
	sockets: [Socket] | null;
}
const SocketsContext = createContext<SocketsContextType | undefined>(undefined);
const SocketsNamespaces = ["chatroom", "lobby"];
export const SocketsProvider = ({ children }: { children: ReactNode }) => {
    const sockets: Socket[] = SocketsNamespaces.map((namespace) => {
        const socketInstance: Socket = io(`ws://localhost:3000/${namespace}`, {
            transports: ["websocket"],
            upgrade: false,
            reconnection: true,
            withCredentials: true,
        });
        socketInstance.on("connect", () => {
            console.log("New connection to namespace: ", namespace);
        });
        return socketInstance;
    });

    console.log("Sockets: ", sockets);
    return (
        <SocketsContext.Provider value={{ sockets }}>
            {children}
        </SocketsContext.Provider>
    );
};
export const useSockets = () => {
	const context = useContext(SocketsContext);
	if (!context) {
		throw new Error("useSockets must be used within a SocketsProvider");
	}
	return context.sockets;
};
