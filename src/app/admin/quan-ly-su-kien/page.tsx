import AdminNavBar from "../_component/admin-navbar";
import { EventManagement } from "./_component/event-management";

export default function Event() {
  return (
    <>
      <AdminNavBar links={["Quản lý sự kiện"]} />
      <div className="">
        <EventManagement />
      </div>
    </>
  );
}
