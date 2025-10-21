"use client";

import { CarouselProps } from "@/types/props";
import { forwardRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselPersona = forwardRef<HTMLDivElement, CarouselProps>(
  ({ persona, setApi }: CarouselProps, ref) => {

    return (
      <section ref={ref} className="relative min-w-1/2 sm:min-h-screen sm:max-w-[800px] py-10 sm:py-0 mx-auto h-[90vh]">
        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent className="h-fit sm:h-screen">
            {persona.image.map((image, index) => (
              <CarouselItem
                key={index}
                className="h-full flex items-center justify-center"
              >
                <img
                  src={image}
                  className="h-full object-contain"
                  alt={`Image de ${persona.title} ${index + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    );
  }
);

CarouselPersona.displayName = "CarouselPersona";
export default CarouselPersona;
