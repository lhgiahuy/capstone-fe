"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import NavBar from "../_component/navbar";

export default function QRDisplay() {
  const searchParams = useSearchParams();
  const qr = searchParams.get("qr");
  const id = searchParams.get("eventId");

  if (!qr) {
    return <p>Không có mã QR.</p>;
  }

  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Chi tiết sự kiện",
            link: `/organizer/quan-ly-su-kien/${id}`,
          },
          {
            title: "QR Check in",
            link: "#",
          },
        ]}
      />
      <div className="flex flex-col items-center h-screen">
        <Image src={qr} alt="QR Code" width={500} height={500} />
      </div>
    </>
  );
}
