'use client';

import { UserProvider } from "@/utils/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import TopNav from "./TopNav";

export default function ClientProviders({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <TopNav />
                {children}
            </UserProvider>
        </QueryClientProvider>
    )
}