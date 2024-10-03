import "./App.css";
import AppRoutes from "./AppRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider";
function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<AppRoutes />
		</ThemeProvider>
	);
}

export default App;
