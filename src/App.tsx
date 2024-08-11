import './App.css';
import AppRoutes from "./AppRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { LobbyProvider } from "./LobbyContext";
function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <LobbyProvider>
                <AppRoutes />
            </LobbyProvider>
        </ThemeProvider>
    );
}

export default App;
