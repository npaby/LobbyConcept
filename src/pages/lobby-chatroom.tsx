import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";
import { Textarea } from "../components/ui/textarea";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { useSockets } from "../providers/socket-provider";
import { messageData } from "./common/messageData";
export default function LobbyChatroom() {
	const chatRoomSocket = useSockets()[0];
	const [storedValue] = useLocalStorage("userData", {});
	const { lobbyId } = useParams();
	const [messageDatas, setMessageDatas] = useState([messageData]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		chatRoomSocket.emit("chat:joinChatroom", lobbyId);
		chatRoomSocket.on("chat:sendMessage", (message) => {
			messageData.push(message);
		});
		return () => {
			chatRoomSocket.off("chat:newMessage");
		};
	}, []);
	const handleSendMessage = () => {
		const messageToSend = {
			lobbyId,
			text: message,
			senderId: storedValue.sub,
		};
		console.log("Sending message: ", messageToSend);
		// chatRoomSocket.emit("chat:sendMessage", messageToSend);
		console.log("B Messages data length: ", messageDatas.length);
		setMessageDatas(messageDatas.concat(messageToSend));
		console.log("A Messages data length: ", messageDatas.length);
	};
	return (
		<>
			<Card className="w-2/3 flex flex-col">
				<CardHeader className="p-5 m-0">
					<CardTitle>Chatroom</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 p-5">
					<ScrollArea className="h-[80dvh]">
						<div>
							{messageData.map((message) => (
								<div className="mb-4">
									<div className="text-left">
										<div className="font-bold text-sm text-gray-500">
											{message.senderId}
										</div>
										<div className="ml-2 text-sm text-gray-500">
											{message.text}
										</div>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
					<Textarea
						className="mt-4 h-12 text-black"
						placeholder="Type your message here."
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button
						className="mt-2 w-full bg-blue-400 text-white"
						onClick={handleSendMessage}
					>
						Send
					</Button>
				</CardContent>
			</Card>
			;
		</>
	);
}
