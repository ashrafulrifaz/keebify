'use client'

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { GooeyToaster } from 'goey-toast';
import 'goey-toast/styles.css';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GooeyToaster position="top-center" />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}