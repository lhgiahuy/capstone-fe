"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/action/event";
import { Banner } from "@/interface/banner";

export default function Slider() {
  const { data } = useQuery({
    queryKey: ["banner"],
    queryFn: getBanners,
  });
  return (
    <section className="flex flex-col gap-4">
      <div className="text-primary font-semibold text-4xl">Sự kiện nổi bật</div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="p-2">
          {data?.map((item: Banner) => (
            <CarouselItem
              key={item.eventId}
              className="w-full h-[20rem] relative md:basis-1/2 lg:basis-1/4"
            >
              <Image
                src={
                  item.posterImg.startsWith("https")
                    ? item.posterImg
                    : "/images/event-bg-2.png"
                }
                alt="images"
                fill
                className="object-cover p-2"
              ></Image>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
