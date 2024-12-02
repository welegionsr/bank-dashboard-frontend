'use client';

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [valid, setValid] = useState(false);

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
            sessionStorage.setItem('user', JSON.stringify({ email: user.email, isVerified: user.isVerified }));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
        setValid(false);
        sessionStorage.removeItem('user'); // Clean user from sessionStorage
        router.push('/login');
    };

    return (
        <userContext.Provider value={{ user, setUser, handleLogout, valid, setValid }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);