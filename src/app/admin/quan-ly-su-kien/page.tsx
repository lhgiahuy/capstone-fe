"use client";

import { useQuery } from "@tanstack/react-query";
import AdminNavBar from "../_component/admin-navbar";

import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";

import { getEvents } from "@/action/event";
import { Event } from "@/interface/event";

export default function Events() {
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "eventId",
      header: "eventId",
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
      accessorKey: "eventName",
      header: "eventName",
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "startTime",
      header: "startTime",
    },
    {
      accessorKey: "endTime",
      header: "endTime",
    },
    {
      accessorKey: "maxAttendees",
      header: "maxAttendees",
    },
  ];
  console.log(data);
  return (
    <>
      <AdminNavBar links={["Quản lý sự kiện"]} />
      <div className="">
        {isPending ? <></> : <DataTable columns={columns} data={data.items} />}
      </div>
    </>
  );
}
