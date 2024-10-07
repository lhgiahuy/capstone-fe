"use client";

import { useQuery } from "@tanstack/react-query";
import AdminNavBar from "../_component/admin-navbar";
import { getUser } from "@/action/user";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";
import { User } from "@/interface/user";

export default function Event() {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "avatarUrl",
      header: "Avatar",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
          <AvatarFallback>
            {getFirstLetterOfName(row.original.username)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "cardUrl",
      header: "Card",
      cell: ({ row }) => <a href={row.original.cardUrl}>View Card</a>, // Example to render link
    },
    {
      accessorKey: "verified",
      header: "Verified",
      cell: ({ row }) => (row.original.verified ? "Yes" : "No"), // Show Yes/No for boolean
    },
    {
      accessorKey: "roleName",
      header: "Role",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(), // Format the date
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) =>
        row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleDateString()
          : "N/A", // Format date or show N/A if null
    },
    {
      accessorKey: "isDeleted",
      header: "Deleted",
      cell: ({ row }) => (row.original.isDeleted ? "Yes" : "No"), // Show Yes/No for boolean
    },
    {
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ row }) =>
        row.original.deletedAt
          ? new Date(row.original.deletedAt).toLocaleDateString()
          : "N/A", // Format date or show N/A if null
    },
  ];
  return (
    <>
      <AdminNavBar links={["Quản lý người dùng"]} />
      <div className="">
        {isPending ? <></> : <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
