"use client";

import AdminNavBar from "../../_component/admin-navbar";
import AdminOverview from "./_component/admin-overview";
import { Chart } from "./_component/chart";
import { RecentTransaction } from "./_component/recent-transaction";

export default function Dashboard() {
  return (
    <>
      <AdminNavBar links={["Bảng số liệu"]} />
      <AdminOverview />
      <div className="flex mt-8">
        <div className="w-[70%]  ">
          <Chart />
        </div>
        <div className="w-[30%] ml-3">
          <RecentTransaction />
        </div>
      </div>
    </>
  );
}
