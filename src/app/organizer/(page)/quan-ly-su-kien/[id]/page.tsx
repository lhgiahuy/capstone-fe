import { Metadata } from "next";
import NavBar from "../../_component/navbar";
import EventDetail from "./_component/event-detail";
export const metadata: Metadata = {
  title: "Tạo sự kiện",
  description: "...",
};
export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Chi tiết sự kiện",
            link: "#",
          },
        ]}
      />
      <EventDetail eventId={params.id} />
    </>
  );
}
