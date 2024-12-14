import { dateSchema, stringSchema } from "@/validation/common";
import { z } from "zod";

const eventSchema = z
  .object({
    title: stringSchema,
    type: stringSchema,
    maxAttendees: z.string().optional(),
    content: stringSchema,
    dateType: stringSchema,
    date: dateSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    startTime: stringSchema,
    endTime: stringSchema,
    locationType: stringSchema,
    eventTags: z.array(z.string().optional()),
    thumbnailImg: z
      .any({ required_error: "Xin vui lòng nhập thông tin!" })
      .refine((value) => value !== undefined && value !== null, {
        message: "Xin vui lòng nhập thông tin!",
      }),
    posterImg: z
      .any({ required_error: "Xin vui lòng nhập thông tin!" })
      .refine((value) => value !== undefined && value !== null, {
        message: "Xin vui lòng nhập thông tin!",
      }),
    proposal: z
      .any({ required_error: "Xin vui lòng nhập thông tin!" })
      .refine((value) => value !== undefined && value !== null, {
        message: "Xin vui lòng nhập thông tin!",
      }),
    eventLink: z.string().optional(),
    passwordMeeting: z.string().optional(),
    location: z.string().optional(),
  })
  .refine((data) => data.locationType !== "online" || data.eventLink, {
    message: "Vui lòng điền thông tin!",
    path: ["eventLink"],
  })
  .refine((data) => data.locationType !== "offline" || data.location, {
    message: "Vui lòng điền thông tin!",
    path: ["location"],
  });
const createFormDetailsSchema = z
  .object({
    name: stringSchema,
    type: stringSchema,
    options: z.string().array(),
  })
  .refine((data) => data.type !== "choice" || data.options, {
    message: "Vui lòng điền thông tin!",
    path: ["options"],
  });

export const formSchema = z.object({
  event: eventSchema,
  createFormDetailsReq: z.array(createFormDetailsSchema).optional(),
});
