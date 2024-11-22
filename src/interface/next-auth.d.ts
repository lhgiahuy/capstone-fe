// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    userId: string;
    username: string;
    avatarUrl: string;
    email: string;
    phoneNumber: string;
    cardUrl: string;
    verifyStatus: string;
    roleName: string;
    createdAt: string;
    processNote: string;
    updatedAt: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    token: string;
  }

  interface Session {
    user: User;
  }
}
