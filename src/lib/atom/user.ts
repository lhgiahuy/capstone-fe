import { atom } from "jotai";
import { User } from "next-auth";

export const userAtom = atom<User | undefined>(undefined);
