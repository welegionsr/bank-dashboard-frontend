'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
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
    const [incompleteUser, setIncompleteUser] = useState(null);

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