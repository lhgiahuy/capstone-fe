"use client";

import * as React from "react";

// import { Input } from "@/components/ui/input";
import { Clock, MapPinned } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getEventById, getParticipant } from "@/action/event";
import Image from "next/image";
import { Event } from "@/interface/event";
// import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import { User } from "@/interface/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getFirstLetterOfName } from "@/lib/utils";
// import "../../../style/description.css";

// import { Upload } from "lucide-react";

export default function EventDetail({ eventId }: { eventId: string }) {
  const { data } = useQuery<Event>({
    queryKey: ["events"],
    queryFn: () => getEventById(eventId),
  });
  const router = useRouter();
  const handleGenerateQR = async () => {
    try {
      const qrSrc = await QRCode.toDataURL(`/su-kien/${eventId}`);
      router.push(
        `/organizer/qr-check-in?qr=${encodeURIComponent(
          qrSrc
        )}&eventId=${eventId}`
      );
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  const { data: participants } = useQuery<User[]>({
    queryKey: ["participants", eventId],
    queryFn: () => getParticipant(eventId),
  });
  if (!data) return <></>;
  if (!data?.eventTags) return <></>;

  return (
    <div className="flex flex-col gap-8 container mb-16">
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
          <div className="flex flex-col gap-4">
            <h3 className="text-muted-foreground">Người tham gia</h3>
            <Separator></Separator>
            <Link
              href={`/organizer/quan-ly-su-kien/danh-sach-tham-gia/${eventId}`}
              className="flex -space-x-3 *:ring *:ring-primary"
            >
              {participants?.slice(0, 5).map((item, index) => (
                <Avatar key={index} className="h-8 w-8">
                  <AvatarImage src={item.avatarUrl} />
                  <AvatarFallback>
                    {getFirstLetterOfName(item.username)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[36rem] bg-background flex flex-col gap-16 justify-between">
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
              {data.status === "Draft" ? (
                <div className="flex gap-4 w-full">
                  <Button className="w-full py-8 text-lg">Chỉnh sửa</Button>
                  <Button className="w-full py-8 text-lg" variant={"secondary"}>
                    Publish
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <Button
                    className="w-full py-8 text-lg"
                    onClick={handleGenerateQR}
                  >
                    Tạo QR code
                  </Button>
                  {/* <Image src={src} alt="" width={100} height={100}></Image> */}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground">Chi tiết sự kiện</h3>
                <Separator></Separator>
                <div className="text-foreground rounded-lg w-full min-h-screen">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    className="[&_span]:inline-block [&_img]:inline-block [&_a]:text-primary [&_a]:underline [&_a]:transition[&_a]:duration-300 [&_a:hover]:text-primary/60"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8"></div>
    </div>
  );
}
