'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { globalLogout } from "./logout";
import { fetchCurrentUser } from "@/app/api/usersApi";
import { destroyCookie, parseCookies } from "nookies";

const isProduction = process.env.NODE_ENV === 'production';
const userContext = createContext();

export const UserProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const { isLoggedIn } = parseCookies();
    const loggedInBool = isLoggedIn === 'true';
    const [loggedIn, setLoggedIn] = useState(loggedInBool);
    const [role, setRole] = useState(null);


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

    const handleLogout = async () => {
        try {
            const { isLoggedIn } = parseCookies(); // get the latest cookie snapshot to ensure we're not using stale data
            if (isLoggedIn) {
                destroyCookie(null, "isLoggedIn", {
                    sameSite: isProduction ? 'None' : 'Lax',
                    secure: isProduction,
                    path: '/',
                    ...(isProduction && { partitioned: true }),
                    ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
                });
            }
            setLoggedIn(false);
            setRole(null);
            if (typeof window !== 'undefined' && sessionStorage) {
                sessionStorage.removeItem("role");
            }
            queryClient.clear();
            await globalLogout();
        }
        catch (error) {
            console.error("[handleLogout] Error during logout:", error);
        }

    };

    const updateUser = (newUser) => {
        setRole(newUser.role || "guest");
        if (typeof window !== 'undefined' && sessionStorage) {
            sessionStorage.setItem("role", newUser.role || "guest");
        }
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