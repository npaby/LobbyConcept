// Todo: Save user preferences. Get user preferences once and save it in the memory.
import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const UserDetailsContext = createContext();
export const useUserDetails = () => useContext(UserDetailsContext);

export const AuthProvider = ({ children }) => {
	return <UserDetailsContext.Provider>{children}</UserDetailsContext.Provider>;
};
