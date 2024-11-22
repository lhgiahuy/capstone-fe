"use client";

import { userAtom } from "@/lib/atom/user";
import { useHydrateAtoms } from "jotai/utils";
import { User } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { signOutUser } from "@/lib/auth";

interface AuthProviderProps {
  children: React.ReactNode;
  data: User;
}

export default function AuthProvider({ children, data }: AuthProviderProps) {
  if (data && typeof window !== "undefined") {
    const expiredAt = jwtDecode(data?.token).exp;
    if (expiredAt) {
      const now = new Date();
      const expiredDate = new Date(expiredAt * 1000);
      if (now >= expiredDate) {
        signOutUser();
      }
    }
  }
  useHydrateAtoms([[userAtom, data] as any]);
  return <>{children}</>;
}
