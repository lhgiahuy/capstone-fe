"use client";

import NavBar from "./_component/navbar";
import Overview from "./_component/overview";
import { useQuery } from "@tanstack/react-query";
import { getOrganizerReport } from "@/action/report";
import { OverviewReport } from "@/interface/organizer-report";
import { Chart } from "./_component/chart";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetterOfName } from "@/lib/utils";
import { CalendarDatePicker } from "@/components/ui/date-range-picker";
import { useSearchParams } from "next/navigation";
import { toDate } from "date-fns";
import useSearchParamsHandler from "@/hooks/use-add-search-param";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["organizer-report", "2024-01-01", "2025-01-01"],
    queryFn: () =>
      getOrganizerReport({ startDate: "2024-01-01", endDate: "2025-01-01" }),
  });
  const overviewData: OverviewReport = {
    noOfEvents: data?.noOfEvents,
    noOfRegistered: data?.noOfRegistered,
    noOfUsersAttended: data?.noOfUsersAttended,
    noOfUsersNotAttended: data?.noOfUsersNotAttended,
  };
  const [addParam] = useSearchParamsHandler();

  const searchParams = useSearchParams();
  const fromDate =
    searchParams.get("fromDate")?.toString() || new Date().toISOString();
  const endDate =
    searchParams.get("endDate")?.toString() || new Date().toISOString();

  const handleDateSelect = ({
    fromDate,
    endDate,
  }: {
    fromDate: Date;
    endDate: Date;
  }) => {
    addParam({
      fromDate: fromDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  const hideColumns = ["isDeleted", "deletedAt"];
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "username",
      header: "Tên người dùng",
      cell: ({ row }) => (
        <div className="w-64 flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.username)}
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-2">{row.original.username}</p>
        </div>
      ),
    },
    // {
    //   accessorKey: "noOfEvents",
    //   header: "Số sự kiện đã tham gia",
    // },
  ];
  return (
    <>
      <NavBar breadcrumb={[{ title: "Dashboard", link: "#" }]} />
      <div className="flex w-full justify-end py-4">
        <CalendarDatePicker
          variant={"default"}
          date={{ from: toDate(fromDate), to: toDate(endDate) }}
          onDateSelect={({ from, to }) => {
            handleDateSelect({ fromDate: from, endDate: to });
          }}
        />
      </div>
      <div className="flex flex-col gap-16 pb-16">
        <Overview {...overviewData}></Overview>
        <div className="flex h-full w-full justify-between gap-4">
          <Chart registrationData={data?.registrationDetails}></Chart>
          <div className="flex flex-col gap-4 w-full max-w-[24rem]">
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
          </div>
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
