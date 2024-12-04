"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  //  useQueryClient
} from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import AdminNavBar from "../../_component/admin-navbar";

// import { formatDate } from "@/lib/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteEventType, getEventType } from "@/action/event";
import { EventType } from "@/interface/event-type";
import CreateEventType from "./_component/create-event-type";
import DialogDeleteType from "./_component/dialog-delete-type";
import { useState } from "react";
import DialogUpdateType from "./_component/dialog-update-type";

export default function EventTypes() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTypeName, setSelectedTypeName] = useState<string>("");
  const { data, isPending } = useQuery({
    queryKey: ["types"],
    queryFn: () => getEventType(),
  });

  const deleteType = useMutation({
    mutationFn: (eventTypeId: string) => deleteEventType(eventTypeId),
    onSuccess: () => {
      alert("Xóa thẻ thành công!");
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
    onError: (error) => {
      console.error("Failed to delete tag:", error);
    },
  });

  const columns: ColumnDef<EventType>[] = [
    {
      accessorKey: "eventTypeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên thẻ sự kiện
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const type = row.original;
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
                onClick={() =>
                  navigator.clipboard.writeText(type.eventTypeName)
                }
              >
                Sao chép tên thẻ
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTypeId(type.eventTypeId);
                  setOpenDialog(true);
                }}
              >
                Xoá thể loại
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTypeId(type.eventTypeId);
                  setSelectedTypeName(type.eventTypeName);
                  setOpenUpdateDialog(true);
                }}
              >
                Cập nhật thể loại
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];
  const hideColumns = ["description", "isDeleted", "deletedAt"];
  return (
    <>
      <AdminNavBar links={["Quản lý thể loại sự kiện"]} />
      <div className="mb-4 flex justify-end items-center">
        <CreateEventType />
      </div>
      <div className="">
        {isPending ? (
          <></>
        ) : (
          <DataTable
            hideColumns={hideColumns}
            columns={columns}
            data={data}
            noFilter
          />
        )}
      </div>
      <DialogDeleteType
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onDelete={() => {
          if (selectedTypeId) {
            deleteType.mutate(selectedTypeId);
          }
        }}
      />
      <DialogUpdateType
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        eventTypeId={selectedTypeId}
        currentName={selectedTypeName}
      />
    </>
  );
}
