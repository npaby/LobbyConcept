import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import type { Socket } from "socket.io-client";
import { useSockets } from "./socket-provider.tsx";

const LobbiesContext = createContext();

export const LobbiesProvider = ({ children }) => {
	const [lobbies, setLobbies] = useState([]);
	const [createdLobby, setCreatedLobby] = useState(null);
	const [selectedLobby, setSelectedLobby] = useState("");
	const navigate = useNavigate();
	const [cookies] = useCookies();
	const socketCurrent: Socket | null = useSockets();

	useEffect(() => {
		if (!socketCurrent) return;
		socketCurrent.emit("lobby:getLobbies");
		socketCurrent.on("lobby:getLobbies", (msg) => {
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
			socketCurrent.off("lobby:getLobbies");
		};
	}, [socketCurrent, cookies]);

	useEffect(() => {
		if (!socketCurrent) return;
		socketCurrent.on("lobby:createLobby", (msg) => {
			setLobbies((prevLobbies) => [
				...prevLobbies,
				{
					roomName: msg.roomName,
					lobbyId: msg._id,
					lobbyRank: msg.rank,
					members: msg.members,
				},
			]);
		});
		return () => {
			socketCurrent.off("lobby:createLobby");
		};
	}, [socketCurrent, lobbies]);
	const createLobby = (lobbyData) => {
		if (socketCurrent) {
			socketCurrent.emit("lobby:createLobby", lobbyData);
		}
	};
	const joinLobby = (lobby) => {
		if (socketCurrent) {
			socketCurrent.emit("lobby:joinLobby", lobby);
			setSelectedLobby(lobby);
			console.log("Joining lobby:", lobby);
			navigate(`/lobby/${lobby}`);
		}
	};
	return (
		<LobbiesContext.Provider
			value={{
				lobbies,
				selectedLobby,
				setSelectedLobby,
				createLobby,
				joinLobby,
			}}
		>
			{children}
		</LobbiesContext.Provider>
	);
};
export const useLobbies = () => {
	return useContext(LobbiesContext);
};
