'use client';

import TopNav from '@/components/TopNav';
import { roboto } from '@/utils/fonts';
import { UserProvider } from '@/utils/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <TopNav />
            {children}
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
