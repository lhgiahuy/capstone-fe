import { stringSchema } from "@/validation/common";
import { z } from "zod";

export const formSchema = z.object({
  data: z
    .array(z.object({ question: stringSchema, answer: stringSchema }))
    .optional(),
});

export type TypeOfRegistrationForm = z.infer<typeof formSchema>;
