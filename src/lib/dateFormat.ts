import { format } from "date-fns";
import { vi } from "date-fns/locale";
export default function (date: any, formatStr = "d MMMM, y") {
  return format(date, formatStr, {
    locale: vi,
  });
}
