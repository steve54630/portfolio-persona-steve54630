"use client";

import AnimatedPhrase from "@/components/arcana-phrase";
import PersonaButton from "@/components/persona-button";
import useMouseActivity from "@/hooks/useMouse";
import { IPersona } from "@/types/persona";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

export default function PersonasClient({
  initialPersonas,
}: {
  initialPersonas: IPersona[];
}) {
  const [personas] = useState<IPersona[]>(initialPersonas);
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);
  const showHelp = useMouseActivity();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Navigation clavier
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          "button[datatype=persona-button]"
        )
      );

      if (buttons.length === 0) return;

      const activeEl = document.activeElement as HTMLButtonElement;
      const currentIndex = buttons.indexOf(activeEl);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          currentIndex < 0 ? 0 : (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
        buttons[prevIndex].focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.push("/menu");
      }
    },
    [router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus automatique au chargement
  useEffect(() => {
    if (personas.length > 0) {
      const firstBtn = document.querySelector<HTMLButtonElement>(
        "button[datatype=persona-button]"
      );
      if (firstBtn && document.activeElement === document.body) {
        firstBtn.focus();
      }
    }
  }, [personas.length]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="main"
      aria-label="Sélection des projets Persona"
      className="site-backdrop relative h-screen w-full bg-fixed p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center justify-center overflow-hidden"
    >
      <div className="sr-only" aria-live="polite">
        Utilisez les flèches haut et bas pour naviguer dans la liste des projets.
      </div>

      {/* Bouton Retour */}
      <Link href="/menu" className="absolute top-4 left-4 z-30" prefetch={true}>
        <button
          id="back-button"
          className="px-5 py-2.5 font-drunkenhour text-xl sm:text-2xl text-white bg-black/80 backdrop-blur-md border border-red-500/60 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          ← RETOUR
        </button>
      </Link>

      {/* Conteneur principal équilibré 50/50 */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-6 items-center justify-center mt-12 sm:mt-0">
        
        {/* Liste des Personas */}
        <section
          ref={containerRef}
          aria-label="Liste des projets"
          className="w-full sm:w-1/2 h-140 max-h-[75vh] overflow-y-auto flex flex-col gap-2 bg-black/85 backdrop-blur-md p-4 rounded-2xl border-2 border-red-500/60 shadow-[0_0_25px_rgba(220,38,38,0.3)] z-10 custom-scrollbar font-sans text-sm"
        >
          {personas.map((persona: IPersona) => (
            <PersonaButton
              key={persona.id}
              persona={persona}
              onMouseEnter={() => setSelectedPersona(persona)}
              onMouseLeave={() => setSelectedPersona(null)}
              onFocus={() => setSelectedPersona(persona)}
              onBlur={() => setSelectedPersona(null)}
            />
          ))}
        </section>

        {/* Zone Aperçu : Image prioritaire + Texte en bas */}
        <section
          aria-label="Aperçu du projet sélectionné"
          className="hidden sm:flex flex-col justify-between items-center w-full sm:w-1/2 h-140 max-h-[75vh] bg-black/75 backdrop-blur-md p-6 rounded-2xl border border-red-500/40"
        >
          {selectedPersona ? (
            <div className="w-full h-full flex flex-col items-center justify-between gap-4">
              {/* Conteneur Image agrandi */}
              <div className="relative w-full flex-1 min-h-85">
                <Image
                  src={selectedPersona.img[0]}
                  alt={`Illustration du projet ${selectedPersona.title}`}
                  fill
                  sizes="(max-width: 1200px) 50vw, 600px"
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  priority
                />
              </div>

              {/* Phrase Arcana sous l'image */}
              {selectedPersona.arcana?.phrase && (
                <div className="w-full bg-zinc-950/90 border-l-4 border-red-500 p-3 rounded-r-lg text-left">
                  <AnimatedPhrase phrase={selectedPersona.arcana.phrase} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-white text-center p-4">
              <p className="text-xl font-bold font-drunkenhour text-red-500 tracking-wide">
                SÉLECTIONNEZ UN PROJET
              </p>
              <p className="mt-2 text-xs text-zinc-400 max-w-xs font-sans">
                Survolez ou naviguez avec les flèches [↑ / ↓] pour afficher un aperçu.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Barre d'aide */}
      {showHelp && (
        <div
          role="status"
          className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-[11px] px-4 py-1.5 rounded-full border border-red-500/50 shadow-lg z-40 font-mono tracking-wider uppercase hidden sm:block"
        >
          [↑ / ↓] Naviguer | [ENTRÉE] Ouvrir | [ESC] Retour
        </div>
      )}
    </motion.main>
  );
}