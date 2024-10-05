import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { useCookies } from "react-cookie";
import io, { type Socket } from "socket.io-client";

// Fix: Properly initialize the context by calling createContext()
interface SocketsContextType {
	socket: Socket | null; // Adjusted for type safety
}
const SocketsContext = createContext<SocketsContextType | undefined>(undefined);

export const SocketsProvider = ({ children }: { children: ReactNode }) => {
	const [cookies] = useCookies();

	const socket = useMemo(() => {
		const socketInstance = io("ws://localhost:3000", {
			auth: {
				token: cookies.accessToken,
			},
			transports: ["websocket"],
			upgrade: false,
			reconnection: true,
		});
		socketInstance.on("connect", () => {
			console.log("Socket connected");
		});
		return socketInstance;
	}, [cookies.accessToken]);
	// useEffect(() => {
	// 	return () => {
	// 		if (socket) {
	// 			socket.disconnect();
	// 			console.log("Socket disconnected");
	// 		}
	// 	};
	// }, [socket]);
	return (
		<SocketsContext.Provider value={{ socket }}>
			{children}
		</SocketsContext.Provider>
	);
};
export const useSockets = () => {
	const context = useContext(SocketsContext);
	if (!context) {
		throw new Error("useSockets must be used within a SocketsProvider");
	}
	return context.socket;
};
