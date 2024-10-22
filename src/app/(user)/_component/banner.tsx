"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = ["/images/event-bg-1.png", "/images/auth-bg.jpg"];
export default function Banner() {
  return (
    <section className="container">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index} className="w-full h-[20rem] relative">
              <Image
                src={item}
                alt="images"
                fill
                className="object-cover"
              ></Image>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
