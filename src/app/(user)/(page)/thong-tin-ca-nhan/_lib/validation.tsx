import { stringSchema } from "@/validation/common";
import { z } from "zod";

export const formSchema = z.object({
  username: stringSchema,
  avatarUrl: stringSchema,
  phoneNumber: z.string(),
  email: z.string(),
  cardUrl: z.string(),
  processNote: z.string(),
  verifyStatus: z.string(),
});

export type TypeOfProfileForm = z.infer<typeof formSchema>;
