import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { useSockets } from "../providers/socket-provider.tsx";

export default function LobbyDetailPage() {
	const socket = useSockets();
	const { lobbyId } = useParams();
	const [leaveLobby, setLeaveLobby] = useState(false);
	const [lobbyInfo, setLobbyInfo] = useState(null);
	const [storedValue] = useLocalStorage("userData", {});
	const navigate = useNavigate();
	console.log("[LDP]: Rerenders");
	if (lobbyId !== "[object Object]" && socket) {
		useEffect(() => {
			socket.emit("lobby:joinLobby", lobbyId);
			socket.on("lobby:joinLobby", (msg) => {
				console.log("Someone joined lobby:", msg);
			});
			socket.emit("lobby:getLobbyInfo", lobbyId);
			if (!socket) {
				console.error("Socket is not initialized.");
				return;
			}
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
					navigate("../..");
				});
			}
			return () => {
				if (socket) {
					socket.off("lobby:leaveLobby");
				}
			};
		}, [leaveLobby, socket, navigate]);
		useEffect(() => {
			if (socket) {
				socket.on("lobby:leaveLobby", (msg) => {
					socket.emit("lobby:getLobbyInfo", lobbyId);
					console.log("Someone Left");
				});
			}
		}, [socket]);
		const handleLeaveLobby = () => {
			if (socket) {
				socket.emit("lobby:leaveLobby", lobbyId);
				// console.log("Leaving lobby successful");
				navigate("../..");
			}
			setLeaveLobby(true);
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
			<>
				<div className="mb-5">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Lobbies Management
					</h1>
					<h1 className="text-3xl m-4">
						UID: {storedValue.sub} SID: {socket.id}
					</h1>
				</div>
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
			</>
		);
	}
	navigate("../..");
}
