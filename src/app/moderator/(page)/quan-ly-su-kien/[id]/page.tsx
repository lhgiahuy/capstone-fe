import NavBar from "../../_component/moderator-navbar";
import DetailEvent from "./_component/event-detail";

export default function Event({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col flex-grow">
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/moderator/quan-ly-su-kien" },
          {
            title: "Chi tiết sự kiện",
            link: "#",
          },
        ]}
      />
      <DetailEvent eventId={params.id} />
    </div>
  );
}
