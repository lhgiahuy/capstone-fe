"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { months, monthsWithAll } from "@/lib/date";

interface MonthSelectProps {
  value: string | undefined; // The selected month value
  onValueChange: (value: string) => void;
  all?: boolean;
}
export default function MonthSelect({
  value,
  onValueChange,
  all,
}: MonthSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex gap-4 py-5 bg-primary text-background">
        <SelectValue placeholder="Chọn tháng" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {all
            ? monthsWithAll.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))
            : months.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
