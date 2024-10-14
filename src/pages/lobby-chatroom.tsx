import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { ScrollArea } from "../components/ui/scroll-area";
import { Textarea } from "../components/ui/textarea";

export default function LobbyChatroom() {
	return (
		<>
			<Card className="w-2/3 flex flex-col">
				<CardHeader className="p-5 m-0">
					<CardTitle>Chatroom</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 p-5">
					<ScrollArea className="h-[80dvh]">
						<div>
							{Array(20)
								.fill(
									"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,",
								)
								.map((text, index) => (
									<p key={index}>{text}</p>
								))}
						</div>
					</ScrollArea>
					<Textarea
						className="mt-4 h-12 text-black"
						placeholder="Type your message here."
					/>
					<Button className="mt-2 w-full bg-blue-400 text-white">Send</Button>
				</CardContent>
			</Card>
			;
		</>
	);
}
