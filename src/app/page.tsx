import DashboardCard from "@/components/dashboard/DashboardCard";
import { EventChart } from "@/components/dashboard/EventChart";
import { UserChart } from "@/components/dashboard/UserChart";
import { Folder, MessageCircle, Newspaper, Users } from "lucide-react";
export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <DashboardCard
          title="Sự kiện"
          count={100}
          icon={<Newspaper className="text-slate-500 " size={30} />}
        />
        <DashboardCard
          title="Bài đăng"
          count={100}
          icon={<Folder className="text-slate-500 " size={30} />}
        />
        <DashboardCard
          title="Người dùng"
          count={100}
          icon={<Users className="text-slate-500 " size={30} />}
        />
        <DashboardCard
          title="Bình luận"
          count={100}
          icon={<MessageCircle className="text-slate-500 " size={30} />}
        />
      </div>

      <div className="flex justify-center">
        <div className="px-5 w-[50%]">
          <EventChart />
        </div>
        <div className="px-5 w-[50%]">
          <UserChart />
        </div>
      </div>
    </>
  );
}
