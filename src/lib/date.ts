import { format } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";

export function formatDate(
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

// export const generateDate = (
//   month = dayjs().month(),
//   year = dayjs().year()
// ) => {
//   const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
//   const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

//   const arrayOfDate = [];

//   // Generate dates only within the current month
//   for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
//     const date = firstDateOfMonth.date(i);
//     arrayOfDate.push({
//       currentMonth: true,
//       date,
//       today: date.toDate().toDateString() === dayjs().toDate().toDateString(),
//     });
//   }

//   return arrayOfDate;
// };

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

export function formatTo12HourTime(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour format
  hours = hours % 12 || 12; // 0 becomes 12

  // Format hours and minutes to always be two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Combine the parts
  return `${formattedHours}:${formattedMinutes}`;
}

export const monthsWithAll = [
  "Tất cả",
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const yearsWithAll = ["Tất cả", "2022", "2023", "2024", "2025"];

export const years = ["2022", "2023", "2024", "2025"];
