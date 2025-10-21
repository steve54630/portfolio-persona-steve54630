"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILink } from "@/types/link";
import Link from "next/link";
import useMouseActivity from "@/hooks/useMouse";


interface ConfidantBookProps {
  confidants: ILink[];
}

export default function ConfidantBook({ confidants }: ConfidantBookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const showHelp = useMouseActivity();

  const nextPage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % confidants.length);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? confidants.length - 1 : prev - 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const current = confidants[currentIndex];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;

      if (e.key in ["ArrowLeft", "ArrowRight", "Enter"]) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          document.getElementById("back-button")?.focus();
          document.getElementById("back-button")?.click();
          break;
        case "ArrowRight":
          e.preventDefault();
          document.getElementById("next-button")?.focus();
          document.getElementById("next-button")?.click();
          break;
        case "Enter":
          e.preventDefault();
          document.getElementById("link")?.click();
          break;
        case "Escape":
          e.preventDefault();
          document.getElementById("return-button")?.focus();
          document.getElementById("return-button")?.click();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/images/menu-background.jpg')] bg-cover p-5">
      {/* Bloc central qui prend presque tout l'écran */}
      <Link className="sm:absolute mb-5 sm:mb-0 top-5 left-5" href="/menu">
        <button
          id="return-button"
          className="px-8 py-4 font-drunkenhour text-5xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
      </Link>
      <div className="relative w-full sm:w-11/12 lg:w-5/6 h-[800px] rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="absolute top-5 left-5 text-4xl flex flex-row gap-5 items-center justify-center font-drunkenhour mb-6 text-white bg-black/70">
              <img
                width={"50"}
                height={"50"}
                src={current.icon}
                alt={current.platform}
                className="w-24 mb-2 rounded-lg"
              />

              {current.platform}
            </h2>

            {current.platform !== "Email" ? (
              <a
                href={current.url}
                target="_blank"
                id="link"
                rel="noopener noreferrer"
                className="flex flex-row gap-10 items-center"
              >
                <img
                  width={"50"}
                  height={"50"}
                  src={`/images/confident/${current.id}.jpg`}
                  alt={current.platform}
                  className="w-full mb-2 rounded-lg"
                />
              </a>
            ) : current.platform === "Email" ? (
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSexc3a15n0QzX5tcmKUqn7-ylocEJnjOodRSqZez7smT79Z0g/viewform?embedded=true"
                width="500"
                height="600"
                className="w-full mb-2 rounded-lg"
              >
                Chargement…
              </iframe>
            ) : null}
            {/* Navigation */}
          </motion.div>
        </AnimatePresence>
        <div className="absolute items-center justify-center bottom-5 flex flex-row gap-10">
          <button
            onClick={prevPage}
            id="back-button"
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            ← Précédent
            {isMobile && "(Fléche gauche)"}
          </button>
          {showHelp && (
            <p className="text-white">
              {" "}
              Entrée pour visiter la page <br />
              Escape pour revenir en arriere
            </p>
          )}
          <button
            onClick={nextPage}
            id="next-button"
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Suivant →{isMobile && "(Fléche droite)"}
          </button>
        </div>
      </div>
    </main>
  );
}
