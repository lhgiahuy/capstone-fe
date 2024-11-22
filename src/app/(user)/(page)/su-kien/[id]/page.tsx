"use client";

import { getAverageRating, getEventById, getReview } from "@/action/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/interface/event";
import { formatDate } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPinned } from "lucide-react";
import Image from "next/image";
import "../../../style/description.css";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/action/user";
import FormSheet from "./_component/form-sheet";
import { CommentRatings } from "@/components/my-ui/rating";
import { useState } from "react";
import { Review } from "@/interface/review";
import { getFirstLetterOfName } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
export default function EventDetail({ params }: { params: { id: string } }) {
  const { data } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: () => getEventById(params.id),
  });
  const { data: organizer } = useQuery({
    queryKey: ["organizer", data?.organizerId],
    queryFn: () => getUserById(data?.organizerId),
  });
  const { data: review } = useQuery<Review[]>({
    queryKey: ["review", params.id],
    queryFn: () => getReview(params.id),
  });
  const { data: rating } = useQuery({
    queryKey: ["rating", params.id],
    queryFn: () => getAverageRating(params.id),
  });
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return <></>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-16">
        <div className="flex flex-col w-[32rem] gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={
                data.posterImg.startsWith("https")
                  ? data.posterImg
                  : "/images/image-placeholder-portrait.jpg"
              }
              alt="event bg"
              width={400}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3>Tổ chức bởi</h3>
            <Separator />
            <div className="flex items-center py-2">
              <div className="rounded-full overflow-hidden relative p-4">
                <Image
                  src={organizer?.avatarUrl || ""}
                  alt=""
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="text-foreground">
                    {data.organizerName}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-full bg-background text-foreground"
                  align="start"
                >
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={organizer?.avatarUrl} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {organizer?.username}
                      </h4>
                      <p className="text-sm">{organizer?.email}</p>
                      {/* <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div> */}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3>Đánh giá</h3>
              <Separator />
            </div>
            {rating ? (
              <div className="flex gap-2">
                <CommentRatings
                  rating={rating.avgRate}
                  variant="yellow"
                  readOnly
                />
                <p>{`(${rating?.totalRate} lượt đánh giá)`}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full bg-background flex flex-col gap-16 justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-primary uppercase text-3xl line-clamp-2">
                {data.eventName}
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                {data.eventTags.slice(0, 6).map((item, index) => (
                  <div key={index}>
                    <Badge>{item}</Badge>
                  </div>
                ))}
                {data.eventTags.length > 6 && (
                  <Badge>{`+${data.eventTags.length - 6} TAG`}</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <Clock className="text-primary" />
                <p>
                  {formatDate(data.startTime, "p, d MMMM, y")} -{" "}
                  {formatDate(data.endTime, "p, d MMMM, y")}
                </p>
              </div>
              <div className="flex gap-4">
                <MapPinned className="text-primary" />
                {data.location ? (
                  <p>{data.location}</p>
                ) : (
                  <p>{data.linkEvent}</p>
                )}
              </div>
              <div className="flex gap-4 w-full">
                <FormSheet data={data}></FormSheet>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground">Chi tiết sự kiện</h3>
                <Separator></Separator>
                <div className="text-foreground rounded-lg w-full">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    className="prose [&_img]:inline-block [&_a]:text-primary [&_a]:underline [&_a]:transition[&_a]:duration-300 [&_a:hover]:text-primary/60"
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="flex flex-col gap-4"
                >
                  <div className="flex w-full justify-between">
                    <h3 className="text-muted-foreground">Review sự kiện</h3>
                    {review && review[2] && (
                      <CollapsibleTrigger>Xem thêm</CollapsibleTrigger>
                    )}
                  </div>
                  <Separator></Separator>
                  {review?.slice(0, 2).map((item, index) => (
                    <div
                      key={index}
                      className="p-4 flex gap-4 border-muted border-2 rounded-lg hover:border-primary"
                    >
                      <Avatar className="w-8 h-8 hover:cursor-pointer">
                        <AvatarImage
                          src={item.avatar || "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback>
                          {getFirstLetterOfName(item.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex w-full items-start justify-between">
                          <div className="flex flex-col gap-2">
                            <div className="font-bold text-lg">
                              {item.fullname}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(item.reviewDate)}
                            </div>
                          </div>
                          <CommentRatings
                            readOnly
                            rating={item.rating}
                            variant="yellow"
                          />
                        </div>
                        <div className="whitespace-break-spaces">
                          {item.comment}
                        </div>
                      </div>
                    </div>
                  ))}
                  <CollapsibleContent className="w-full flex flex-col gap-4">
                    {review?.slice(2).map((item, index) => (
                      <div
                        key={index}
                        className="p-4 flex gap-4 border-muted border-2 rounded-lg hover:border-primary"
                      >
                        <Avatar className="w-8 h-8 hover:cursor-pointer">
                          <AvatarImage
                            src={item.avatar || "https://github.com/shadcn.png"}
                          />
                          <AvatarFallback>
                            {getFirstLetterOfName(item.fullname)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col gap-2">
                              <div className="font-bold text-lg">
                                {item.fullname}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(item.reviewDate)}
                              </div>
                            </div>
                            <CommentRatings
                              readOnly
                              rating={item.rating}
                              variant="yellow"
                            />
                          </div>
                          <div className="whitespace-break-spaces">
                            {item.comment}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8"></div>
    </div>
  );
}
