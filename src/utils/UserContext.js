'use client';

import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(() => {
        // Load the token from localStorage when the app initializes
        if (typeof window !== "undefined") {
            return localStorage.getItem('user-token') || null;
        }
        return null;
    });

    // Update localStorage whenever the token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('user-token', token);
        } else {
            localStorage.removeItem('user-token');
        }
    }, [token]);

    return (
        <userContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);