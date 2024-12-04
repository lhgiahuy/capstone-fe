import { userAxios } from "@/lib/axios";

interface GetOrganizerReportProps {
  startDate: string;
  endDate: string;
}
export async function getOrganizerReport({
  startDate,
  endDate,
}: GetOrganizerReportProps) {
  try {
    const report = await userAxios.get(
      `/events/report-for-organizer?startDate=${startDate}&endDate=${endDate}`
    );
    return report.data;
  } catch (error) {
    console.error("Failed to report data", error);
  }
}

export async function getReport({
  startDate,
  endDate,
}: GetOrganizerReportProps) {
  try {
    const report = await userAxios.get(
      `/events/report?startDate=${startDate}&endDate=${endDate}`
    );
    return report.data;
  } catch (error) {
    console.error("Failed to report data", error);
  }
}
