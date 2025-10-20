"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILink } from "@/types/link";

interface ConfidantBookProps {
  confidants: ILink[];
}

export default function ConfidantBook({ confidants }: ConfidantBookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/images/menu-background.jpg')] bg-cover p-5">
      {/* Bloc central qui prend presque tout l'écran */}
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
              {current.platform !== "Email" && (
                <img
                  src={current.icon}
                  alt={current.platform}
                  className="w-24 mb-2 rounded-lg"
                />
              )}
              {current.platform}
            </h2>

            {current.platform !== "Email" ? (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-10 items-center"
              >
                <img
                  src={current.icon}
                  alt={current.platform}
                  className="w-full mb-2 rounded-lg"
                />
              </a>
            ) : current.platform === "Email" ? (
              <form className="flex flex-col gap-6 w-3/4">
                <input
                  type="text"
                  placeholder="Nom"
                  className="p-2 rounded text-black bg-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded text-black bg-white"
                />
                <textarea
                  placeholder="Message"
                  className="p-2 rounded text-black bg-white"
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white p-2 rounded mt-2 hover:bg-red-700"
                >
                  Envoyer
                </button>
              </form>
            ) : null}
            {/* Navigation */}
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-5 flex flex-row gap-10">
          <button
            onClick={prevPage}
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            ← Précédent
          </button>
          <button
            onClick={nextPage}
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Suivant →
          </button>
        </div>
      </div>
    </main>
  );
}
