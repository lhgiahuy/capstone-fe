"use client";

import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";
import { User } from "@/interface/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { parseISO } from "date-fns";
import { getEvent } from "@/action/event";

import Link from "next/link";
import NavBar from "../_component/moderator-navbar";

export default function Event() {
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvent(),
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

    {
      id: "actions",
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thực hiện</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/moderator/duyet-su-kien">Xem thông tin</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Hủy sự kiện</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];
  const hideColumns = ["description", "isDeleted", "deletedAt"];
  return (
    <>
      <NavBar links={["Quản lý sự kiện"]} />
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
