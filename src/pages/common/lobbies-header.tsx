import * as React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import { Button } from "../../components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "../../components/ui/dialog.tsx";
import { Label } from "../../components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select.tsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import { useLobbies } from "../../providers/lobbies-provider.tsx";
import { useSockets } from "../../providers/socket-provider.tsx";
class LobbyDataDto {
	roomName: string;
	rank: string;
	memberId: string;
	role: string;
}

export default function LobbiesHeader() {
	const { createLobby } = useLobbies();
	const [lobbyData, setLobbyData] = useState<LobbyDataDto>({
		roomName: "",
		rank: "",
		memberId: "",
		role: "",
	});
	const socket = useSockets();
	const [storedValue] = useLocalStorage("userData", {});
	const handleCreateLobby = () => {
		console.log(lobbyData);
		createLobby(lobbyData);
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
			<div className="flex-col-2 flex justify-items-end">
				<Dialog>
					<DialogTrigger>
						<Button> Create New Lobby</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<h1>Create Lobby</h1>
							<DialogDescription>
								Please fill out the form below to create a new lobby.
							</DialogDescription>
						</DialogHeader>
						<div>
							<div className="mb-4 w-full mb-4">
								<Label className="w-full h-12">Lobby Name</Label>
								<input
									className="w-full h-12"
									placeholder="Enter Lobby Name"
									onChange={(e) =>
										setLobbyData({ ...lobbyData, roomName: e.target.value })
									}
								/>
							</div>

							<div className="mb-4 w-full mb-4">
								<Label className="w-full h-12">Role</Label>
								<Select
									onValueChange={(e) => setLobbyData({ ...lobbyData, role: e })}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a Role" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Carry">Carry</SelectItem>
											<SelectItem value="HardSupport">Hard Support</SelectItem>
											<SelectItem value="Midlaner">Midlaner</SelectItem>
											<SelectItem value="Offlane">Offlane</SelectItem>
											<SelectItem value="SoftSupport">Soft Support</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							{/*<div className="mb-4 w-full mb-4 ">*/}
							{/*	<Label className="w-full h-12 ">Members</Label>*/}
							{/*	<input*/}
							{/*		className="w-full h-12"*/}
							{/*		onChange={(e) =>*/}
							{/*			setLobbyData({ ...lobbyData, rank: e.target.value })*/}
							{/*		}*/}
							{/*	/>*/}
							{/*</div>*/}

							<div className="mb-4 w-full mb-4 ">
								<Label className="w-full h-12">Rank</Label>
								<Select
									onValueChange={(e) => setLobbyData({ ...lobbyData, rank: e })}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select lobby rank" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Herald">Herald</SelectItem>
											<SelectItem value="Guardian">Guardian</SelectItem>
											<SelectItem value="Crusader">Crusader</SelectItem>
											<SelectItem value="Archon">Archon</SelectItem>
											<SelectItem value="Legend">Legend</SelectItem>
											<SelectItem value="Ancient">Ancient</SelectItem>
											<SelectItem value="Divine">Divine</SelectItem>
											<SelectItem value="Immortal">Immortal</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<Button
								className="w-full h-12 text-white bg-blue-500 hover:bg-blue-600"
								onClick={handleCreateLobby}
							>
								Create Lobby
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}
