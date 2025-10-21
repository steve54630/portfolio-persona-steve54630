"use client";

import AnimatedPhrase from "@/components/arcana-phrase";
import PersonaButton from "@/components/persona-button";
import { useApi } from "@/hooks/api";
import useMouseActivity from "@/hooks/useMouse";
import { IPersona } from "@/types/persona";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PersonasPage = () => {
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);
  const api = useApi();
  const [personas, setPersonas] = useState([]);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const showHelp = useMouseActivity();

  useEffect(() => {
    if (window.innerWidth > 768) {
      const allButtons = Array.from(document.querySelectorAll("button"));
      setIsMobile(true);
      allButtons[0].focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.matchMedia("(pointers: coarse)").matches) return;

      if (e.key in ["ArrowUp", "ArrowDown", "Enter"]) {
        e.preventDefault();
      }

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=persona-button]")
      ) as HTMLButtonElement[];
      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

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
        case "Escape":
          e.preventDefault();
          document.getElementById("back-button")?.focus();
          router.push("/menu");
          break;
        case "Enter":
          e.preventDefault();
          (document.activeElement as HTMLButtonElement)?.click();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await api.get("/api/persona");
      setPersonas(response.data);
    };
    fetchPersonas();
  }, []);

  return (
    <motion.main
      className="gap-3 flex sm:flex-row overflow-hidden flex-col h-screen bg-[url('/images/menu-background.jpg')]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/menu">
        <button
          id="back-button"
          className="px-8 py-4 font-drunkenhour text-3xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
      </Link>
      <section className="relative flex flex-col justify-center items-left sm:gap-5 sm:max-h-[90vh] sm:w-[1200px]">
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
      {isMobile && (
        <>
          <section className="relative lg:flex justify-center items-center pr-20 hidden sm:h-[90vh] sm:w-[800px]">
            {selectedPersona ? (
              <>
                <img
                  src={`${selectedPersona?.image[0]}`}
                  className="h-5/6 object-contain"
                  alt={`Photo du projet ${selectedPersona?.title}`}
                />
                <AnimatedPhrase phrase={selectedPersona?.arcana.phrase} />
              </>
            ) : (
              <div className="h-full w-full flex flex-col justify-center items-center text-white text-center p-6">
                <p className="text-2xl font-bold">Sélectionnez un projet</p>
                <p className="mt-4 text-lg">
                  Passez la souris sur un projet ou utilisez les flèches pour
                  naviguer entre les projets et voir son image.
                </p>
              </div>
            )}
          </section>
          {showHelp && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50 opacity-0 sm:opacity-100">
              Utilisez les ↑ ↓ pour naviguer, Entrée pour sélectionner et Echap
              pour revenir au menu
            </div>
          )}
        </>
      )}
    </motion.main>
  );
};

export default PersonasPage;
