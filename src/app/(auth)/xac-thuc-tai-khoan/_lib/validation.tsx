import { z } from "zod";

export const formSchema = z.object({
  card: z.any(),
});

export type TypeOfValidationForm = z.infer<typeof formSchema>;
