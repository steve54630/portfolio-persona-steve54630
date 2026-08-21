"use client";

import { IStatus } from "@/types/status";
import React, { useEffect, useState, useCallback } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import Link from "next/link";
import SocialDiagram from "../social";
import MenuButton from "../menu-button";
import useMouseActivity from "@/hooks/useMouse";

export function StatusViewer({ stats }: { stats: IStatus }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [statOpen, setStatOpen] = useState<boolean>(false);
  const showHelp = useMouseActivity();

  // Calcul d'âge précis
  const birthdate = new Date(stats.level);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation Clavier fluide
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches || statOpen) return;

      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("button[datatype=menu-button]")
      );
      if (buttons.length === 0) return;

      const activeEl = document.activeElement as HTMLButtonElement;
      const currentIndex = buttons.indexOf(activeEl);

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
          buttons[prevIndex].focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % buttons.length;
          buttons[nextIndex].focus();
          break;
        case "Escape":
          e.preventDefault();
          document.getElementById("back-button")?.click();
          break;
      }
    },
    [statOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <article
      role="main"
      aria-label="Fiche de statut du personnage"
      className="site-backdrop relative min-h-screen w-full bg-fixed p-4 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-8 overflow-x-hidden"
    >
      {/* Aide vocale RGAA */}
      <div className="sr-only" aria-live="polite">
        Menu Statut de Retournay Steve. Utilisez les flèches haut et bas pour parcourir l&apos;équipement et les compétences.
      </div>

      {/* Bouton Retour Persona */}
      <Link className="absolute top-5 left-5 z-30" href="/menu">
        <button
          id="back-button"
          className="px-6 py-3 font-drunkenhour text-2xl text-white bg-black/80 backdrop-blur-md border border-red-500/60 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          ← RETOUR
        </button>
      </Link>

      {/* Avatar Persona */}
      <div className="relative mt-16 sm:mt-0 max-w-sm sm:max-w-md w-full flex justify-center">
        <img
          src="/images/avatar.png"
          className="w-4/5 sm:w-full object-contain filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          alt="Avatar de Retournay Steve"
        />
      </div>

      {/* Section Contenu Principal (Panneau dépoli) */}
      <section className="flex flex-col items-center justify-center w-full max-w-lg bg-black/80 backdrop-blur-md p-6 rounded-2xl border-2 border-red-500/60 shadow-[0_0_25px_rgba(220,38,38,0.35)] z-10">
        
        {/* Nom & Niveau */}
        <header className="w-full flex flex-col items-center border-b border-red-500/40 pb-4 mb-4">
          <h1 className="font-broken-home text-white text-3xl sm:text-4xl tracking-wider text-center">
            RETOURNAY STEVE
          </h1>

          <div className="mt-2 text-zinc-200">
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="cursor-help px-3 py-1 bg-red-600/30 border border-red-500 rounded text-lg font-mono hover:bg-red-600/50 transition">
                  LVL. <span className="font-bold text-white">{age}</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-zinc-950 border border-red-500 text-white p-3 text-sm rounded shadow-xl">
                Âge actuel (Calculé dynamiquement)
              </HoverCardContent>
            </HoverCard>
          </div>
        </header>

        {/* Navigation Équipement / Stats */}
        <nav className="w-full flex flex-col gap-2 my-4" aria-label="Équipement et compétences">
          <MenuButton
            title={"WEAPON"}
            explanation={"Mon CV en ligne"}
            color={"hover:bg-blue-600/80 focus:bg-blue-600"}
            onClickEffect={() => window.open("https://tinyurl.com/cvofsteve", "_blank")}
            type={"button"}
          />
          <MenuButton
            title={"ARMOR"}
            explanation={"Mon CV papier (PDF)"}
            color={"hover:bg-red-600/80 focus:bg-red-600"}
            onClickEffect={() =>
              window.open(
                "https://drive.google.com/file/d/1TWww4slygpys7KzfSWN2dghks2mkQbGr/view?usp=drive_link",
                "_blank"
              )
            }
            type={"button"}
          />
          <MenuButton
            title={"SOCIALS"}
            explanation={"Statistiques sociales & soft skills"}
            color={"hover:bg-emerald-600/80 focus:bg-emerald-600"}
            onClickEffect={() => setStatOpen(!statOpen)}
            type={"button"}
          />
        </nav>

        {/* Diagramme Social Modal/Panel */}
        {statOpen && (
          <div className="w-full mt-4">
            <SocialDiagram
              setOpen={setStatOpen}
              status={stats}
              isMobile={isMobile}
            />
          </div>
        )}
      </section>

      {/* Barre de raccourcis */}
      {showHelp && !statOpen && (
        <div
          role="status"
          className="fixed bottom-4 right-4 bg-black/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-red-500/50 shadow-lg z-40 font-mono tracking-wider uppercase hidden sm:block"
        >
          [↑ / ↓] Sélectionner | [ESC] Retour
        </div>
      )}
    </article>
  );
}