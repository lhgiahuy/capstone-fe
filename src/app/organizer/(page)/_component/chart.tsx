"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { RegistrationDetail } from "@/interface/organizer-report";

const chartConfig = {
  event: {
    label: "Sự kiện",
    color: "hsl(var(--primary))",
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
    <Card className="min-h-[32rem] min-w-[32rem] w-full flex flex-col">
      <CardHeader>
        <CardTitle>Sự kiện</CardTitle>
        {/* <CardDescription>Tháng 1, 2024 - Tháng 1, 2025 </CardDescription> */}
      </CardHeader>
      {registrationData ? (
        <CardContent className="flex-grow overflow-y-auto">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <div className="w-full h-full mx-auto flex justify-center">
              {/* Wrapper with max-width */}
              <BarChart
                accessibilityLayer
                data={registrationData}
                margin={{
                  top: 20,
                }}
                width={300} // Optional: Set a fixed width to match the max-w
                height={400} // Optional: Adjust height as needed
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => monthLabels[value] || value}
                />
                <Bar
                  dataKey="noOfRegistered"
                  fill="var(--color-event)"
                  radius={8}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </div>
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
