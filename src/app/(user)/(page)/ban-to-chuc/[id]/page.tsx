"use client";

import { getEvent } from "@/action/event";
import EventList from "@/app/(user)/_component/event-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function OrganizerDetail() {
  const { data } = useQuery({
    queryKey: ["events", 3],
    queryFn: () => getEvent({ PageSize: 3 }),
  });
  return (
    <div className="h-full">
      <div className=" w-full h-[24rem] left-0 top-[5rem] z-[-10] ">
        <div className="relative w-full h-full">
          <Image
            src="/images/organizer-bg.png"
            alt="organizer bg"
            fill
            className="object-contain"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full h-full items-center relative mt-[-4rem] px-36">
        <div className="bg-foreground shadow-lg text-accent w-full h-full py-6 px-4 rounded-lg flex justify-center items-center gap-4">
          <Avatar className="w-36 h-36 mt-[-4rem] shadow-2xl border-8 border-foreground">
            <AvatarImage src="/images/organizer-avt.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">
            Phòng CTSV FPT Univeristy Campus
          </h2>
        </div>
        <div className="w-full  mt-[-0.5rem] py-8 px-8 rounded-lg">
          <Tabs defaultValue="a" className="w-full">
            <TabsList className="w-full text-primary">
              <TabsTrigger value="a" className="w-full">
                Account
              </TabsTrigger>
              <TabsTrigger value="b" className="w-full ">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <EventList data={data} vertical ticketStyle />
            </TabsContent>
            <TabsContent value="b">
              <EventList data={data} vertical ticketStyle />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
