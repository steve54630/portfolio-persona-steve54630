"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";

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
    title: "Confidants",
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
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-red-600/80 bg-zinc-950 p-6 shadow-[0_0_35px_rgba(220,38,38,0.25)] sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-6 right-6 text-xl text-zinc-400 transition hover:text-red-500 focus:outline-none"
        >
          <ImCross />
        </button>

        <h2
          id="tutorial-title"
          className="text-center font-drunkenhour text-4xl text-white sm:text-5xl"
        >
          Glossaire
        </h2>
        <p className="mt-2 text-center font-sans text-sm text-zinc-400 sm:text-base">
          Ce portfolio emprunte les codes du jeu Persona. Voici la traduction.
        </p>

        <dl className="mt-6 space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.title}
              className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {entry.icon}
              </span>
              <div>
                <dt className="font-drunkenhour text-2xl text-red-500">
                  {entry.title}
                </dt>
                <dd className="font-sans text-sm text-zinc-200 sm:text-base">
                  {entry.text}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 text-center font-sans text-sm text-zinc-300">
          Au clavier : <kbd className="font-bold text-white">↑</kbd>{" "}
          <kbd className="font-bold text-white">↓</kbd> pour naviguer,{" "}
          <kbd className="font-bold text-white">Entrée</kbd> pour valider,{" "}
          <kbd className="font-bold text-white">Échap</kbd> pour revenir.
        </p>

        <button
          ref={closeRef}
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-red-600 py-3.5 font-drunkenhour text-2xl text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 focus:bg-red-500 focus:outline-none"
        >
          Commencer
        </button>
      </motion.div>
    </motion.div>
  );
}
