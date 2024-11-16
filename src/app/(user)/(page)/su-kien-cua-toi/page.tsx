"use client";

import MonthSelect from "@/components/my-ui/month-select";
import { generateDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import EventList from "../../_component/event-list";
import { useQuery } from "@tanstack/react-query";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
import { getRegisteredEvent } from "@/action/user";

export default function MyEvent() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [addParam] = useSearchParamsHandler();
  const searchParams = useSearchParams();

  const month =
    searchParams.get("thang")?.toString() ||
    `Tháng ${new Date().getMonth() + 1}`;
  const monthNum =
    parseInt((searchParams.get("thang") || "").replace("Tháng ", ""), 10) - 1 ||
    today.month();
  const handleMonthFilter = (value: string) => {
    addParam({ thang: value });
    setToday(today.month(monthNum - 1));
  };
  const paramMonth = monthNum + 1;
  const { data: upcomingEvent } = useQuery({
    queryKey: ["my-event", paramMonth],
    queryFn: () => getRegisteredEvent(false, paramMonth),
  });
  const { data: completedEvent } = useQuery({
    queryKey: ["my-event", true, paramMonth],
    queryFn: () => getRegisteredEvent(true, paramMonth),
  });
  // Extract start dates from events
  const eventDates = [...(upcomingEvent || []), ...(completedEvent || [])].map(
    (event) => dayjs(event.startTime).startOf("day").toDate()
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-primary font-bold">Sự kiện của tôi</h1>
      <div className="flex justify-between items-center">
        <div className="flex justify-end w-full">
          <div>
            <MonthSelect value={month} onValueChange={handleMonthFilter} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-16 w-full mx-auto">
        <div className="w-full flex flex-col justify-center h-[29rem] p-4 rounded-lg bg-card">
          <div className="grid grid-cols-7 ">
            {days.map((day, index) => (
              <h1
                key={index}
                className="w-full text-center h-16 grid place-content-center text-foreground select-none"
              >
                {day}
              </h1>
            ))}
          </div>

          <div className="grid grid-cols-7 ">
            {generateDate(monthNum, today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const isEventDate = eventDates.some((eventDate) =>
                  dayjs(eventDate).isSame(date, "day")
                );

                return (
                  <div
                    key={index}
                    className="p-2 text-center h-16 grid place-content-center"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "!hidden text-muted",
                        today ? "bg-accent text-foreground" : "",
                        isEventDate ? "bg-primary text-background" : "",
                        // selectDate.toDate().toDateString() ===
                        //   date.toDate().toDateString()
                        //   ? "bg-primary text-accent"
                        //   : "",
                        "h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none"
                      )}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="w-[calc(50%-1.5rem)] flex flex-col items-center gap-4">
            <h3 className="text-primary text-2xl">Sắp diễn ra</h3>
            <div className="h-full">
              <EventList event={upcomingEvent} title="" ticketStyle vertical />
            </div>
          </div>
          <div className="w-[calc(50%-1.5rem)] flex flex-col items-center gap-4">
            <h3 className="text-destructive text-2xl">Đã kết thúc</h3>
            <div className="h-full">
              <EventList event={completedEvent} title="" ticketStyle vertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
