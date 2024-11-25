import { stringSchema } from "@/validation/common";
import { z } from "zod";

export const formSchema = z.object({
  data: z
    .array(z.object({ question: stringSchema, answer: stringSchema }))
    .optional(),
});

export const reviewFormSchema = z.object({
  rating: z.number().min(1, "Vui lòng nhập thông tin"),
  comment: z.string().optional(),
});

export type TypeOfRegistrationForm = z.infer<typeof formSchema>;

export type TypeOfReviewForm = z.infer<typeof reviewFormSchema>;
