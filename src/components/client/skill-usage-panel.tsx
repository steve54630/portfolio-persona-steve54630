"use client";

import { IExperience } from "@/types/experience";
import { IPersona } from "@/types/persona";
import { SkillUsagePanelProps } from "@/types/props";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";

export default function SkillUsagePanel({
  skill,
  onClose,
}: SkillUsagePanelProps) {
  const [personas, setPersonas] = useState<IPersona[] | null>(null);
  const [experiences, setExperiences] = useState<IExperience[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  /* Interception des touches clavier (Escape) */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopImmediatePropagation();

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [onClose]);

  /* Fetching des données liées à la compétence */
  useEffect(() => {
    let annule = false;

    setPersonas(null);
    setExperiences(null);
    setErreur(false);

    Promise.all([
      axios.get<IPersona[]>(`/api/persona/skill/${skill.id}`),
      axios.get<IExperience[]>(`/api/experiences/skill/${skill.id}`),
    ])
      .then(([reponsePersonas, reponseExperiences]) => {
        if (annule) return;
        setPersonas(reponsePersonas.data);
        setExperiences(reponseExperiences.data);
      })
      .catch(() => {
        if (!annule) setErreur(true);
      });

    return () => {
      annule = true;
    };
  }, [skill.id]);

  const chargement = personas === null && experiences === null && !erreur;
  const total = (personas?.length ?? 0) + (experiences?.length ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-panel-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors du clic dans le contenu
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-red-600/80 bg-zinc-950 p-6 shadow-[0_0_35px_rgba(220,38,38,0.25)] sm:p-8"
      >
        {/* Bouton Croix Fermer Top Right */}
        <button
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-6 right-6 text-xl text-zinc-400 hover:text-red-500 transition focus:outline-none"
        >
          <ImCross />
        </button>

        {/* Titre & Catégorie */}
        <h2
          id="skill-panel-title"
          className="flex items-center gap-3 font-drunkenhour text-3xl sm:text-5xl text-white pr-8"
        >
          <span aria-hidden="true" className="text-2xl sm:text-4xl">
            {skill.category?.icon}
          </span>
          {skill.name}
        </h2>

        {/* Skeleton pendant le chargement */}
        {chargement && (
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
            <div className="h-16 bg-zinc-900 rounded-xl"></div>
            <div className="h-16 bg-zinc-900 rounded-xl"></div>
          </div>
        )}

        {/* État d'erreur */}
        {erreur && (
          <p className="mt-6 rounded-xl border border-red-900 bg-red-950/40 p-4 font-sans text-sm text-red-300 sm:text-base">
            Les résultats n&apos;ont pas pu être chargés.
          </p>
        )}

        {/* État vide */}
        {!chargement && !erreur && total === 0 && (
          <p className="mt-6 font-sans text-sm text-zinc-400 sm:text-base">
            Aucun projet ni aucune expérience ne fait appel à cette compétence
            pour le moment.
          </p>
        )}

        {/* Section Projets (Personas) */}
        {personas !== null && personas.length > 0 && (
          <section className="mt-6">
            <h3 className="font-drunkenhour text-2xl text-red-500 tracking-wide">
              Projets
            </h3>
            <ul className="mt-3 space-y-3">
              {personas.map((persona) => (
                <li key={persona.id}>
                  <Link
                    href={`/persona/${persona.id}`}
                    className="group flex flex-col gap-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 transition hover:border-red-600/60 hover:bg-zinc-900 focus:bg-zinc-900 focus:outline-none"
                  >
                    <span className="w-fit rounded-full bg-red-600/20 border border-red-600/40 px-3 py-0.5 font-broken-home text-xs text-red-400">
                      {persona.arcana.name}
                    </span>
                    <span className="font-sans text-base sm:text-lg text-zinc-200 group-hover:text-white font-medium">
                      {persona.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section Expériences */}
        {experiences !== null && experiences.length > 0 && (
          <section className="mt-6">
            <h3 className="font-drunkenhour text-2xl text-red-500 tracking-wide">
              Expériences
            </h3>
            <ul className="mt-3 space-y-3">
              {experiences.map((experience) => (
                <li key={experience.id}>
                  <Link
                    href="/history"
                    className="group flex flex-col gap-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 transition hover:border-red-600/60 hover:bg-zinc-900 focus:bg-zinc-900 focus:outline-none"
                  >
                    <span className="w-fit rounded-full bg-zinc-800 border border-zinc-700 px-3 py-0.5 font-mono text-xs text-zinc-300">
                      {experience.period}
                    </span>
                    <span className="font-sans text-base sm:text-lg text-zinc-200 group-hover:text-white font-medium">
                      {experience.role} — <span className="text-zinc-400">{experience.company}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bouton de Fermeture bas */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-red-600 py-3.5 font-drunkenhour text-2xl text-white transition hover:bg-red-500 focus:bg-red-500 focus:outline-none shadow-lg shadow-red-600/20"
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  );
}