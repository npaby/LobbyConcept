import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../components/ui/context-menu.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { useSockets } from "../providers/socket-provider.tsx";

export default function LobbyDetailPage() {
	const socket = useSockets();
	const { lobbyId } = useParams();
	const [leaveLobby, setLeaveLobby] = useState(false);
	const [lobbyInfo, setLobbyInfo] = useState(null);
	const [storedValue] = useLocalStorage("userData", {});
	const navigate = useNavigate();
	const [isUserOwner, setIsUserOwner] = useState(false);
	console.log("--------------- LOBBY DETAIL PAGE -----------------");
	// console.log("[LDP]: Rerenders");
	// console.log(socket);
	if (lobbyId !== "[object Object]" && socket) {
		useEffect(() => {
			if (!socket) {
				console.error("Socket is not initialized.");
				return;
			}
			socket.emit("lobby:getLobbyInfo", lobbyId);
			socket.on("lobby:getLobbyInfo", (msg) => {
				setLobbyInfo(msg);
			});
			socket.emit("lobby:joinLobby", lobbyId);

			socket.on("lobby:joinLobby", (msg) => {
				socket.emit("lobby:getLobbyInfo", lobbyId);
			});
			socket.on("lobby:leaveLobby", (msg) => {
				socket.emit("lobby:getLobbyInfo", lobbyId);
			});
			return () => {
				socket.off("lobby:getLobbyInfo");
				socket.off("lobby:joinLobby");
				socket.off("lobby:leaveLobby");
			};
		}, []);

		const handleLeaveLobby = () => {
			if (socket) {
				socket.emit("lobby:leaveLobby", lobbyId);
				navigate("../..");
			}
			setLeaveLobby(true);
		};
		const handleMakeOwner = () => {
			function alertPerson() {
				alert("You promoted someone!");
			}
		};
		const handleReportLobby = () => {};
		const renderMembers = () => {
			useEffect(() => {
				if (lobbyInfo?.members) {
					for (const member of lobbyInfo.members) {
						if (member.memberId === storedValue.sub) {
							if (member.isOwner) {
								// console.log("User is owner");
								// setIsUserOwner(true);
							}
						}
					}
				}
			}, [lobbyInfo, storedValue]);
			if (isUserOwner) {
				return lobbyInfo?.members?.map((member: any) => (
					<ContextMenu>
						<ContextMenuTrigger>
							<div
								key={member?.memberId}
								className="h-[15dvh] bg-black m-4 rounded-3xl text-white flex items-center justify-center"
							>
								<div className="text-3xl">
									{member?.memberId} || {member?.isOwner ? "Owner" : "Member"}
								</div>
							</div>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>Kick</ContextMenuItem>
							<ContextMenuItem>Report</ContextMenuItem>
							<ContextMenuItem>Add Friend</ContextMenuItem>
							{!member?.isOwner && (
								<ContextMenuItem onClick={handleMakeOwner}>
									Make Owner
								</ContextMenuItem>
							)}
						</ContextMenuContent>
					</ContextMenu>
				));
			}
			return lobbyInfo?.members?.map((member: any) => (
				<ContextMenu>
					<ContextMenuTrigger>
						<div
							key={member?.memberId}
							className="h-[15dvh] bg-black m-4 rounded-3xl text-white flex items-center justify-center"
						>
							<div className="text-3xl">
								{member?.memberId} || {member?.isOwner ? "Owner" : "Member"}
							</div>
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>Kick</ContextMenuItem>
						<ContextMenuItem>Report</ContextMenuItem>
						<ContextMenuItem>Add Friend</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
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
									<Button onClick={handleReportLobby}>Report Lobby</Button>
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
