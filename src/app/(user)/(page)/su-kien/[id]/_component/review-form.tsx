"use client";

import { useForm } from "react-hook-form";
import { reviewFormSchema, TypeOfReviewForm } from "../_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CommentRatings } from "@/components/my-ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewEvent } from "@/action/event";
import { useState } from "react";

export default function ReviewForm({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const form = useForm<TypeOfReviewForm>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: reviewMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      reviewEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      queryClient.invalidateQueries({ queryKey: ["review", id] });
      queryClient.invalidateQueries({ queryKey: ["rating", id] });
      toast("Gửi đánh giá thành công!");
      setIsDialogOpen(false); // Close the dialog on success
    },
    onError: () => toast.error("Gửi đánh giá thất bại!"),
  });

  const onSubmit = async (data: TypeOfReviewForm) => {
    reviewMutation({ id, data });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-md py-8 w-full">
          Đánh giá sự kiện
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Đánh giá sự kiện</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8 w-full px-2 pt-8 pb-2">
                <div className="w-full flex items-center flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommentRatings
                            rating={field.value}
                            variant="yellow"
                            onRatingChange={field.onChange}
                            size={40}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className="w-full"
                              placeholder="Viết cảm nhận của bạn sau khi tham gia sự kiện..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" size={"lg"}>
                  Gửi
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
}
