'use client';

import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);