"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = [
  "/images/banner-4.jpg",

  "/images/banner-3.jpg",
  "/images/banner-1.jpg",
  "/images/banner-2.jpg",
];

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
