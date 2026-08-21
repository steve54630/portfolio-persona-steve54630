"use client";

import useMouseActivity from "@/hooks/useMouse";
import { HistoryClientProps } from "@/types/props";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HistoryClient({ experiences }: HistoryClientProps) {
  const showHelp = useMouseActivity();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 pb-20 pt-6 sm:px-8"
    >
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <Link href="/">
          <button
            id="back-button"
            className="rounded-lg bg-zinc-900 px-8 py-4 font-drunkenhour text-3xl text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-red-600 focus:bg-red-600 focus:outline-none"
          >
            Retour
          </button>
        </Link>
      </div>

      {showHelp && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-red-500/50 bg-black/90 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:block"
        >
          [ESC] Retour
        </div>
      )}

      <header className="mb-14 text-center">
        <h1 className="font-drunkenhour text-5xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-7xl">
          History
        </h1>
        <p className="mt-2 font-sans text-base text-gray-300 drop-shadow-[0_1px_3px_rgba(0,0,0,1)] sm:text-lg">
          Mon parcours, de la mission la plus récente à la plus ancienne
        </p>
      </header>

      <ol className="relative mx-auto max-w-3xl border-l-2 border-red-600/70 pl-6 sm:pl-10">
        {experiences.map((experience, index) => (
          <motion.li
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="relative mb-12 last:mb-0"
          >
            {/* Losange marqueur de la timeline */}
            <span
              aria-hidden="true"
              className="absolute -left-7.75 top-2 h-4 w-4 rotate-45 border-2 border-white bg-red-600 sm:-left-11.75"
            />

            <article className="rounded-2xl bg-black/80 border border-zinc-900/80 p-5 shadow-xl backdrop-blur-sm sm:p-6 transition-colors hover:border-red-600/50">
              <p className="font-drunkenhour text-2xl text-red-500 sm:text-3xl">
                {experience.period}
              </p>
              <h2 className="mt-1 font-drunkenhour text-3xl text-white sm:text-4xl">
                {experience.role}
              </h2>
              <p className="mt-1 font-sans text-lg text-zinc-400 font-medium sm:text-xl">
                {experience.company}
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-zinc-200 sm:text-lg">
                {experience.description}
              </p>

              {experience.skills && experience.skills.length > 0 && (
                <ul 
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`Compétences utilisées chez ${experience.company}`}
                >
                  {experience.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 font-sans text-sm text-zinc-200"
                    >
                      {skill.category?.icon && (
                        <span aria-hidden="true">{skill.category.icon}</span>
                      )}
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </motion.li>
        ))}
      </ol>
    </motion.main>
  );
}