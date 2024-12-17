export const statusMap: Record<string, { label: string; color: string }> = {
  All: { label: "Tất cả", color: "gray" },
  Draft: { label: "Bản nháp", color: "bg-slate-400" },
  Upcoming: { label: "Sắp diễn ra", color: "bg-blue-400 text-white" },
  Completed: { label: "Đã kết thúc", color: "bg-orange-600 text-white" },
  InProgress: { label: "Đang diễn ra", color: "bg-primary" },
  UnderReview: {
    label: "Đang chờ duyệt",
    color: "bg-foreground",
  },
  Cancelled: {
    label: "Đã huỷ",
    color: "bg-background text-foreground border-2 border-foreground",
  },
  Rejected: {
    label: "Bị từ chối",
    color: "bg-destructive text-foreground",
  },
};
