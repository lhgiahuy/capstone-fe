import { dateSchema, stringSchema } from "@/validation/common";
import { z } from "zod";

export const formSchema = z.object({
  title: stringSchema,
  type: stringSchema,
  content: stringSchema,
  date: dateSchema,
  startTime: stringSchema,
  endTime: stringSchema,
  location: stringSchema,
});
