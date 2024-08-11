import { BrowserRouter, Routes, Route } from "react-router-dom";
import LobbyTable from "./DataTable/LobbyTable.tsx";
import LobbyPage from "./LobbyPage.tsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LobbyTable />} />
                <Route path="/lobby" element={<LobbyTable />} />
                <Route path="/lobby/:lobbyId" element={<LobbyPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
