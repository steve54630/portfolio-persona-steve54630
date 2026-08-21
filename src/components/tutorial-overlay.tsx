"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const TUTORIAL_STORAGE_KEY = "portfolio-tutorial-vu";

const entries = [
  {
    icon: "👤",
    title: "Status",
    text: "Qui je suis, mes statistiques, et mes CV en ligne et papier.",
  },
  {
    icon: "⚔️",
    text: "Les technologies que je pratique, rangées par catégories.",
    title: "Skills",
  },
  {
    icon: "🎴",
    title: "Persona",
    text: "Mes projets. Chacun possède un Arcane — sa technologie principale — des Résistances, ce que j'y maîtrise, et des Faiblesses, ce qu'il me reste à travailler.",
  },
  {
    icon: "📜",
    title: "History",
    text: "Mon parcours professionnel, mission par mission.",
  },
  {
    icon: "🤝",
    title: "Confidents",
    text: "Mes Confidants : les différentes façons de me joindre.",
  },
];

interface TutorialOverlayProps {
  onClose: () => void;
}

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  /*
   * preventScroll sinon le panneau defile jusqu'au bouton et le visiteur
   * decouvre la fin du tutoriel avant son titre.
   */
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  /*
   * Le menu ecoute les fleches et Entree sur window. Tant que le tutoriel est
   * ouvert on intercepte en phase de capture pour que la navigation du menu ne
   * bouge pas dans le dos de l'utilisateur.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopImmediatePropagation();

      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 p-4 sm:p-8"
    >
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 border-red-600 bg-black p-8 shadow-2xl sm:max-w-4xl sm:p-12"
      >
        <h2
          id="tutorial-title"
          className="text-center font-drunkenhour text-5xl text-white sm:text-6xl"
        >
          Glossaire
        </h2>
        <p className="mt-3 text-center font-sans text-base text-gray-400 sm:text-lg">
          Ce portfolio emprunte les codes du jeu Persona. Voici la traduction.
        </p>

        <dl className="mt-8 space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:space-y-0">
          {entries.map((entry) => (
            <div key={entry.title} className="flex gap-4">
              <span aria-hidden="true" className="text-3xl leading-none">
                {entry.icon}
              </span>
              <div>
                <dt className="font-drunkenhour text-3xl text-red-500">
                  {entry.title}
                </dt>
                <dd className="font-sans text-base text-gray-200 sm:text-lg">
                  {entry.text}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-8 rounded-lg bg-gray-900 p-4 text-center font-sans text-base text-gray-300 sm:text-lg">
          Au clavier : <kbd className="font-bold text-white">↑</kbd>{" "}
          <kbd className="font-bold text-white">↓</kbd> pour naviguer,{" "}
          <kbd className="font-bold text-white">Entrée</kbd> pour valider,{" "}
          <kbd className="font-bold text-white">Échap</kbd> pour revenir.
        </p>

        <button
          ref={closeRef}
          onClick={onClose}
          className="mt-8 w-full rounded-lg bg-red-600 px-6 py-4 font-drunkenhour text-4xl text-white transition hover:bg-red-500 focus:bg-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Commencer
        </button>
      </motion.div>
    </motion.div>
  );
}
