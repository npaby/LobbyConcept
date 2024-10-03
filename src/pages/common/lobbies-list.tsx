import { ScrollArea } from "../../components/ui/scroll-area.tsx";
import { useLobbies } from "../../providers/lobbies-provider.tsx";
import LobbiesCard from "./lobbies-card.tsx";

export default function LobbiesList() {
	const { lobbies } = useLobbies();
	return (
		<ScrollArea className="overflow-auto w-dvh h-[70lvh] bg-amber-300 p-5">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{(() => {
					console.log("Does thid rerenders?");
				})()}
				{lobbies?.map((lobby) => (
					<LobbiesCard key={lobby.lobbyId} lobby={lobby} />
				))}
			</div>
		</ScrollArea>
	);
}
