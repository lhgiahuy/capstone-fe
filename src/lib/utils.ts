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

  // If the name has no space (single part), just return the first letter of that single name
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  // Otherwise, return the first letter of both the surname and the given name
  const firstLetterSurname = nameParts[0].charAt(0).toUpperCase(); // First letter of Họ
  const firstLetterName = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase(); // First letter of Tên

  return firstLetterSurname + firstLetterName;
}
