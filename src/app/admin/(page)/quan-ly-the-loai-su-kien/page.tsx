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
import { ArrowUpDown, Trash } from "lucide-react";

import AdminNavBar from "../../_component/admin-navbar";

// import { formatDate } from "@/lib/date";
import { deleteEventType, getEventType } from "@/action/event";
import { EventType } from "@/interface/event-type";
import DialogDeleteType from "./_component/dialog-delete-type";
import { useState } from "react";
import DialogUpdateType from "./_component/dialog-update-type";
import { toast } from "sonner";

export default function EventTypes() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTypeName] = useState<string>("");
  const { data, isPending } = useQuery({
    queryKey: ["types"],
    queryFn: () => getEventType(),
  });

  const deleteType = useMutation({
    mutationFn: (eventTypeId: string) => deleteEventType(eventTypeId),
    onSuccess: () => {
      toast("Xóa thẻ thành công!");
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
    onError: (error) => {
      toast("Xóa thẻ thất bại!");
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
          <div className="flex justify-end">
            <Button
              variant={"ghost"}
              onClick={() => {
                setSelectedTypeId(type.eventTypeId);
                setOpenDialog(true);
              }}
            >
              <Trash className="text-muted-foreground"></Trash>
            </Button>
          </div>
        );
      },
    },
  ];
  const hideColumns = [""];
  return (
    <>
      <AdminNavBar
        breadcrumb={[{ title: "Quản lý thẻ loại sự kiện", link: "#" }]}
      />

      <div className="container max-w-[64rem] pb-16">
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
