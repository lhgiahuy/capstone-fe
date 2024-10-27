"use client";

import MonthSelect from "@/components/my-ui/month-select";
import useAddSearchParam from "@/hooks/use-add-search-param";
import { generateDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import EventList from "../../_component/event-list";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/action/event";
export default function MyEvent() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const addParam = useAddSearchParam();
  const searchParams = useSearchParams();
  const [selectDate, setSelectDate] = useState(currentDate);

  const month =
    searchParams.get("thang")?.toString() || `Tháng ${new Date().getMonth()}`;
  const monthNum =
    parseInt((searchParams.get("thang") || "").replace("Tháng ", ""), 10) - 1 ||
    today.month() - 1;
  const handleMonthFilter = (value: string) => {
    addParam({ thang: value });
    setToday(today.month(monthNum - 1));
  };
  const LIMIT = 3;
  const { data } = useQuery({
    queryKey: ["events", LIMIT],
    queryFn: () => getEvent({ PageSize: LIMIT }),
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-primary font-bold">Sự kiện của tôi</h1>
      <div className="flex justify-between items-center">
        <div className="flex justify-end w-full">
          <div>
            <MonthSelect value={month} onValueChange={handleMonthFilter} />
          </div>
        </div>

        {/* <div className="flex gap-10 items-center ">
          <h1
            className=" cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </h1>
        </div> */}
      </div>
      <div className="flex flex-col gap-16 w-full mx-auto">
        <div className="w-full flex flex-col justify-center h-[29rem] p-4 rounded-lg bg-card">
          <div className="grid grid-cols-7 ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="w-full text-center h-16 grid place-content-center text-foreground select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid grid-cols-7 ">
            {generateDate(monthNum, today.year()).map(
              ({ date, currentMonth, today }, index) => {
                // if (!currentMonth) return <></>;
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-16 grid place-content-center"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "!hidden text-muted",
                        today ? "bg-accent text-foreground" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-primary text-accent"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
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
              <EventList data={data} title="" ticketStyle vertical />
            </div>
          </div>
          <div className="w-[calc(50%-1.5rem)] flex flex-col items-center gap-4">
            <h3 className="text-primary text-2xl">Đã kết thúc</h3>
            <div className="h-full">
              <EventList data={data} title="" ticketStyle vertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
