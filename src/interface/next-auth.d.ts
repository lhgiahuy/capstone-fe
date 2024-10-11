// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    avatarUrl: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cardUrl: string;
    verified: boolean;
    roleName: string;
    createdAt: string;
    updatedAt: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    token: string;
  }

  interface Session {
    user: User;
  }
}
