"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState từ React
import { approveVerifyUser, getUser } from "@/action/user";
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
import NavBar from "../_component/moderator-navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function ManagementUser() {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [processNote, setProcessNote] = useState("");

  const approveMutation = useMutation({
    mutationFn: ({
      userId,
      approved,
      note,
    }: {
      userId: string;
      approved: boolean;
      note: string;
    }) => approveVerifyUser(userId, approved, note),
    onSuccess: () => {
      setIsSheetOpen(false);
    },
  });

  if (!data) return <></>;

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
    },
    {
      accessorKey: "avatarUrl",
      header: "Ảnh đại diện",
      cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.username)}
            </AvatarFallback>
          </Avatar>
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
    },
    {
      accessorKey: "cardUrl",
      header: "Thẻ sinh viên",
      cell: ({ row }) => <a href={row.original.cardUrl}>View Card</a>, // Example to render link
    },
    {
      accessorKey: "verified",
      header: "Xác nhận",
      cell: ({ row }) =>
        row.original.verified ? "Đã xác nhận" : "Chưa xác nhận", // Show Yes/No for boolean
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

              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  setIsSheetOpen(true);
                }}
              >
                Xác nhận người dùng
              </DropdownMenuItem>
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
      <NavBar links={["Quản lý người dùng"]} />
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
        <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
          <SheetContent>
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded text-gray-600"
                placeholder="Ghi lý do phê duyệt"
                value={processNote}
                onChange={(e) => setProcessNote(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedUser) {
                      approveMutation.mutate({
                        userId: selectedUser.userId,
                        approved: false,
                        note: processNote,
                      });
                    }
                  }}
                >
                  Từ chối
                </Button>
                <Button
                  onClick={() => {
                    if (selectedUser) {
                      approveMutation.mutate({
                        userId: selectedUser.userId,
                        approved: true,
                        note: processNote,
                      });
                    }
                  }}
                >
                  Đồng ý
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
