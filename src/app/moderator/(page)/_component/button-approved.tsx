import { Button } from "@/components/ui/button";
import { DetailEventProps } from "@/interface/event";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { approveEvent } from "@/action/event";

export default function ButtonApproved({ eventId }: DetailEventProps) {
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
    <div>
      <Button onClick={handleApprove} className="font-bold mt-3">
        Phê duyệt
      </Button>

      {showProcessNoteInput && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 mr-3"
              aria-label="Đóng"
            >
              X
            </button>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Nhập lý do:
            </h3>
            <textarea
              id="processNote"
              value={processNote}
              onChange={(e) => setProcessNote(e.target.value)}
              className="border p-2 rounded text-black w-full"
              rows={4}
              placeholder="Nhập lý do..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => handleSubmit(true)}>Đồng ý</Button>
              <Button onClick={() => handleSubmit(false)}>Từ chối</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
