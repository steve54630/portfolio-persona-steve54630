"use client";

import MenuButton from "@/components/menu-button";
import { motion } from "framer-motion";
import { buttons } from "@/data/menu";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
      if (window.innerWidth < 768) return;

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=menu-button]")
      ) as HTMLButtonElement[];
      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

      if (document.activeElement === document.body) allButtons[0].focus();

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          const button =
            allButtons[
              (currentIndex - 1 + allButtons.length) % allButtons.length
            ];
          button.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          allButtons[(currentIndex + 1) % allButtons.length].focus();
          break;
        case "Enter":
          e.preventDefault();
          (document.activeElement as HTMLButtonElement)?.click();
          break;
        case "Escape":
          e.preventDefault();
          document.getElementById("back-button")?.focus();
          document.getElementById("back-button")?.click();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-[url('/images/menu-background.jpg')] bg-cover bg-center items-center justify-center h-screen"
      aria-label="Menu principal navigable avec les fleches du clavier "
    >
      {showHelp && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50 opacity-0 sm:opacity-100">
          Utilisez les ↑ ↓ pour naviguer, Entrée pour sélectionner, Escape pour
          retourner à la page d&apos;accueil
        </div>
      )}
      <Link href="/">
        <button
          id="back-button"
          className="absolute top-4 left-4 px-8 py-4 font-drunkenhour text-3xl text-white bg-black/70 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
      </Link>
      <button
        onClick={() => setShowTutorial(true)}
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
