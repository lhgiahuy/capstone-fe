"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, TypeOfProfileForm } from "../_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Ellipsis, Loader2, Pen, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageInput from "@/components/ui/image-input";
import { toBase64 } from "@/lib/utils";
import { uploadImageToStorage } from "@/lib/firebase/upload-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfo } from "@/action/user";

export default function ProfileForm({ values }: any) {
  const router = useRouter();
  const [isLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const { mutate: updateInfoMutation } = useMutation({
    mutationFn: (data: any) => updateInfo(data),
  });
  const [change, setChange] = useState(false);
  const form = useForm<TypeOfProfileForm>({
    resolver: zodResolver(formSchema),
    values,
  });
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TypeOfProfileForm> = async (data) => {
    if (change) {
      try {
        let avatarUrl = values?.avatarUrl;

        if (imageFile) {
          avatarUrl = await uploadImageToStorage({
            saveLocation: `users/${data.username}`,
            file: imageFile, // imageFile is guaranteed to be of type File here.
          });
        }

        updateInfoMutation(
          {
            username: data.username,
            phoneNumber: data.phoneNumber,
            avatarUrl,
            studentId: data.studentId || "",
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["Me"] });
              toast("Cập nhật thông tin thành công!");
            },
            onError: () => toast.error("Cập nhật thông tin thất bại!"),
          }
        );
      } catch (error) {
        toast.error("Lỗi khi tải lên hình ảnh!");
      }
    }
  };

  const [image, setImage] = useState<string>(
    values?.avatarUrl.startsWith("https://firebase")
      ? values?.avatarUrl
      : "/images/image-placeholder.jpg"
  );
  const [imageFile, setImageFile] = useState<File | undefined>();
  const handleChange = async (value: File | undefined) => {
    if (value) {
      setImageFile(value);
      const base64 = (await toBase64(value)) as string;
      setImage(base64);
      setIsDialogOpen(false);
    }
  };

  // if (!values) return <></>;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setChange(true)}
        className="flex flex-col gap-16"
      >
        <h1 className="text-4xl text-primary">Thông tin cá nhân</h1>
        <div className="flex w-full gap-32">
          <div className="flex flex-col items-center gap-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div className="relative hover:cursor-pointer">
                  <div className=" relative h-[14rem] rounded-full overflow-hidden w-[14rem] shrink-0">
                    <Image
                      src={image}
                      alt="user avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bg-primary rounded-full text-background p-3 bottom-4 z-20 right-1">
                    <Pen className="w-6 h-6"></Pen>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Chỉnh sửa ảnh đại diện</DialogTitle>
                <ImageInput
                  subtitle=""
                  placeholderImage={image}
                  onChange={handleChange}
                ></ImageInput>
              </DialogContent>
            </Dialog>
            {values?.verifyStatus == "Unverified" ? (
              <div className="flex gap-2 text-destructive items-center">
                <X />
                <p className="text-sm">Tài khoản chưa xác thực</p>
              </div>
            ) : values?.verifyStatus == "UnderVerify" ? (
              <div className="flex gap-2 text-orange-400 items-center">
                <Ellipsis />
                <p className="text-sm">Tài khoản đang xác thực</p>
              </div>
            ) : values?.verifyStatus == "Rejected" ? (
              <div className="flex flex-col gap-4  text-destructive items-center">
                <div className="flex gap-2 items-center">
                  <X />
                  <p className="text-sm">Yêu cầu xác thực bị từ chối</p>
                </div>
                <p className="text-sm text-foreground text-muted-foreground">
                  Ghi chú: {`${values?.processNote}`}
                </p>
              </div>
            ) : (
              <div className="flex gap-2 text-primary items-center">
                <Check />
                <p className="text-sm">Tài khoản đã xác thực</p>
              </div>
            )}
          </div>
          {/* <Separator orientation="vertical" className="h-full"></Separator> */}
          <div className="flex w-full">
            <div className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email*" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {values.roleName === "student" && (
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã số sinh viên</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MSSV*"
                          disabled={
                            values.verifyStatus === "Verified" ||
                            values.verifyStatus === "UnderVerify"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {values?.verifyStatus !== "Unverified" &&
                values?.cardUrl.startsWith("https://firebase") && (
                  <FormField
                    control={form.control}
                    name="cardUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thẻ FPT</FormLabel>
                        <FormControl>
                          <div className="relative h-[16rem] overflow-hidden w-full shrink-0">
                            {field.value?.startsWith("https://firebase") ? (
                              <Image
                                src={field.value}
                                alt="user avatar"
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <Image
                                src={"/images/image-placeholder.jpg"}
                                alt="user avatar"
                                fill
                                className="object-contain"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              <div className="w-full flex justify-center gap-8 pt-8">
                {values?.verifyStatus === "Unverified" ||
                  (values?.verifyStatus === "Rejected" && (
                    <Button
                      type="button"
                      size={"lg"}
                      disabled={isLoading}
                      variant="secondary"
                      className="w-2/3"
                      onClick={() => router.push("/xac-thuc-tai-khoan")}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <></>
                      )}
                      Xác thực tài khoản
                    </Button>
                  ))}
                <Button
                  type="submit"
                  size={"lg"}
                  disabled={isLoading || !change}
                  className="w-full "
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <></>
                  )}
                  Cập nhật thông tin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
