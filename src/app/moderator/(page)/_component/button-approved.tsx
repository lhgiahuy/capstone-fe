import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { approveEvent } from "@/action/event";
import { Textarea } from "@/components/ui/textarea";

export default function ButtonApproved({ eventId }: { eventId: string }) {
  const [processNote, setProcessNote] = useState(""); // Trạng thái lý do nhập vào
  const [showProcessNoteInput, setShowProcessNoteInput] = useState(false); // Hiển thị input lý do

  const mutation = useMutation({
    mutationFn: (data: { approved: boolean; processNote: string }) =>
      approveEvent(eventId, data.approved, data.processNote),
    onSuccess: () => {
      alert("Phê duyệt thành công!");
      setShowProcessNoteInput(false);
    },
    onError: () => {
      alert("Lỗi khi phê duyệt!");
    },
  });

  const handleApprove = () => {
    setShowProcessNoteInput(true);
  };

  const handleClose = () => {
    setShowProcessNoteInput(false);
  };

  const handleSubmit = (approved: boolean) => {
    mutation.mutate({ approved, processNote });
  };

  return (
    <div className="w-full">
      <Button onClick={handleApprove} className="w-full py-8 text-xl">
        Phê duyệt
      </Button>

      {showProcessNoteInput && (
        <div className="fixed inset-0 bg-gray-500 text-foreground bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-700 mr-3"
              aria-label="Đóng"
            >
              X
            </button>
            <h3 className="text-xl font-semibold mb-4">Nhập lý do:</h3>
            <Textarea
              id="processNote"
              value={processNote}
              onChange={(e) => setProcessNote(e.target.value)}
              className="border p-2 rounded text-black w-full"
              rows={4}
              placeholder="Nhập lý do..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant={"outline"} onClick={() => handleSubmit(false)}>
                Từ chối
              </Button>
              <Button onClick={() => handleSubmit(true)}>Đồng ý</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
