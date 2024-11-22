import { dateSchema, stringSchema } from "@/validation/common";
import { z } from "zod";

const eventSchema = z
  .object({
    eventName: stringSchema,
    eventTypeName: z.string().optional(),
    eventTypeId: stringSchema,
    description: stringSchema,
    dateType: stringSchema,
    date: dateSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    startTime: stringSchema,
    endTime: stringSchema,
    locationType: stringSchema,
    eventLink: z.string().optional(),
    passwordMeeting: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z.any({ required_error: "Xin vui lòng nhập thông tin!" }),
  })
  .refine((data) => data.locationType !== "online" || data.eventLink, {
    message: "Vui lòng điền thông tin!",
    path: ["eventLink"],
  })
  .refine((data) => data.locationType !== "offline" || data.location, {
    message: "Vui lòng điền thông tin!",
    path: ["location"],
  });
const createFormDetailsSchema = z.object({
  name: stringSchema,
  type: stringSchema,
  options: z.string().array(),
});

export const formSchema = z.object({
  event: eventSchema,
  createFormDetailsReq: z.array(createFormDetailsSchema).optional(),
});
