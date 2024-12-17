import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema, TypeOfCreateModeratorForm } from "../_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModerator } from "@/action/user";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AddModerator() {
  const form = useForm<TypeOfCreateModeratorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const query = useQueryClient();
  const searchParams = useSearchParams();
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "") || 1;
  const role = searchParams.get("role") || "Student";
  const { mutate: createModeratorMutation, isPending } = useMutation({
    mutationFn: (data: TypeOfCreateModeratorForm) => createModerator(data),
    onSuccess: () =>
      query.invalidateQueries({ queryKey: ["user", currentPage, role] }),
  });
  const onSubmit: SubmitHandler<TypeOfCreateModeratorForm> = async (data) => {
    createModeratorMutation(data, {
      onSuccess: () => {
        toast("Tạo tài khoản moderator thành công!");
      },
      onError: () => {
        toast("Tạo tài khoản moderator thất bại!");
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo moderator</Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tạo tài khoản moderator
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input placeholder="Email*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput placeholder="Mật khẩu*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder="Nhập lại mật khẩu*"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Đóng
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="min-w-[8rem]"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Tạo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
