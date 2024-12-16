"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RegistrationDetail } from "@/interface/organizer-report";

const chartConfig = {
  event: {
    label: "Sự kiện",
    color: "hsl(var(--primary))",
  },
  noOfRegistered: {
    label: "Số người đăng ký",
    color: "hsl(var(--primary))",
  },
  noOfUsersAttended: {
    label: "Số người tham gia",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

export function Chart({
  registrationData,
}: {
  registrationData?: RegistrationDetail[];
}) {
  return (
    <Card className="min-h-[32rem] min-w-[32rem] w-full flex flex-col">
      <CardHeader>
        <CardTitle>Sự kiện</CardTitle>
        {/* <CardDescription>Tháng 1, 2024 - Tháng 1, 2025 </CardDescription> */}
      </CardHeader>
      {registrationData ? (
        <CardContent className="flex-grow overflow-y-auto">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                accessibilityLayer
                data={registrationData}
                margin={{
                  top: 40,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="eventName"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 10)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="noOfRegistered"
                  fill="var(--color-noOfRegistered)"
                  radius={4}
                  barSize={60}
                >
                  <LabelList
                    dataKey={(entry: any) =>
                      entry.noOfRegistered !== 0 ? entry.noOfRegistered : ""
                    }
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={16}
                  />
                </Bar>
                <Bar
                  dataKey="noOfUsersAttended"
                  fill="var(--color-noOfUsersAttended)"
                  radius={4}
                  barSize={60}
                >
                  <LabelList
                    dataKey={(entry: any) =>
                      entry.noOfUsersAttended !== 0
                        ? entry.noOfUsersAttended
                        : ""
                    }
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={16}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      ) : (
        <div className="w-full flex justify-center py-24 items-center">
          Không có dữ liệu.
        </div>
      )}

      {/* <CardFooter className="shrink-0 flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Các hoạt động sự kiện <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Số lượng người tham gia các hoạt động sự kiện
        </div>
      </CardFooter> */}
    </Card>
  );
}
