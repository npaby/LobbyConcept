import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "../components/ui/avatar.tsx";
import { Button } from "../components/ui/button.tsx";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../components/ui/context-menu.tsx";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import Offlane from "../imgs/Offlane.svg";

import Carry from "../imgs/Carry.svg";
import HardSupport from "../imgs/HardSupport.svg";
import Midlaner from "../imgs/Midlaner.svg";
import SoftSupport from "../imgs/SoftSupport.svg";
import { useSockets } from "../providers/socket-provider.tsx";
export default function LobbyDetailPage() {
	const socket = useSockets();
	const { lobbyId } = useParams();
	const [leaveLobby, setLeaveLobby] = useState(false);
	const [lobbyInfo, setLobbyInfo] = useState(null);
	const [storedValue] = useLocalStorage("userData", {});
	const navigate = useNavigate();
	const [isUserOwner, setIsUserOwner] = useState(false);
	const [selectedRole, setSelectedRole] = useState(null);

	console.log("--------------- LOBBY DETAIL PAGE -----------------");
	// console.log("[LDP]: Rerenders");
	// console.log(socket);

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
		socket.on("lobby:updateLobby:makeOwner", (msg) => {
			socket.emit("lobby:getLobbyInfo", lobbyId);
		});
		socket.on("lobby:updateLobby:kickMember", (msg) => {
			socket.emit("lobby:getLobbyInfo", lobbyId);
		});
		socket.on("lobby:updateLobby:kickMember:youHaveBeenKicked", () => {
			navigate("../.."); // Redirect to the homepage if the user leaves the lobby
		});
		return () => {
			socket.off("lobby:getLobbyInfo");
			socket.off("lobby:joinLobby");
			socket.off("lobby:leaveLobby");
			socket.off("lobby:updateLobby:makeOwner");
		};
	}, []);

	const handleLeaveLobby = () => {
		if (socket) {
			socket.emit("lobby:leaveLobby", lobbyId);
			navigate("../..");
		}
		setLeaveLobby(true);
	};
	const handleMakeOwner = useCallback((memberId) => {
		console.log("You promoted someone!", memberId);
		socket.emit("lobby:updateLobby:makeOwner", {
			lobbyId,
			memberId,
		});
	}, []);
	// const handleReportLobby = useCallback((lobbyId, reportInformation)) => {};
	const handleReportMember = useCallback((memberId) => {
		alert("You reported someone!", memberId);
	}, []);
	const handleKickMember = useCallback((memberId) => {
		// alert("You kicked someone!", memberId);
		socket.emit("lobby:updateLobby:kickMember", { lobbyId, memberId });
		console.log("Kicking Member ", lobbyId, memberId);
	}, []);

	const renderMembers = () => {
		useEffect(() => {
			if (lobbyInfo?.members) {
				for (const member of lobbyInfo.members) {
					if (member.memberId === storedValue.sub) {
						if (member.isOwner) {
							// console.log("User is owner");
							setIsUserOwner(true);
						}
					}
				}
			}
		}, [lobbyInfo, storedValue]);
		if (isUserOwner) {
			return lobbyInfo?.members?.map((member: any) => (
				<div className="h-[10dvh] m-4 rounded-3xl bg-amber-950 flex flex-row grid-2 items-center text-center justify-center">
					<div className=" w-24 h-24 flex bg-amber-200 rounded-full items-center text-center justify-center">
						<Avatar>
							<AvatarImage
								src={HardSupport}
								width="128px"
								height="64px"
								className="object-fill"
							/>
						</Avatar>
					</div>
					<div className="flex items-center text-center justify-center">
						{renderMemberContextMenu(true, (member = member))}
					</div>
				</div>
			));
		}
		return lobbyInfo?.members?.map((member: any) => (
			<div className="h-[10dvh] m-4 rounded-3xl bg-amber-950 flex flex-row grid-2 items-center text-center justify-center">
				<div className=" w-24 h-24 flex bg-amber-200 rounded-full items-center text-center justify-center">
					<Avatar>
						<AvatarImage
							src={HardSupport}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</div>
				<div className="flex h-24 items-center text-center justify-center">
					{renderMemberContextMenu(false, (member = member))}
				</div>
			</div>
		));
	};
	const renderRolesContextMenu = () => {};
	const renderMemberContextMenu = (isOwner: boolean, member: string) => {
		if (isOwner) {
			return (
				<ContextMenu>
					<ContextMenuTrigger>
						<div className="h-24 bg-blue-500">
							<div
								key={member?.memberId}
								className="text-2xl p-3 flex items-center text-center justify-center text-white"
							>
								{member?.memberId}
							</div>
							<div className="text-2xl"> {member?.isOwner && "Owner"}</div>
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem
							onClick={() => {
								handleReportMember(member?.memberId);
							}}
						>
							Report
						</ContextMenuItem>
						<ContextMenuItem>Add Friend</ContextMenuItem>
						{!member?.isOwner && (
							<>
								<ContextMenuItem
									onClick={() => {
										handleMakeOwner(member?.memberId);
									}}
								>
									Make Owner
								</ContextMenuItem>
								<ContextMenuItem
									onClick={() => {
										handleKickMember(member?.memberId);
									}}
								>
									Kick User
								</ContextMenuItem>
							</>
						)}
					</ContextMenuContent>
				</ContextMenu>
			);
		}
		return (
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="bg-blue-500">
						<div
							key={member?.memberId}
							className="text-2xl p-3 flex items-center text-center justify-center text-white"
						>
							{member?.memberId}
						</div>
						<div className="text-2xl"> {member?.isOwner && "Owner"}</div>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onClick={() => {
							handleReportMember(member?.memberId);
						}}
					>
						Report
					</ContextMenuItem>
					<ContextMenuItem>Add Friend</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		);
	};
	return (
		<div className="w-1/3 ">
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
								{/*<Button onClick={handleReportLobby}>Report Lobby</Button>*/}
								<Button onClick={handleLeaveLobby}>Leave Lobby</Button>
							</div>
						</div>
					</div>
					{renderMembers()}
				</div>
			</div>
		</div>
	);
}
