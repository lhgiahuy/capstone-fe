import AdminNavBar from "../../_component/admin-navbar";
import WithdrawTable from "./_component/table-withdraw";

export default function Withdraw() {
  return (
    <>
      <AdminNavBar links={["Quản lý rút tiền"]} />
      <div>
        <WithdrawTable />
      </div>
    </>
  );
}
