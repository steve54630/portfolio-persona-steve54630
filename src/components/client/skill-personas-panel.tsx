"use client";

import { IPersona } from "@/types/persona";
import { ISkill } from "@/types/skill";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SkillPersonasPanelProps {
  skill: ISkill;
  onClose: () => void;
}

export default function SkillPersonasPanel({
  skill,
  onClose,
}: SkillPersonasPanelProps) {
  const [personas, setPersonas] = useState<IPersona[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  /*
   * La page Skills ecoute les fleches et Echap sur window. On intercepte en
   * phase de capture pour que la categorie selectionnee ne change pas derriere
   * le panneau, et pour qu'Echap le ferme au lieu de revenir au menu.
   */
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

  /* URL relative : ne depend pas de NEXT_PUBLIC_API_URL, qui est fige sur un port en dev */
  useEffect(() => {
    let annule = false;

    setPersonas(null);
    setErreur(false);

    axios
      .get<IPersona[]>(`/api/persona/skill/${skill.id}`)
      .then(({ data }) => {
        if (!annule) setPersonas(data);
      })
      .catch(() => {
        if (!annule) setErreur(true);
      });

    return () => {
      annule = true;
    };
  }, [skill.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-red-600 bg-black p-6 shadow-2xl sm:p-8"
      >
        <h2
          id="skill-panel-title"
          className="flex items-center gap-3 font-drunkenhour text-4xl text-white sm:text-5xl"
        >
          <span aria-hidden="true">{skill.category?.icon}</span>
          {skill.name}
        </h2>
        <p className="mt-2 font-sans text-sm text-gray-400 sm:text-base">
          {personas === null && !erreur && "Recherche des projets concernés…"}
          {erreur && "Les projets n'ont pas pu être chargés."}
          {personas !== null &&
            personas.length > 0 &&
            `Utilisée dans ${personas.length} projet${
              personas.length > 1 ? "s" : ""
            } :`}
          {personas !== null &&
            personas.length === 0 &&
            "Aucun projet publié ne fait appel à cette compétence pour le moment."}
        </p>

        {personas !== null && personas.length > 0 && (
          <ul className="mt-5 space-y-3">
            {personas.map((persona) => (
              <li key={persona.id}>
                <Link
                  href={`/persona/${persona.id}`}
                  className="flex flex-col gap-1 rounded-xl bg-gray-900 p-4 transition hover:bg-gray-800 focus:bg-gray-800 focus:outline-2 focus:outline-white"
                >
                  <span className="w-fit rounded-full bg-red-600/70 px-3 py-1 font-broken-home text-sm text-white">
                    {persona.arcana.name}
                  </span>
                  <span className="font-sans text-lg text-white">
                    {persona.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <button
          ref={closeRef}
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-red-600 px-6 py-3 font-drunkenhour text-2xl text-white transition hover:bg-red-500 focus:bg-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  );
}
