'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { globalLogout } from "./logout";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const queryClient = useQueryClient(); // Access the QueryClient

    // Initialize user from sessionStorage
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = sessionStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    // Update sessionStorage whenever user changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify({ id: user._id, email: user.email, isVerified: user.isVerified, role: user.role }));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

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