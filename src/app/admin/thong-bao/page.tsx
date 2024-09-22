import AdminNavBar from "../_component/admin-navbar";
import { Notification } from "./_component/notification-form";

export default function Event() {
  return (
    <>
      <AdminNavBar links={["Thông báo"]} />
      <div className="flex justify-center">
        <Notification />
      </div>
    </>
  );
}
