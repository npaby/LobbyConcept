import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { useEffect, useRef, useState } from "react";
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
	const [messagesDatas, setMessagesDatas] = useState(messageData);
	const [message, setMessage] = useState("");
	const messagesEndRef = useRef<null | HTMLDivElement>(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		scrollToBottom();
	}, [messagesDatas]);

	console.log("--------------- LOBBY CHATROOM -----------------");
	useEffect(() => {
		console.log("this is called");
		chatRoomSocket.emit("chat:joinChatroom", lobbyId);
		chatRoomSocket.on("chat:sendMessage", (message) => {
			setMessagesDatas([...messagesDatas, message]);
		});
		chatRoomSocket.on("chatRoom:getMessages", (messages) => {
			setMessagesDatas(messages);
		});
		chatRoomSocket.on("chatRoom:newMessage", (message) => {
			setMessagesDatas([...messagesDatas, message]);
		});
		return () => {
			chatRoomSocket.off("chatRoom:sendMessage");
			chatRoomSocket.off("chatRoom:getMessages");
			chatRoomSocket.off("chatRoom:joinChatroom");
			chatRoomSocket.off("chatRoom:newMessage");
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
		console.log("B Messages data length: ", messagesDatas.length);
		setMessagesDatas([...messagesDatas, messageToSend]);
		console.log("A Messages data length: ", messagesDatas.length);
		setMessage("");
	};
	return (
		<>
			<Card className="w-2/3 flex flex-col">
				<CardHeader className="p-5 m-0">
					<CardTitle>Chatroom</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 p-5">
					<ScrollArea className="h-[80dvh] w-full">
						<div className="p-5 w-full">
							{messagesDatas.map((message, index) => {
								const isSender = storedValue.sub === message.senderId;
								const containerClasses = `flex mb-4 ${isSender ? "justify-end" : "justify-start"}`;
								const messageClasses = `p-2 rounded-lg ${
									isSender
										? "bg-amber-950 text-right w-4/6"
										: "bg-amber-950 text-left w-2/3"
								}`;
								return (
									<div className={containerClasses} key={index}>
										<div className={messageClasses}>
											<div className="font-bold text-sm text-gray-500">
												{message.senderId}
											</div>
											<div className="ml-2 text-sm text-gray-500">
												{message.text}
											</div>
										</div>
									</div>
								);
							})}
							<div ref={messagesEndRef} />
						</div>
					</ScrollArea>
					<Textarea
						className="mt-4 h-12 text-black"
						placeholder="Type your message here."
						onChange={(e) => setMessage(e.target.value)}
						value={message}
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
