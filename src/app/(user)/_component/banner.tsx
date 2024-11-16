"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = ["/images/event-thumbnail-1.jpg", "/images/auth-bg.jpg"];
export default function Banner() {
  return (
    <section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
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
            <CarouselItem key={index} className="w-full h-[24rem] relative">
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
