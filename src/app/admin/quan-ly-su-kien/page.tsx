"use client";

import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";
import { User } from "@/interface/user";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { parseISO } from "date-fns";
import { getEvents } from "@/action/event";
import AdminNavBar from "../_component/admin-navbar";

export default function Event() {
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "eventName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên sự kiện
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    // {
    //   accessorKey: "avatarUrl",
    //   header: "Ảnh đại diện",
    //   cell: ({ row }) => (
    //     <div className="w-full flex justify-center">
    //       <Avatar className="w-8 h-8">
    //         <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
    //         <AvatarFallback>
    //           {getFirstLetterOfName(row.original.username)}
    //         </AvatarFallback>
    //       </Avatar>
    //     </div>
    //   ),
    // },

    {
      accessorKey: "description",
      header: "Mô tả",
    },
    {
      accessorKey: "organizerName",
      header: "Người tổ chức",
    },
    {
      accessorKey: "startTime",
      header: "Ngày bắt đầu",
    },
    {
      accessorKey: "endTime",
      header: "Ngày kết thúc",
    },
    {
      accessorKey: "maxAttendees",
      header: "Số người tham gia",
    },
    {
      accessorKey: "statusId",
      header: "Trạng thái",
    },
  ];
  const hideColumns = ["description", "isDeleted", "deletedAt"];
  return (
    <>
      <AdminNavBar links={["Quản lý sự kiện"]} />
      <div className="">
        {isPending ? (
          <></>
        ) : (
          <DataTable
            hideColumns={hideColumns}
            columns={columns}
            data={data.items}
          />
        )}
      </div>
    </>
  );
}
