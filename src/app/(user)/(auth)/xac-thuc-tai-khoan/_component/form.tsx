"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formSchema, TypeOfValidationForm } from "../_lib/validation";
import ImageInput from "@/components/ui/image-input";
import { uploadImageToStorage } from "@/lib/firebase/upload-file";
import { useMutation } from "@tanstack/react-query";
import { validateUser } from "@/action/user";
import { useRouter } from "next/navigation";
import { userAtom } from "@/lib/atom/user";
import { useAtom } from "jotai";

export default function ValidationForm() {
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TypeOfValidationForm>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: validateUserMutation } = useMutation({
    mutationFn: (data: string) => validateUser(data),
  });
  const onSubmit: SubmitHandler<TypeOfValidationForm> = async (data) => {
    try {
      setIsLoading(true);
      const cardUrl = await uploadImageToStorage({
        saveLocation: `users/card/${user?.email}`,
        file: data.card,
      });
      //   console.log(cardUrl);
      validateUserMutation(cardUrl, {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: () => {
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Xác thực tài khoản",
            description: "Xác thực tài khoản thất bại!",
          });
        },
      });
    } catch {
      setIsLoading(false);
    }
  };
  if (!user) router.push("/");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="card"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageInput
                  subtitle="Up một tấm hình thẻ FPT để xác thực tài khoản"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          Xác thực tài khoản
        </Button>
      </form>
    </Form>
  );
}
