import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	// Initialize isAithenticated to null to prevent protected routes
	// from redirecting even when user is authenticated.
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cookies] = useCookies();

	const login = () => setIsAuthenticated(true);
	const logout = () => {
		setIsAuthenticated(false);
		setIsAdmin(false);
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
	return (
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
