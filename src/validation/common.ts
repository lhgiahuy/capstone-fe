import { z } from "zod";
import { passwordRegex } from "./regex";

export const stringSchema = z
  .string({
    required_error: "Xin vui lòng nhập thông tin!",
    invalid_type_error: "Xin vui lòng nhập thông tin!",
  })
  .min(1, "Xin vui lòng nhập thông tin!");
export const emailSchema = z
  .string({ required_error: "Xin vui lòng nhập email!" })
  .min(1, "Xin vui lòng nhập email!")
  .email("Email không hợp lệ");
export const passwordSchema = z
  .string({ required_error: "Xin vui lòng nhập thông tin!" })
  .min(8, "Yêu cầu nhập ít nhất 8 ký tự")
  .regex(
    passwordRegex,
    "Mật khẩu cần ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
  );
export const dateSchema = z.date({
  required_error: "Xin vui lòng nhập thông tin!",
});
