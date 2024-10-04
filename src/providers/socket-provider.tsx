import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { useCookies } from "react-cookie";
import io, { type Socket } from "socket.io-client";
interface SocketsContextType {
	socket: Socket | null;
}
const SocketsContext = createContext<SocketsContextType | null>(null);
export const SocketsProvider = ({ children }: { children: ReactNode }) => {
	const [cookies] = useCookies();

	const socket = useMemo(() => {
		const socketInstance = io("ws://localhost:3000", {
			auth: {
				token: cookies.accessToken,
			},
			transports: ["websocket"],
			upgrade: false,
		});
		console.log("Socket initialized");
		return socketInstance;
	}, []);

	return (
		<SocketsContext.Provider value={{ socket }}>
			{children}
		</SocketsContext.Provider>
	);
};

export const useSockets = () => {
	return useContext(SocketsContext);
};
