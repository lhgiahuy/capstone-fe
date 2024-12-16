"use client";

import { useQuery } from "@tanstack/react-query";
import NavBar from "../../../_component/navbar";
import UpdateForm from "../_component/update-form";
import { getEventById } from "@/action/event";
import { Event } from "@/interface/event";

export default function UpdateEvent({ params }: { params: { id: string } }) {
  const { data } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: () => getEventById(params.id),
  });
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Chi tiết sự kiện",
            link: `/organizer/quan-ly-su-kien/${params.id}`,
          },
          {
            title: "Chỉnh sửa sự kiện",
            link: "/organizer/quan-ly-su-kien/chinh-sua-su-kien",
          },
        ]}
      />
      {data && <UpdateForm data={data} />}
    </>
  );
}
