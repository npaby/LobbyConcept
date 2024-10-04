import * as React from "react";
import { Button } from "../../components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card.tsx";
import { useLobbies } from "../../providers/lobbies-provider.tsx";

export default function LobbiesCard({ lobby }) {
	const { joinLobby } = useLobbies();
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
				<div className="text-sm m-2 text-gray-500">
					{lobby?.lobbyRank || "Lobby Rank"}
				</div>
				<div className="text-sm m-2 text-gray-500">
					{lobby?.members?.map((member) => (
						<div key={member.memberId}>{member.memberId}</div>
					))}
				</div>

				<div className={"mt-4 mb-4"}>{/* RenderMembers */}</div>
				<Button
					className="w-full text-white bg-blue-500 hover:bg-blue-600"
					onClick={() => joinLobby(lobby.lobbyId)}
				>
					Join Lobby
				</Button>
			</CardContent>
		</Card>
	);
}
