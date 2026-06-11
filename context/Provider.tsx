'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import TokenManager from "./TokenManager";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <TokenManager />
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
