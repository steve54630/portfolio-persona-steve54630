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
      if (!api || window.matchMedia("(pointer: coarse)").matches) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          api.scrollPrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          api.scrollNext();
          break;
        case "Escape":
          const backBtn = document.getElementById("back-button");
          if (backBtn) {
            backBtn.focus();
            backBtn.click();
          }
          break;
        case " ":
          event.preventDefault();
          setOpen((prev) => !prev);
          break;
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
      transition={{ duration: 0.4 }}
      role="main"
      aria-label={`Fiche détaillée du Persona ${persona.title}`}
      className="relative min-h-screen w-full bg-[url('/images/menu-background.jpg')] bg-cover bg-center bg-fixed p-4 sm:p-8 flex flex-col justify-center items-center overflow-x-hidden"
    >
      <div className="w-full max-w-6xl flex flex-col gap-6 mt-12 sm:mt-0">
        
        {/* SECTION SUPERIEURE : Visuel + Résumé Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          
          {/* Gauche : Carrousel Visuel */}
          <aside aria-label="Galerie visuelle" className="flex items-center justify-center bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-red-500/50 h-95 sm:h-auto">
            <CarouselPersona persona={persona} setApi={setApi} />
          </aside>

          {/* Droite : Informations Clés */}
          <article aria-label="Informations du Persona" className="flex flex-col justify-between gap-4 bg-black/85 backdrop-blur-md p-6 rounded-2xl border-2 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
            <PersonaHeader persona={persona} />
            
            <section aria-label="Tableau des résistances">
              <ResistTab persona={persona} open={open} setOpen={setOpen} />
            </section>

            <section aria-label="Description" className="border-l-4 border-red-500 bg-zinc-950/90 p-3 rounded-r-xl">
              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                {persona.description}
              </p>
            </section>
          </article>
        </div>

        {/* SECTION INFERIEURE : Compétences Grandes & Aérées */}
        <section aria-label="Compétences" className="w-full bg-black/85 backdrop-blur-md p-6 rounded-2xl border-2 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.3)]">
          <h2 className="font-drunkenhour text-2xl text-red-500 mb-4 tracking-wide">SKILLS</h2>
          <SkillsTab persona={persona} />
        </section>

      </div>
    </motion.main>
  );
}