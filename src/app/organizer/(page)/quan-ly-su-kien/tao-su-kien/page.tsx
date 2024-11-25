import { Metadata } from "next";
import NavBar from "../../_component/navbar";
import CreateForm from "./_component/create-form";
export const metadata: Metadata = {
  title: "Tạo sự kiện",
  description: "...",
};
export default function CreateEvent() {
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Tạo sự kiện",
            link: "/organizer/quan-ly-su-kien/tao-su-kien",
          },
        ]}
      />
      <CreateForm />
    </>
  );
}
