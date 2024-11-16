import { userAxios } from "@/lib/axios";
export interface getEventProps {
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  EventTypes?: string[];
  InMonth?: number;
  Status?: string;
  EventTag?: string;
}

export async function getTag() {
  try {
    const tag = await userAxios.get("/tags");
    return tag.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function createTag(svgContent: string, tagName: string) {
  try {
    const tag = await userAxios.post("/tags", { svgContent, tagName });
    return tag.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function deleteTag(tagId: string) {
  try {
    const tag = await userAxios.delete(`/tags/${tagId}`);
    return tag.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}
