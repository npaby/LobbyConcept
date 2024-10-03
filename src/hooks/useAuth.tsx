import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocalStorage } from "./useLocalStorage.tsx";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getUserData = async () => {
	try {
		const { data } = await axios.get("http://localhost:3000/users/getInfo", {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.error("Failed to fetch user data:", error);
		return null;
	}
};
export const AuthProvider = ({ children }) => {
	// Initialize authentication state
	const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
	const [isAdmin, setIsAdmin] = useState(false);
	const [cookies] = useCookies();
	const [storedValue, setStoredValue] = useLocalStorage("userData", null); // moved inside the component
	const login = () => setIsAuthenticated(true);
	const logout = () => {
		setIsAuthenticated(false);
		setIsAdmin(false);
		setStoredValue(null);
	};

	useEffect(() => {
		if (cookies.accessToken && cookies.refreshToken) {
			console.log("Access token and refresh token found");
			setIsAuthenticated(true);
		} else {
			console.log("No access token or refresh token found");
			setIsAuthenticated(false);
		}

		if (cookies.isAdministrator || cookies.isAdmin) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [cookies]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (isAuthenticated) {
				const data = await getUserData();
				if (data) {
					setStoredValue(data);
				}
			}
		};

		fetchUserData();
	}, [isAuthenticated, setStoredValue]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
