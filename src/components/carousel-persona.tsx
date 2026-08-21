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
      <section
        ref={ref}
        className="relative w-full h-full flex flex-col items-center justify-between p-2"
      >
        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full h-full flex flex-col items-center justify-between"
        >
          {/* Zone d'affichage de l'image */}
          <CarouselContent className="w-full flex-1 min-h-75 sm:min-h-105">
            {persona.img.map((img, index) => (
              <CarouselItem
                key={index}
                className="w-full h-full flex items-center justify-center p-2"
              >
                <img
                  src={img}
                  className="max-h-85 sm:max-h-115 max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(239,68,68,0.35)]"
                  alt={`Illustration ${index + 1} de ${persona.title}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Barre de commandes sous l'image */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-2 border-t border-zinc-800/80 w-full">
            <CarouselPrevious className="static translate-x-0 translate-y-0 bg-zinc-900/90 hover:bg-red-600 text-white border border-red-500/60 h-9 w-9 rounded-lg shadow-md transition duration-200 cursor-pointer" />
            
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
              GALERIE
            </span>

            <CarouselNext className="static translate-x-0 translate-y-0 bg-zinc-900/90 hover:bg-red-600 text-white border border-red-500/60 h-9 w-9 rounded-lg shadow-md transition duration-200 cursor-pointer" />
          </div>
        </Carousel>
      </section>
    );
  }
);

CarouselPersona.displayName = "CarouselPersona";
export default CarouselPersona;