"use client";

import { userAtom } from "@/lib/atom/user";
import { useHydrateAtoms } from "jotai/utils";
import { User } from "next-auth";

interface AuthProviderProps {
  children: React.ReactNode;
  data: User;
}
export default function AuthProvider({ children, data }: AuthProviderProps) {
  useHydrateAtoms([[userAtom, data] as any]);
  return <>{children}</>;
}
