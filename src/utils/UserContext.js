'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { globalLogout } from "./logout";
import { fetchCurrentUser } from "@/app/api/usersApi";
import { parseCookies } from "nookies";


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [loggedIn, setLoggedIn] = useState(false);
    const { isLoggedIn } = parseCookies();
    const loggedInBool = isLoggedIn === 'true'; // Ensure it's a boolean

    useEffect(() => {
        if (loggedIn !== loggedInBool) {
            setLoggedIn(loggedInBool);
        }
    }, [loggedInBool, loggedIn]);


    const { data: user, isError, isLoading, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchCurrentUser,
        retry: false,
        enabled: loggedIn,
        onSuccess: (data) => {
            console.log("[onSuccess] User data fetched successfully:", data);
            setRole(data.role);
        },
        onError: () => handleLogout(), // Logout on error
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    // values for incomplete user data, used in registration and verification pages
    // Load initial value from sessionStorage if available
    const [incompleteUser, setIncompleteUserState] = useState(() => {
        if (typeof window !== 'undefined' && sessionStorage) {
            const savedValue = sessionStorage.getItem('incompleteUser');
            return savedValue ? JSON.parse(savedValue) : null;
        }
    });

    const setIncompleteUser = (value) => {
        setIncompleteUserState(value);
        if (typeof window !== 'undefined' && sessionStorage) {
            if (value === null) {
                sessionStorage.removeItem('incompleteUser');
            } else {
                sessionStorage.setItem('incompleteUser', JSON.stringify(value));
            }
        }
    };

    const [role, setRole] = useState(null);


    const handleLogout = async () => {
        setLoggedIn(false);
        sessionStorage.removeItem("role");
        queryClient.clear();
        await globalLogout();
    };

    const updateUser = (newUser) => {
        setRole(newUser.role || "guest");
        sessionStorage.setItem("role", newUser.role || "guest");
    };

    return (
        <userContext.Provider value={{
            user,
            role: user?.role || role,
            isLoading,
            isError,
            incompleteUser,
            setIncompleteUser,
            refetch,
            handleLogout,
            setUser: updateUser
        }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);