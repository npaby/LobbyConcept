import * as React from "react";

import { LobbiesProvider } from "../providers/lobbies-provider.tsx";
import LobbiesHeader from "./common/lobbies-header.tsx";
import LobbiesList from "./common/lobbies-list.tsx";
export default function LobbyDashboardPage() {
	return (
		<div>
			<LobbiesProvider>
				<LobbiesHeader />
				<LobbiesList />
			</LobbiesProvider>
		</div>
	);
}
