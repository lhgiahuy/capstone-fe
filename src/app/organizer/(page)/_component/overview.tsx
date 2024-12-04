import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewReport } from "@/interface/organizer-report";

import { Calendar, UserCheck, Users, UserX } from "lucide-react";
export default function Overview(data: OverviewReport) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 ">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sự kiện</CardTitle>
            <div className="p-2 bg-primary rounded-xl">
              <Calendar className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.noOfEvents}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Số lượng đăng ký
            </CardTitle>
            <div className="p-2 bg-secondary-background rounded-xl">
              <Users className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.noOfRegistered}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Số lượng tham gia
            </CardTitle>
            <div className="p-2 bg-green-400 rounded-xl">
              <UserCheck className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.noOfUsersAttended}</div>

            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Số lượng không tham gia
            </CardTitle>
            <div className="p-2 bg-red-600 rounded-xl">
              <UserX className="h-4 w-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.noOfUsersNotAttended}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
