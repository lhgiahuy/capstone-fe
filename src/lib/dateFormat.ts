import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Type-safe date formatter function
export default function formatDate(
  date: string,
  formatStr: string = "d MMMM, y"
): string {
  try {
    return format(date, formatStr, { locale: vi });
  } catch (error) {
    console.error("Invalid date or format string:", error);
    return "";
  }
}
