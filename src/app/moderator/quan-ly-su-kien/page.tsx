"use client";

import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";

import { getEvents } from "@/action/event";
import { Event } from "@/interface/event";
import NavBar from "../_component/moderator-navbar";

export default function Events() {
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "eventName",
      header: "Tên sự kiện",
    },
    // {
    //   accessorKey: "avatarUrl",
    //   header: "Avatar",
    //   cell: ({ row }) => (
    //     <Avatar>
    //       <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
    //       <AvatarFallback>
    //         {getFirstLetterOfName(row.original.username)}
    //       </AvatarFallback>
    //     </Avatar>
    //   ),
    // },
    {
      accessorKey: "organizerName",
      header: "Người tổ chức",
    },
    {
      accessorKey: "description",
      header: "Mô tả",
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
      header: "Số lượng người tham gia",
    },
  ];

  return (
    <>
      <NavBar links={["Quản lý sự kiện"]} />
      <div className="">
        {isPending ? <></> : <DataTable columns={columns} data={data.items} />}
      </div>
    </>
  );
}
