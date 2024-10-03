import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}
	if (!isAuthenticated) {
		return <Navigate to="/auth/signin" />;
	}
	return children;
};
