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
import { useLobbies } from "../../providers/lobbies-provider.tsx";

export default function LobbiesHeader() {
	const { createLobby } = useLobbies();
	return (
		<>
			<div className="mb-5">
				<Label className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Lobbies Management
				</Label>
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
								<input className="w-full h-12" />
							</div>

							<div className="mb-4 w-full mb-4">
								<Label className="w-full h-12">Rank</Label>
								<input className="w-full h-12" />
							</div>

							<div className="mb-4 w-full mb-4 ">
								<Label className="w-full h-12 ">Members</Label>
								<input className="w-full h-12" />
							</div>

							<div className="mb-4 w-full mb-4 ">
								<Label className="w-full h-12">Role (Yours)</Label>
								<input className="w-full h-12" />
							</div>
							<Button
								className="w-full h-12 text-white bg-blue-500 hover:bg-blue-600"
								onClick={createLobby}
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
