import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveEvent, getEventById } from "@/action/event";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Event } from "@/interface/event";
import { X } from "lucide-react";

export default function ButtonApproved({ eventId }: { eventId: string }) {
  const [processNote, setProcessNote] = useState(""); // Trạng thái lý do nhập vào
  const [showProcessNoteInput, setShowProcessNoteInput] = useState(false); // Hiển thị input lý do
  const router = useRouter();
  const query = useQueryClient();
  const { data } = useQuery<Event>({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
  });
  const mutation = useMutation({
    mutationFn: (data: { approved: boolean; processNote: string }) =>
      approveEvent(eventId, data.approved, data.processNote),
    onSuccess: () => {
      toast("Phê duyệt thành công!");
      setShowProcessNoteInput(false);
      router.push("/moderator/quan-ly-su-kien");
      query.invalidateQueries({ queryKey: ["events", "upcoming"] });
    },
    onError: () => {
      toast("Lỗi khi phê duyệt!");
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
      <Button
        onClick={handleApprove}
        disabled={!(data?.status === "UnderReview")}
        className="w-full py-8 text-xl"
      >
        {`${data?.status === "UnderReview" ? "Phê duyệt" : "Đã phê duyệt"}`}
      </Button>
      {showProcessNoteInput && (
        <div className="fixed inset-0 bg-gray-500 text-foreground bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96 relative">
            <Button
              variant={"ghost"}
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-700 mr-3"
              aria-label="Đóng"
            >
              <X></X>
            </Button>
            {/* <h3 className="text-xl font-semibold mb-4">Nhập lý do:</h3> */}
            <Textarea
              id="processNote"
              value={processNote}
              onChange={(e) => setProcessNote(e.target.value)}
              className="border p-2 rounded w-full"
              rows={4}
              placeholder="Nhập ghi chú..."
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
