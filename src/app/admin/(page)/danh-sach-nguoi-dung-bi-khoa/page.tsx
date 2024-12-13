"use client";

import { useQuery } from "@tanstack/react-query";
import AdminNavBar from "../../_component/admin-navbar";
import { getBannedUser } from "@/action/user";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFirstLetterOfName } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";
import { parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SkeletonTable } from "../../_component/skeleton-table";

export default function AdminManagementUser() {
  const searchParams = useSearchParams();
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "") || 1;
  const role = searchParams.get("role") || "Student";
  const { data, isPending } = useQuery({
    queryKey: ["bannedUser", currentPage, role],
    queryFn: () => getBannedUser({ PageNumber: currentPage, roleName: role }),
  });
  const selectOptions = [
    {
      option: [
        { name: "Tất cả", value: " " },
        { name: "Sinh viên", value: "student" },
        { name: "Organizer", value: "organizer" },
        { name: "Moderator", value: "moderator" },
      ],
      placeholder: "Vai trò",
      title: "role",
      defaultValue: role,
    },
  ];
  // if (!data) return <></>;
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên người dùng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-full flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.username)}
            </AvatarFallback>
          </Avatar>
          <p>{row.original.username}</p>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      cell: ({ row }) =>
        row.original.phoneNumber ? <p>{row.original.phoneNumber}</p> : "N/A",
    },
    {
      accessorKey: "cardUrl",
      header: "Thẻ sinh viên",
      cell: ({ row }) =>
        row.original.cardUrl ? (
          <Link
            href={row.original.cardUrl}
            className="text-primary hover:text-primary/80"
          >
            Xem thẻ
          </Link>
        ) : (
          <p>Chưa có thẻ</p>
        ),
    },
    {
      accessorKey: "roleName",
      header: "Vai trò",
      cell: ({ row }) => (
        <Badge
          className={cn(
            row.original.roleName === "admin"
              ? "bg-red-400 hover:bg-red-400"
              : row.original.roleName === "manager"
              ? "bg-orange-400 hover:bg-orange-400"
              : "bg-green-400 hover:bg-green-400",
            "capitalize"
          )}
        >
          {row.original.roleName}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => parseISO(row.original.createdAt).toUTCString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) =>
        row.original.updatedAt
          ? parseISO(row.original.updatedAt).toUTCString()
          : "N/A", // Format date or show N/A if null
    },
    {
      accessorKey: "isDeleted",
      header: "Deleted",
      cell: ({ row }) => (row.original.isDeleted ? "Có" : "Không"), // Show Yes/No for boolean
    },
    {
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ row }) =>
        row.original.deletedAt
          ? parseISO(row.original.deletedAt).toUTCString()
          : "N/A", // Format date or show N/A if null
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Sao chép email người dùng
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Xem thông tin</DropdownMenuItem>
              <DropdownMenuItem>Xoá người dùng</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];
  const hideColumns = ["createdAt", "updatedAt", "isDeleted", "deletedAt"];
  return (
    <>
      <AdminNavBar links={["Danh sách người dùng bị khoá"]} />
      {isPending ? (
        <SkeletonTable
          hideColumns={hideColumns}
          columns={columns}
        ></SkeletonTable>
      ) : (
        <DataTable
          hideColumns={hideColumns}
          columns={columns}
          data={data.items}
          totalPages={data.totalPages}
          selectOptions={selectOptions}
        />
      )}
    </>
  );
}
