import { Metadata } from "next";
import NavBar from "./_component/navbar";
export const metadata: Metadata = {
  title: "Organizer",
  description: "...",
};

export default function Page() {
  return (
    <>
      <NavBar breadcrumb={[{ title: "Bảng số liệu", link: "#" }]} />
      Organizer
    </>
  );
}
