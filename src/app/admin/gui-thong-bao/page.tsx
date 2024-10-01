import AdminNavBar from "../_component/admin-navbar";
import { Notification } from "./_component/notification-form";

export default function ReplyNotification() {
  return (
    <>
      <AdminNavBar links={["Tạo thông báo"]} />
      {/* <div className="flex justify-center"> */}
      <div className="flex justify-center">
        <Notification />
      </div>
    </>
  );
}
