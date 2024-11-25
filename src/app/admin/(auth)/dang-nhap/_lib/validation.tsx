import { stringSchema } from "@/validation/common";
import { z } from "zod";

export const formSchema = z.object({
  email: stringSchema,
  password: stringSchema,
});

export type TypeOfLoginForm = z.infer<typeof formSchema>;
