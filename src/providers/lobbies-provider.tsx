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
	console.log("[LP]: Rerenders");

	useEffect(() => {
		if (!socketCurrent) return;

		const handleGetLobbies = (msg: any) => {
			setLobbies(
				msg.map((lobby: any) => ({
					roomName: lobby.roomName,
					lobbyId: lobby._id,
					lobbyRank: lobby.rank,
					members: lobby.members,
				})),
			);
		};

		const handleCreateLobby = (msg: any) => {
			setLobbies((prevLobbies) => [
				...prevLobbies,
				{
					roomName: msg.roomName,
					lobbyId: msg._id,
					lobbyRank: msg.rank,
					members: msg.members,
				},
			]);
		};

		socketCurrent.emit("lobby:getLobbies");
		// socketCurrent.on("lobby:makeOwner"", 	);
		socketCurrent.on("lobby:getLobbies", handleGetLobbies);
		socketCurrent.on("lobby:createLobby", handleCreateLobby);

		return () => {
			socketCurrent.off("lobby:getLobbies", handleGetLobbies);
			socketCurrent.off("lobby:createLobby", handleCreateLobby);
		};
	}, [socketCurrent, cookies]);

	const createLobby = (lobbyData) => {
		socketCurrent.emit("lobby:createLobby", lobbyData, (response) => {
			navigate(`/lobby/${response._id}`);
			console.log(response);
		});
	};

	const joinLobby = (lobby) => {
		if (socketCurrent) {
			socketCurrent.emit("lobby:joinLobby", lobby);
			console.log("Joining lobby:", lobby);
			navigate(`/lobby/${lobby}`);
		}
	};
	return (
		<LobbiesContext.Provider
			value={{
				lobbies,
				selectedLobby,
				createdLobby,
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
