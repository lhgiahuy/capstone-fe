import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEventType } from "@/action/event";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CreateEventType() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [eventTypeName, setEventTypeName] = useState("");

  const mutation = useMutation({
    mutationFn: (eventTypeName: string) => createEventType(eventTypeName),
    onSuccess: () => {
      toast("Tạo thẻ loại thành công!");
      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
    },
    onError: (error) => {
      toast("Tạo thẻ loại thất bại!");
      console.error("Failed to create eventType:", error);
    },
  });
  const handleCreate = () => {
    if (!eventTypeName.trim()) {
      toast("Vui lòng nhập tên loại sự kiện!");
      return;
    }
    mutation.mutate(eventTypeName);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm thể loại mới
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm thể loại mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nhập tên loại sự kiện"
              value={eventTypeName}
              onChange={(e) => setEventTypeName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleCreate(), setOpen(false);
                setEventTypeName("");
              }}
            >
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
