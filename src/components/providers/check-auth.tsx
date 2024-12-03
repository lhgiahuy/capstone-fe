"use client";

import { signOutUser } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";

export default function CheckAuth({
  data,
  children,
}: {
  children: React.ReactNode;
  data: User;
}) {
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

  return <>{children}</>;
}
