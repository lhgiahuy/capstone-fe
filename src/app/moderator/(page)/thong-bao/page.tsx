import NavBar from "../_component/moderator-navbar";
import { Notification } from "./_component/notification-form";

export default function ReplyNotification() {
  return (
    <>
      <NavBar
        breadcrumb={[{ title: "Gửi thông báo", link: "/moderator/thong-bao" }]}
      />
      {/* <div className="flex justify-center"> */}
      <div className="flex justify-center container pb-16">
        <Notification />
      </div>
    </>
  );
}
