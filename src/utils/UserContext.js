'use client';

import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { globalLogout } from "./logout";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [valid, setValid] = useState(false);
    const queryClient = useQueryClient(); // Access the QueryClient
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        setUser(null);
        setValid(false);
        queryClient.clear();
        globalLogout();
    };

    return (
        <userContext.Provider value={{ user, setUser, handleLogout, valid, setValid }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);