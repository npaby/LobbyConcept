import { BrowserRouter, Routes, Route } from "react-router-dom";

import LobbyDashboardPage from "./pages/lobbydashboardpage.tsx";
import LobbyPage from "./pages/lobbypage.tsx";
import SignUpPage from "./pages/signup.tsx";
import SignInPage from "./pages/signin.tsx";
import TestPage from "./pages/testpage.tsx";

// import UsersPage from "./pages/users.tsx";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LobbyDashboardPage />} />
                <Route path="/lobby" element={<LobbyDashboardPage />} />
                <Route path="/lobby/:lobbyId" element={<LobbyPage />} />
                <Route path="/auth/signup" element={<SignUpPage/>} />
                <Route path="/auth/signin" element={<SignInPage/>} />
                <Route path="/mock/test" element={<TestPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
