"use client";

import CarouselPersona from "@/components/carousel-persona";
import PersonaHeader from "@/components/persona-header";
import ResistTab from "@/components/resist-tab";
import SkillsTab from "@/components/skills-tab";
import { PersonaProps } from "@/types/props";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CarouselApi } from "../ui/carousel";

export default function PersonaPageClient({ persona }: PersonaProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!api || window.matchMedia("(pointers: coarse)").matches) return;

      if (event.key in ["ArrowLeft", "ArrowRight", "Enter"]) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowLeft":
          api.scrollPrev();
          break;
        case "ArrowRight":
          api.scrollNext();
          break;
        case "Escape":
          document.getElementById("back-button")?.focus();
          document.getElementById("back-button")?.click();
          break;
      }

      if (event.code === "Space") {
        event.preventDefault();
        console.log("🚀 ~ handleKeyDown ~ open:", open);
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:gap-12 px-6 min-h-screen max-w-screen bg-[url('/images/menu-background.jpg')] bg-cover"
    >
      {/* Colonne centrale */}
      <article className="flex flex-col flex-1 gap-8 max-w-[600px]">
        <PersonaHeader persona={persona} />
        <ResistTab persona={persona} open={open} setOpen={setOpen} />
        <p className="text-white bg-black font-bold rounded-2xl text-2xl ml-10 p-5 font-sans text-justify">
          {persona.description}
        </p>
        <SkillsTab persona={persona} />
      </article>

      {/* Colonne du carousel */}
      <aside className="flex flex-col flex-2 items-center justify-start sm:ml-20">
        <CarouselPersona persona={persona} setApi={setApi} />
      </aside>
    </motion.main>
  );
}
