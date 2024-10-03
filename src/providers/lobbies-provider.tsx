import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// Create a context
const LobbiesContext = createContext();

export const LobbiesProvider = ({ children }) => {
	const [cookies] = useCookies();
	const [lobbies, setLobbies] = useState([]);
	const [createdLobby, setCreatedLobby] = useState(null);
	const [selectedLobby, setSelectedLobby] = useState(null);
	const navigate = useNavigate();
	const socket = io("ws://localhost:3000", {
		auth: {
			token: cookies.accessToken,
		},
		transports: ["websocket"],
		upgrade: false,
	});
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to the server");
			socket.emit("lobby:getLobbies");
		});
		socket.on("lobby:getLobbies", (msg) => {
			console.log("Received lobbies:", msg);
			setLobbies(
				msg.map((lobby) => ({
					roomName: lobby.roomName,
					lobbyId: lobby._id,
					lobbyRank: lobby.rank,
					members: lobby.members,
				})),
			);
		});
		return () => {
			// socket.disconnect();
			// socket.off("connect");
			// socket.off("lobby:getLobbies");
			// socket.off("lobby:createLobby");
		};
	}, [cookies.accessToken]);
	useEffect(() => {
		socket.on("lobby:createLobby", (msg) => {
			console.log("Lobby created:", msg);
			setLobbies((prevLobbies) => [
				...prevLobbies,
				{
					roomName: msg.roomName,
					lobbyId: msg._id,
					lobbyRank: msg.rank,
					members: msg.members,
				},
			]);
			setCreatedLobby(msg._id);
		});
		socket.on("lobby:joinLobby", (msg) => {
			setLobbies((prevLobbies) =>
				prevLobbies.map((lobby) =>
					lobby.lobbyId === msg._id
						? { ...lobby, members: msg.members }
						: lobby,
				),
			);
		});
	}, [lobbies]);
	// Todo: Create Create-Lobby DTO here.
	const createLobby = (lobbyData) => {
		socket.emit("lobby:createLobby", { roomName: "Test Lang" });
	};
	const joinLobby = (lobbyId) => {
		socket.emit("lobby:joinLobby", lobbyId);
		setSelectedLobby(lobbyId);
		navigate(`/lobby/${lobbyId}`);
	};
	return (
		<LobbiesContext.Provider
			value={{ lobbies, selectedLobby, createLobby, joinLobby }}
		>
			{children}
		</LobbiesContext.Provider>
	);
};
export const useLobbies = () => {
	return useContext(LobbiesContext);
};
