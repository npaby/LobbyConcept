import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { Button } from "../components/ui/button.tsx";
import { useSockets } from "../providers/socket-provider.tsx";
export default function LobbyDetailPage() {
	const { lobbyId } = useParams();
	const [cookies] = useCookies();
	const { socket } = useSockets();

	return (
		<div className="flex grid-rows-1 gap-3 p-0 m-0">
			<div className="bg-amber-300 w-1/4 h-dvh">
				<div className="h-[15dvh] bg-cyan-300 m-4 rounded-3xl">
					<div>{lobbyId}</div>
					<div>
						<Button> Report Lobby </Button>
						<Button>Leave Lobby</Button>
					</div>
				</div>
				<div className="h-[15dvh] bg-black m-4 rounded-3xl" />
				<div className="h-[15dvh] bg-black m-4 rounded-3xl" />
				<div className="h-[15dvh] bg-black m-4 rounded-3xl" />
				<div className="h-[15dvh] bg-black m-4 rounded-3xl" />
				<div className="h-[15dvh] bg-black m-4 rounded-3xl" />
			</div>
		</div>
	);
}
