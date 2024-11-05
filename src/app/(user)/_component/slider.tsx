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

const images = [
  "/images/event-bg.png",
  "/images/event-bg.png",
  "/images/event-bg.png",
];
export default function Slider() {
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
          {images.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-full h-[20rem] relative md:basis-1/2 lg:basis-1/4"
            >
              <Image
                src={item}
                alt="images"
                fill
                className="object-cover p-2"
              ></Image>
            </CarouselItem>
          ))}
          {images.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-full h-[20rem] relative md:basis-1/2 lg:basis-1/4"
            >
              <Image
                src={item}
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
