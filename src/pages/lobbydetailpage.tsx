import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { useSockets } from "../providers/socket-provider.tsx";

export default function LobbyDetailPage() {
	const socket = useSockets();
	const { lobbyId } = useParams();
	const [leaveLobby, setLeaveLobby] = useState(false);
	const [lobbyInfo, setLobbyInfo] = useState(null);
	const navigate = useNavigate();
	if (lobbyId !== "[object Object]") {
		useEffect(() => {
			if (!socket) {
				console.error("Socket is not initialized.");
				return;
			}
			socket.emit("lobby:joinLobby", lobbyId);
			socket.emit("lobby:getLobbyInfo", lobbyId);
			socket.on("lobby:getLobbyInfo", (msg) => {
				setLobbyInfo(msg);
				console.log("Lobby info:", msg);
			});
			return () => {
				socket.off("lobby:getLobbyInfo");
				socket.off("lobby:joinLobby");
			};
		}, [lobbyId, socket]);
		useEffect(() => {
			if (leaveLobby && socket) {
				socket.on("lobby:leaveLobby", (msg) => {
					console.log("Leaving lobby:", msg);
					navigate("/lobby");
				});
			}
			return () => {
				if (socket) {
					socket.off("lobby:leaveLobby");
				}
			};
		}, [leaveLobby, socket, navigate]);
		const handleLeaveLobby = () => {
			setLeaveLobby(true);
			if (socket) {
				socket.emit("lobby:leaveLobby", lobbyId);
			}
		};

		const renderMembers = () => {
			return lobbyInfo?.members?.map((member: any) => (
				<div
					key={member?.memberId}
					className="h-[15dvh] bg-black m-4 rounded-3xl text-white flex items-center justify-center"
				>
					<div className="text-3xl">{member?.memberId}</div>
				</div>
			));
		};

		return (
			<div className="flex p-0 m-0">
				<div className="bg-amber-300 w-full h-dvh">
					<div className="h-[15dvh] bg-cyan-300 m-4 rounded-3xl">
						<div className="p-2">
							<h1 className="text-3xl">{lobbyInfo?.roomName}</h1>
							<div className="flex gap-4 flex-wrap align-bottom">
								<Button>Report Lobby</Button>
								<Button onClick={handleLeaveLobby}>Leave Lobby</Button>
							</div>
						</div>
					</div>
					{renderMembers()}
				</div>
			</div>
		);
	}
	navigate("../..");
}
