import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import type { Socket } from "socket.io-client";
import { useSockets } from "./socket-provider.tsx";

// Create a context
const LobbiesContext = createContext();

export const LobbiesProvider = ({ children }) => {
	const [lobbies, setLobbies] = useState([]);
	const [createdLobby, setCreatedLobby] = useState(null);
	const [selectedLobby, setSelectedLobby] = useState(null);
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies();
	const socketCurrent: Socket = useSockets().socket;
	useEffect(() => {
		socketCurrent.emit("lobby:getLobbies");
		socketCurrent.on("lobby:getLobbies", (msg) => {
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
			// socketCurrent.disconnect();
			socketCurrent.off("connect");
			socketCurrent.off("lobby:getLobbies");
			socketCurrent.off("lobby:createLobby");
		};
	}, [cookies]);
	useEffect(() => {
		console.log("Listening if new lobby is created");
		socketCurrent.on("lobby:createLobby", (msg) => {
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
			console.log("Created lobby ID:", msg._id);
			setCreatedLobby(msg._id);
		});

		return () => {
			socketCurrent.off("lobby:createLobby");
			socketCurrent.off("lobby:joinLobby");
			socketCurrent.off("disconnect");
		};
	}, [lobbies]);
	useEffect(() => {
		socketCurrent.on("lobby:joinLobby", (msg) => {
			setLobbies((prevLobbies) =>
				prevLobbies.map((lobby) =>
					lobby.lobbyId === msg._id
						? { ...lobby, members: msg.members }
						: lobby,
				),
			);
			console.log("Lobby joined:", msg);
		});
		return () => {
			socketCurrent.off("lobby:joinLobby");
		};
	}, [t]);
	// Todo: Create Create-Lobby DTO here.
	const createLobby = (lobbyData) => {
		socketCurrent.emit("lobby:createLobby", lobbyData);
	};
	const joinLobby = (lobbyId) => {
		socketCurrent.emit("lobby:joinLobby", lobbyId);

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
