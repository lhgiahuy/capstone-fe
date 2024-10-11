import NavBar from "../_component/moderator-navbar";
import { Chart } from "./_component/chart";
import ModeratorOverview from "./_component/moderator-overview";
import { RecentTransaction } from "./_component/recent-transaction";

export default function Dashboard() {
  return (
    <>
      <NavBar links={["Bảng số liệu"]} />
      <ModeratorOverview />
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
