"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMouseActivity from "@/hooks/useMouse";
import { ConfidantBookProps } from "@/types/props";

export default function ConfidantBook({ confidants }: ConfidantBookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const showHelp = useMouseActivity();
  const router = useRouter();

  const nextPage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % confidants.length);
  }, [confidants.length]);

  const prevPage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? confidants.length - 1 : prev - 1
    );
  }, [confidants.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const current = confidants[currentIndex];

  useEffect(() => {
    if (!current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevPage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextPage();
          break;
        case "Enter":
          if (current.platform !== "Email") {
            e.preventDefault();
            window.open(current.url, "_blank", "noopener,noreferrer");
          }
          break;
        case "Escape":
          e.preventDefault();
          router.push("/");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, nextPage, prevPage, router]);

  if (!current) {
    return (
      <main className="site-backdrop flex min-h-screen flex-col items-center justify-center gap-6 p-5 text-center">
        <Link
          href="/"
          className="rounded-lg bg-black/80 px-8 py-4 font-drunkenhour text-3xl text-white shadow-lg backdrop-blur-md transition hover:bg-red-600 focus:bg-red-600 focus:outline-none"
        >
          Retour
        </Link>
        <p className="font-sans text-white">Aucun confident pour le moment.</p>
      </main>
    );
  }

  return (
    <main
      role="main"
      aria-label="Mes Confidants"
      className="site-backdrop relative flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4 sm:p-8"
    >
      <div className="sr-only" aria-live="polite">
        {current.platform}. Utilisez les flèches gauche et droite pour
        naviguer entre mes contacts.
      </div>

      <Link
        href="/"
        id="return-button"
        className="absolute top-5 left-5 z-30 rounded-lg border border-red-500/60 bg-black/80 px-6 py-3 font-drunkenhour text-2xl text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        ← RETOUR
      </Link>

      <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden rounded-2xl border-2 border-red-500/60 bg-black/85 p-6 shadow-[0_0_25px_rgba(220,38,38,0.3)] backdrop-blur-md sm:w-10/12 sm:p-8 lg:w-4/6">
        <div className="relative h-85 w-full sm:h-115">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center gap-4"
            >
              <h2 className="flex items-center gap-4 font-drunkenhour text-2xl text-white sm:text-3xl">
                <img
                  src={current.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 rounded-lg object-contain sm:h-12 sm:w-12"
                />
                {current.platform}
              </h2>

              <div className="flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-red-500/40 bg-black/60 sm:h-90">
                {current.platform !== "Email" ? (
                  <a
                    href={current.url}
                    target="_blank"
                    id="link"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <img
                      src={`/images/confident/${current.id}.jpg`}
                      alt={`Aperçu du profil ${current.platform} de Steve Retournay`}
                      className="h-full w-full object-contain"
                    />
                  </a>
                ) : (
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSexc3a15n0QzX5tcmKUqn7-ylocEJnjOodRSqZez7smT79Z0g/viewform?embedded=true"
                    title="Formulaire de contact par email"
                    className="h-full w-full"
                  >
                    Chargement…
                  </iframe>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-row items-center justify-center gap-6">
          <button
            onClick={prevPage}
            id="back-button"
            className="rounded-lg border border-red-500/60 bg-black/80 px-5 py-2.5 font-sans text-white backdrop-blur-md transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            ← Précédent
          </button>
          <button
            onClick={nextPage}
            id="next-button"
            className="rounded-lg border border-red-500/60 bg-black/80 px-5 py-2.5 font-sans text-white backdrop-blur-md transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Suivant →
          </button>
        </div>
      </div>

      {showHelp && (
        <div
          role="status"
          className="fixed bottom-4 right-4 hidden rounded-full border border-red-500/50 bg-black/90 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:block"
        >
          [← / →] Naviguer | [ENTRÉE] Ouvrir | [ESC] Retour
        </div>
      )}
    </main>
  );
}
