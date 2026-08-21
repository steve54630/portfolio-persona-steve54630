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
      className="flex flex-col bg-[url('/images/menu-background.jpg')] bg-cover bg-center items-center justify-center h-screen"
      aria-label="Menu principal navigable avec les fleches du clavier"
    >
      {/* Aide masquée quand le tutoriel est actif */}
      {showHelp && !showTutorial && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50 opacity-0 sm:opacity-100">
          Utilisez ↑ ↓ pour naviguer | Entrée pour sélectionner | [?] Aide
        </div>
      )}

      <header className="mb-2 px-4 text-center">
        <h1 className="font-broken-home text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl">
          The Arcana of the Code
        </h1>
        <p className="font-broken-home text-sm text-gray-200 drop-shadow-lg sm:text-base">
          Venez découvrir qui est Steve Retournay
        </p>
      </header>

      <button
        onClick={() => setShowTutorial((prev) => !prev)}
        aria-label="Revoir le tutoriel"
        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-black/70 font-drunkenhour text-3xl text-white shadow-lg transition hover:bg-red-600 focus:bg-red-600 focus:outline-2 focus:outline-white"
      >
        ?
      </button>

      {buttons.map((button, index) => (
        <MenuButton
          key={index}
          title={button.title}
          explanation={button.explanation}
          url={button.url}
          color={button.color}
          type={button.type}
        />
      ))}

      {showTutorial && <TutorialOverlay onClose={closeTutorial} />}
    </motion.nav>
  );
}