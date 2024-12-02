"use client";

import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";
// import { User } from "@/interface/user";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { parseISO } from "date-fns";
import { getAllEvent } from "@/action/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "../_component/moderator-navbar";
import { getFirstLetterOfName } from "@/lib/utils";
import { Event } from "@/interface/event";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function EventDetail() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "UnderReview";
  const searchKeyword = searchParams.get("SearchKeyword")?.toString() || "";
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "1", 10) || 1;
  const { data } = useQuery({
    queryKey: ["events", status, searchKeyword, currentPage],
    queryFn: () =>
      getAllEvent({
        Status: status,
        SearchKeyword: searchKeyword,
        PageNumber: currentPage,
      }),
  });
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "eventName",
      // header: ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //     >
      //       Tên sự kiện
      //       <ArrowUpDown className="ml-2 h-4 w-4" />
      //     </Button>
      //   );
      // },
      header: "Tên sự kiện",
      cell: ({ row }) => (
        <div className="w-64 flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.thumbnailImg} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.eventName)}
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-2">{row.original.eventName}</p>
        </div>
      ),
    },

    {
      accessorKey: "organizerName",
      header: "Người tổ chức",
    },

    {
      accessorKey: "maxAttendees",
      header: "Số người tham gia",
      cell: ({ row }) => {
        return <div>{row.original.maxAttendees || "Chưa có dữ liệu"}</div>;
      },
    },

    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        return <Badge>{row.original.status}</Badge>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
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
                <Link
                  href={`/moderator/quan-ly-su-kien/${row.original.eventId}`}
                >
                  Xem thông tin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={row.original.proposal}>Xem proposal</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];
  const hideColumns = ["isDeleted", "deletedAt"];
  const selectOptions = [
    {
      option: [
        { name: "Tất cả", value: "All" },
        { name: "Draft", value: "Draft" },
        { name: "UnderReview", value: "UnderReview" },
        { name: "Completed", value: "Completed" },
        { name: "InProgress", value: "InProgress" },
      ],
      placeholder: "Trạng thái",
      title: "status",
      defaultValue: status,
    },
  ];
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/moderator/quan-ly-su-kien" },
        ]}
      />
      <div className="">
        <DataTable
          hideColumns={hideColumns}
          columns={columns}
          data={data?.items}
          selectOptions={selectOptions}
          totalPages={data?.totalPages}
        />
      </div>
    </>
  );
}
