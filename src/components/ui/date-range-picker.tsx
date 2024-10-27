"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild className="flex">
          <Button
            id="date"
            className={cn(
              "justify-start text-left font-normal ",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d MMMM, y", { locale: vi })} -{" "}
                  {format(date.to, "d MMMM, y", { locale: vi })}
                </>
              ) : (
                format(date.from, "d MMMM, y", { locale: vi })
              )
            ) : (
              <div className="flex gap-2 items-center text-background">
                <CalendarIcon></CalendarIcon>
                <span>Chọn ngày</span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-foreground text-background"
          align="end"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
