import { TopMoney } from "./_component/top-money";
import { UsersTable } from "./_component/users-table";

export default function Orders() {
  return (
    <>
      <div>
        <TopMoney />
        <div className="my-5">
          <UsersTable />
        </div>
      </div>
    </>
  );
}
