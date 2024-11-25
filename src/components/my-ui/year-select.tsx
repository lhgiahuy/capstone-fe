"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { years, yearsWithAll } from "@/lib/date";

interface YearSelectProps {
  value: string | undefined; // The selected month value
  onValueChange: (value: string) => void;
  all?: boolean;
}
export default function YearSelect({
  value,
  onValueChange,
  all,
}: YearSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex gap-4 py-5 bg-primary text-background">
        <SelectValue placeholder="Chọn năm" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {all
            ? yearsWithAll.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))
            : years.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
