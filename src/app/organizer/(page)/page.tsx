"use client";

import NavBar from "./_component/navbar";
import Overview from "./_component/overview";
import { useQuery } from "@tanstack/react-query";
import { getOrganizerReport } from "@/action/report";
import { OverviewReport } from "@/interface/organizer-report";
import { Chart } from "./_component/chart";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { format, toDate } from "date-fns";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
  const [addParam] = useSearchParamsHandler();
  const searchParams = useSearchParams();

  const fromDate = searchParams.get("fromDate")?.toString() || "2024-01-01";
  const endDate = searchParams.get("endDate")?.toString() || "2025-01-01";
  const { data } = useQuery({
    queryKey: ["organizer-report", fromDate, endDate],
    queryFn: () =>
      getOrganizerReport({ startDate: fromDate, endDate: endDate }),
  });

  const overviewData: OverviewReport = {
    noOfEvents: data?.noOfEvents,
    noOfRegistered: data?.noOfRegistered,
    noOfUsersAttended: data?.noOfUsersAttended,
    noOfUsersNotAttended: data?.noOfUsersNotAttended,
  };

  const handleStartDateSelect = ({ fromDate }: { fromDate: Date }) => {
    addParam({
      fromDate: fromDate.toISOString(),
    });
  };
  const handleEndDateSelect = ({ endDate }: { endDate: Date }) => {
    addParam({
      endDate: endDate.toISOString(),
    });
  };
  return (
    <>
      <NavBar breadcrumb={[{ title: "Dashboard", link: "#" }]} />
      <div className="flex w-full justify-end py-4">
        {/* <CalendarDatePicker
          variant={"default"}
          date={{ from: toDate(fromDate), to: toDate(endDate) }}
          onDateSelect={({ from, to }) => {
            handleDateSelect({ fromDate: from, endDate: to });
          }}
        /> */}
        <div className="flex gap-2 items-center">
          <h4 className="text-sm text-muted-foreground">Từ ngày</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "min-w-[12rem] pl-3 text-left font-normal",
                  !toDate(fromDate) && "text-muted-foreground"
                )}
              >
                {toDate(fromDate) ? (
                  format(toDate(fromDate), "dd/MM/yyyy")
                ) : (
                  <span>Chọn ngày</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate(fromDate)}
                onSelect={(value) => {
                  if (value) {
                    handleStartDateSelect({ fromDate: value });
                  }
                }}
                initialFocus
                today={toDate(fromDate)}
              />
            </PopoverContent>
          </Popover>
          <h4 className="text-sm text-muted-foreground">Đến ngày</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "min-w-[12rem] pl-3 text-left font-normal",
                  !toDate(endDate) && "text-muted-foreground"
                )}
              >
                {toDate(endDate) ? (
                  format(toDate(endDate), "dd/MM/yyyy")
                ) : (
                  <span>Chọn ngày</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate(endDate)}
                onSelect={(value) => {
                  if (value) {
                    handleEndDateSelect({ endDate: value });
                  }
                }}
                initialFocus
                today={toDate(endDate)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-8 pb-16">
        <Overview {...overviewData}></Overview>
        <div className="flex h-full w-full justify-between gap-4">
          <Chart registrationData={data?.events}></Chart>
          {/* <div className="flex flex-col gap-4 w-full max-w-[32rem]">
            <h3 className="text-primary">
              Danh sách người dùng hay tham gia sự kiện
            </h3>
            <DataTable
              hideColumns={hideColumns}
              columns={columns}
              data={data?.usersAttended}
              totalPages={data?.totalPages}
              noFilter
            />
          </div> */}
          {/* <div className="flex flex-col gap-4">
            <h3 className="text-primary">
              Danh sách người dùng không tham gia sự kiện
            </h3>
            <DataTable
              hideColumns={hideColumns}
              columns={columns}
              data={data?.usersNotAttended}
              totalPages={data?.totalPages}
              noFilter
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
