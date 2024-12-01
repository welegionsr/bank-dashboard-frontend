'use client';

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
        router.push('/login');
    };

    return (
        <userContext.Provider value={{user, setUser, handleLogout}}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);