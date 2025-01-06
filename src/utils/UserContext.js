'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { globalLogout } from "./logout";
import { fetchCurrentUser } from "@/app/api/usersApi";


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const queryClient = useQueryClient(); // Access the QueryClient

    const [valid, setValid] = useState(false);

    const { data: user, isError, isLoading, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchCurrentUser,
        retry: false,
        onError: () => handleLogout(), // Logout on error
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


    const handleLogout = () => {
        sessionStorage.removeItem("role");
        queryClient.clear();
        globalLogout();
    };

    const updateUser = (newUser) => {
        setRole(newUser.role || "guest");
        setValid(true);
        sessionStorage.setItem("role", newUser.role || "guest");
    };

    return (
        <userContext.Provider value={{
            user,
            role: user?.role || role,
            isLoading,
            isError,
            valid,
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