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
  noOfRegistered: {
    label: "Số lượt đăng ký",
    color: "hsl(var(--primary))",
  },
  noOfEvents: {
    label: "Số sự kiện",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

const monthLabels: Record<number, string> = {
  1: "Tháng 1",
  2: "Tháng 2",
  3: "Tháng 3",
  4: "Tháng 4",
  5: "Tháng 5",
  6: "Tháng 6",
  7: "Tháng 7",
  8: "Tháng 8",
  9: "Tháng 9",
  10: "Tháng 10",
  11: "Tháng 11",
  12: "Tháng 12",
};

export function Chart({
  registrationData,
}: {
  registrationData?: RegistrationDetail[];
}) {
  return (
    <Card className=" w-full flex flex-col">
      <CardHeader>
        <CardTitle>Tổng số sự kiện</CardTitle>
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
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => monthLabels[value] || value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="noOfRegistered"
                  fill="var(--color-noOfRegistered)"
                  radius={4}
                  barSize={50}
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
                  dataKey="noOfEvents"
                  fill="var(--color-noOfEvents)"
                  radius={4}
                  barSize={50}
                >
                  <LabelList
                    dataKey={(entry: any) =>
                      entry.noOfEvents !== 0 ? entry.noOfEvents : ""
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
