import { userAxios } from "@/lib/axios";
import { Events } from "../types/events.type";

export const getEvents = () =>
  //   SearchKeyword: string,
  //   FromDate: string,
  //   ToDate: string,
  //   EventType: string,
  //   OrderBy: string,
  //   IsDescending: boolean,
  //   PageNumber: number,
  //   PageSize: number
  userAxios.get<Events>("events", {
    // params: {
    //   SearchKeyword,
    //   FromDate,
    //   ToDate,
    //   EventType,
    //   OrderBy,
    //   IsDescending,
    //   PageNumber,
    //   PageSize,
    // },
  });
