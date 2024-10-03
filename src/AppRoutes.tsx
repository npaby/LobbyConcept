import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ProtectedRoute } from "./pages/common/ProtectedRoute.tsx";
import LobbyDashboardPage from "./pages/lobbydashboardpage.tsx";
import LobbyDetailPage from "./pages/lobbydetailpage.tsx";
import SignInPage from "./pages/signin.tsx";
import SignUpPage from "./pages/signup.tsx";

// Correct the nesting of Route components
function AppRoutes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{/* Public Routes */}
					<Route path="/auth/signup" element={<SignUpPage />} />
					<Route path="/auth/signin" element={<SignInPage />} />

					{/* Protected Routes */}
					<Route
						path="/lobby"
						element={
							<ProtectedRoute>
								<LobbyDashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/lobby/:lobbyId"
						element={
							<ProtectedRoute>
								<LobbyDetailPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default AppRoutes;
