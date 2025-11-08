"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';





export default function Providers({ children }: { children: ReactNode }) {

  return (
    <SessionProvider refetchInterval={5 * 60}>
    
            <Toaster position="top-right" /> 
              {children}
           
    </SessionProvider>
  );
}