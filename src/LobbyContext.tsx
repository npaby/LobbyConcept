import React, { createContext, useContext, useState } from "react";
import { dummyLobbies as initialData } from "./DataTable/data";

const LobbyContext = createContext();

export const useLobbies = () => useContext(LobbyContext);

export function LobbyProvider({ children }) {
    const [datax, setDatax] = useState([...initialData]);

    const addLobby = (newLobby) => {
        setDatax((prevData) => [...prevData, newLobby]);
    };

    return (
        <LobbyContext.Provider value={{ lobbies: datax, addLobby }}>
            {children}
        </LobbyContext.Provider>
    );
}
