import { stringSchema } from "@/validation/common";
import { passwordRegex } from "@/validation/regex";
import { z } from "zod";

export const formSchema = z
  .object({
    username: stringSchema,
    email: stringSchema.email({ message: "Email không hợp lệ!" }),
    password: stringSchema.regex(
      passwordRegex,
      "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt."
    ),
    confirmPassword: stringSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp.",
    path: ["confirmPassword"],
  });
export type TypeOfCreateModeratorForm = z.infer<typeof formSchema>;
