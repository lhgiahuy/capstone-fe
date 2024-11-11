import { dateSchema, stringSchema } from "@/validation/common";
import { z } from "zod";

const eventSchema = z.object({
  title: stringSchema,
  type: stringSchema,
  content: stringSchema,
  dateType: stringSchema,
  date: dateSchema,
  startDate: dateSchema,
  endDate: dateSchema,
  startTime: stringSchema,
  endTime: stringSchema,
  locationType: stringSchema,
  eventLink: z.string().optional(),
  passwordMeeting: z.string().optional(),
  location: stringSchema,
  imageUrl: z.any({ required_error: "Xin vui lòng nhập thông tin!" }),
});

const createFormDetailsSchema = z.object({
  name: stringSchema,
  type: stringSchema,
  option: z.string().array(),
});

export const formSchema = z.object({
  event: eventSchema,
  createFormDetailsReq: z.array(createFormDetailsSchema).optional(),
});
