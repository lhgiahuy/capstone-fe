import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLetterOfName(name: string) {
  if (!name || name.trim() === "") {
    return "";
  }
  const nameParts = name.trim().split(" ");
  const firstLetterSurname = nameParts[0].charAt(0).toUpperCase(); // First letter of Họ
  const firstLetterName = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase(); // First letter of Tên
  return firstLetterSurname + firstLetterName;
}

export function getRole(role: number) {
  switch (role) {
    case 1:
      return "Administrator";
    case 2:
      return "Moderator";
    case 3:
      return "User";
    default:
      return "Unknown Role";
  }
}
