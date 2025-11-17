// hooks/useUser.ts
"use client";

import { UserData } from "@/lib/interfaces/interfaces";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  return {
    user: user as UserData | undefined,
    isAuthenticated,
    isLoading: status === "loading",
  };
};
