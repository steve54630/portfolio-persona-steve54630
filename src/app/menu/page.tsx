"use client";

import MenuButton from "@/components/menu-button";
import { motion } from "framer-motion";
import { buttons } from "@/data/menu";
import { useCallback, useEffect, useState } from "react";
import useMouseActivity from "@/hooks/useMouse";
import TutorialOverlay, {
  TUTORIAL_STORAGE_KEY,
} from "@/components/tutorial-overlay";

export default function PortfolioPage() {
  const showHelp = useMouseActivity();
  /* null tant que le localStorage n'a pas ete lu, pour ne pas casser l'hydratation */
  const [showTutorial, setShowTutorial] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setShowTutorial(localStorage.getItem(TUTORIAL_STORAGE_KEY) !== "true");
    } catch {
      setShowTutorial(false);
    }
  }, []);

  const closeTutorial = useCallback(() => {
    try {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
    } catch {
      /* navigation privee : on ferme quand meme */
    }
    setShowTutorial(false);
  }, []);

  useEffect(() => {
    if (showTutorial !== false || window.innerWidth <= 768) return;
    document
      .querySelector<HTMLButtonElement>("button[datatype=menu-button]")
      ?.focus();
  }, [showTutorial]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      // Bloque la navigation clavier sous-jacente sur mobile ou si le tutoriel est ouvert
      if (window.innerWidth < 768 || showTutorial) return;

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=menu-button]")
      ) as HTMLButtonElement[];
      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

      if (document.activeElement === document.body) allButtons[0]?.focus();

      switch (e.key) {
        case "h":
          e.preventDefault();
          setShowTutorial((prev) => !prev);
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevButton =
            allButtons[
              (currentIndex - 1 + allButtons.length) % allButtons.length
            ];
          prevButton?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          allButtons[(currentIndex + 1) % allButtons.length]?.focus();
          break;
        case "Enter":
          e.preventDefault();
          (document.activeElement as HTMLButtonElement)?.click();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showTutorial]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="menu-backdrop relative flex h-screen items-center overflow-hidden"
      aria-label="Menu principal navigable avec les fleches du clavier"
    >
      {/* Aide masquée quand le tutoriel est actif */}
      {showHelp && !showTutorial && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50 opacity-0 sm:opacity-100">
          Utilisez ↑ ↓ pour naviguer | Entrée pour sélectionner | [?] Aide
        </div>
      )}

      <button
        onClick={() => setShowTutorial((prev) => !prev)}
        aria-label="Revoir le tutoriel"
        className="absolute top-4 right-4 z-20 h-12 w-12 rounded-full bg-black/70 font-drunkenhour text-3xl text-white shadow-lg transition hover:bg-red-600 focus:bg-red-600 focus:outline-2 focus:outline-white"
      >
        ?
      </button>

      <div className="relative z-10 flex h-full max-h-screen w-full flex-col items-center justify-center gap-0.5 overflow-y-auto px-4 py-4 sm:w-3/5 sm:items-start sm:pl-16 lg:w-1/2 lg:pl-24">
        <header className="px-4 text-center sm:px-0 sm:text-left">
          <h1 className="font-broken-home text-[min(7.5vh,3rem)] font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-[min(7.5vh,3.5rem)] lg:text-[min(7.5vh,4.75rem)]">
            The Arcana of the Code
          </h1>
          <p className="font-broken-home text-[min(2vh,1rem)] leading-tight text-gray-200 drop-shadow-lg sm:text-[min(2vh,1.125rem)]">
            Venez decouvrir qui est Steve Retournay
          </p>
        </header>

        {buttons.map((button, index) => (
          <MenuButton
            key={index}
            title={button.title}
            explanation={button.explanation}
            url={button.url}
            color={button.color}
            type={button.type}
            /* 3/4 de la taille du titre : mêmes coefficients vh/rem × 0.75 */
            titleSizeClassName="text-[min(5.6vh,2.25rem)] leading-none sm:text-[min(5.6vh,2.6rem)] lg:text-[min(5.6vh,3.5rem)]"
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 items-center justify-center sm:flex lg:w-1/2"
      >
        <svg
          viewBox="0 0 600 800"
          className="h-full max-h-[85vh] w-auto"
        >
          <defs>
            <radialGradient id="menuGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="340" cy="360" r="300" fill="url(#menuGlow)" />
          <circle
            cx="340"
            cy="360"
            r="180"
            fill="none"
            stroke="#dc2626"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      {showTutorial && <TutorialOverlay onClose={closeTutorial} />}
    </motion.nav>
  );
}