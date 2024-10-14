import LobbyChatroom from "./lobby-chatroom.tsx";
import LobbyDetailPage from "./lobbydetailpage.tsx";

export default function LobbyPage() {
	return (
		<div className="flex grid-rows-1 gap-3 p-0 m-0">
			<LobbyDetailPage />
			<LobbyChatroom />
		</div>
	);
}
