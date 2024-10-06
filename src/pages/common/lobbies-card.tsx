import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card.tsx";
import { useLobbies } from "../../providers/lobbies-provider.tsx";
import { useSockets } from "../../providers/socket-provider.tsx";

export default function LobbiesCard({ lobby }) {
	const socket = useSockets();
	const { joinLobby } = useLobbies();
	const navigate = useNavigate();

	const handleJoinLobby = (lobby) => {
		if (!socket) {
			console.error("Socket is not initialized");
			return;
		}
		socket.emit("lobby:joinLobby", lobby?.lobbyId);
		console.log("Joining lobby:", lobby.lobbyId);
		navigate(`/lobby/${lobby?.lobbyId}`);
	};

	return (
		<Card className="shadow-md h-96" id={lobby.lobbyId}>
			<CardHeader>
				<CardTitle className="mt-4">
					{lobby?.roomName || "Lobby Name"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-sm m-2 text-gray-500">
					{lobby?.lobbyId || "Lobby Id"}
				</div>
				<div className="text-sm text-gray-500 p-5 bg-cyan-300 w-full bg-amber-950">
					{lobby?.lobbyRank || "Lobby Rank"}
				</div>
				<div className="text-sm m-2 text-gray-500 bg-amber-300 p-2 rounded-2xl">
					{lobby?.members?.map((member) => (
						<div key={member.memberId}>
							{member.memberId} || {member?.isOwner ? "O" : "M"}
						</div>
					))}
				</div>

				<div className={"mt-4 mb-4"}>{/* RenderMembers */}</div>
				<Button
					className="w-full text-white bg-blue-500 hover:bg-blue-600"
					onClick={() => handleJoinLobby(lobby)}
				>
					Join Lobby
				</Button>
			</CardContent>
		</Card>
	);
}
