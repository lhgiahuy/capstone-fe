"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { months } from "@/lib/date";

interface MonthSelectProps {
  value: string | undefined; // The selected month value
  onValueChange: (value: string) => void; // Callback for value change
}
export default function MonthSelect({
  value,
  onValueChange,
}: MonthSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex gap-4 py-5 bg-primary text-background">
        <SelectValue placeholder="Chọn tháng" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {months.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
