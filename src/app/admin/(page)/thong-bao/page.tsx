import AdminNavBar from "../../_component/admin-navbar";
import { ListNotification } from "./_component/list-notification";
// import { Notification } from "./_component/notification-form";

export default function Event() {
  return (
    <>
      <AdminNavBar links={["Thông báo"]} />
      <div>
        <ListNotification />
      </div>
    </>
  );
}
