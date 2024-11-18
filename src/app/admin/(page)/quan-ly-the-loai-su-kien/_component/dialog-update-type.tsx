"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateEventType } from "@/action/event";

interface DialogUpdateTypeProps {
  open: boolean;
  onClose: () => void;
  eventTypeId: string | null;
  currentName: string;
}

export default function DialogUpdateType({
  open,
  onClose,
  eventTypeId,
  currentName,
}: DialogUpdateTypeProps) {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState(currentName);

  const updateMutation = useMutation({
    mutationFn: (updatedName: string) =>
      updateEventType(eventTypeId as string, updatedName),
    onSuccess: () => {
      alert("Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["types"] });
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update event type:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thể loại</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nhập tên thể loại mới"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              onClick={() => updateMutation.mutate(newName)}
              disabled={!newName.trim()}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
