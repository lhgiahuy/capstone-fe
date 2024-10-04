import AdminNavBar from "../_component/admin-navbar";
import UserManagement from "./_component/user-management";

export default function Event() {
  return (
    <>
      <AdminNavBar links={["Quản lý người dùng"]} />
      <div className="">
        <UserManagement />
      </div>
    </>
  );
}
