"use client";

import useMouseActivity from "@/hooks/useMouse";
import { ISkill } from "@/types/skill";
import { SkillsPageProps } from "@/types/props";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SkillUsagePanel from "./skill-usage-panel";

const TOUTES = "toutes";

export default function SkillsPage({ skills, categories }: SkillsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(TOUTES);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [focusZone, setFocusZone] = useState<"categories" | "skills">("categories");
  const showHelp = useMouseActivity();
  const router = useRouter();

  const firstCategoryRef = useRef<HTMLButtonElement | null>(null);
  // Référence pour mémoriser le dernier élément de grille focusé avant ouverture
  const lastFocusedSkillRef = useRef<HTMLButtonElement | null>(null);

  const skillsAffiches = useMemo(
    () =>
      [...skills]
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(
          (skill) =>
            selectedCategory === TOUTES ||
            selectedCategory === skill.category?.id,
        ),
    [skills, selectedCategory],
  );

  // Fonction pour fermer la modale et restaurer le focus
  const handleCloseModal = () => {
    setSelectedSkill(null);
    setFocusZone("skills");
    // Restaure le focus sur la carte skill d'origine
    setTimeout(() => {
      if (lastFocusedSkillRef.current) {
        lastFocusedSkillRef.current.focus();
      }
    }, 50);
  };

  // Focus automatique au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstCategoryRef.current) {
        firstCategoryRef.current.focus();
        setFocusZone("categories");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Gestion de la navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedSkill && e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
        return;
      }

      if (window.innerWidth < 768) return;

      const catButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("button[datatype=categories]")
      );
      const skillButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("button[datatype=skill]")
      );

      const activeEl = document.activeElement as HTMLButtonElement;
      const isCatFocused = catButtons.includes(activeEl);
      const isSkillFocused = skillButtons.includes(activeEl);

      // --- NAVIGATION CATÉGORIES ---
      if (isCatFocused) {
        setFocusZone("categories");
        const currentIndex = catButtons.indexOf(activeEl);

        if (e.key === "ArrowUp") {
          e.preventDefault();
          const prevIdx = (currentIndex - 1 + catButtons.length) % catButtons.length;
          catButtons[prevIdx].focus();
          catButtons[prevIdx].click();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          const nextIdx = (currentIndex + 1) % catButtons.length;
          catButtons[nextIdx].focus();
          catButtons[nextIdx].click();
        } else if (e.key === "Enter" && skillButtons.length > 0) {
          e.preventDefault();
          skillButtons[0].focus();
          setFocusZone("skills");
        } else if (e.key === "Escape") {
          e.preventDefault();
          router.push("/menu");
        }
        return;
      }

      // --- NAVIGATION SKILLS ---
      if (isSkillFocused) {
        setFocusZone("skills");
        const currentIndex = skillButtons.indexOf(activeEl);
        const gridContainer = skillButtons[0]?.parentElement;
        const columns = gridContainer
          ? getComputedStyle(gridContainer).gridTemplateColumns.split(" ").length
          : 4;

        if (e.key === "Escape") {
          e.preventDefault();
          const activeCatBtn = catButtons.find(
            (btn) => btn.getAttribute("aria-pressed") === "true"
          );
          (activeCatBtn || catButtons[0])?.focus();
          setFocusZone("categories");
          return;
        }

        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (currentIndex < skillButtons.length - 1) {
            skillButtons[currentIndex + 1].focus();
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (currentIndex > 0) {
            skillButtons[currentIndex - 1].focus();
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (currentIndex + columns < skillButtons.length) {
            skillButtons[currentIndex + columns].focus();
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (currentIndex - columns >= 0) {
            skillButtons[currentIndex - columns].focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSkill, router]);

  const onglets = [{ id: TOUTES, name: "Toutes", icon: "✨" }, ...categories];

  return (
    <div className="relative flex flex-col md:flex-row h-screen overflow-hidden text-white pt-20 md:pt-0">
      {/* Bouton Retour & Infobulle dynamique en haut */}
      <div className="absolute top-5 left-5 z-40 flex items-center gap-4">
        <Link href="/menu">
          <button
            id="return-button"
            className="rounded-lg bg-zinc-900 px-6 py-3 font-drunkenhour text-2xl sm:text-4xl text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-red-600 focus:bg-red-600 focus:outline-none"
          >
            Retour
          </button>
        </Link>
        {showHelp && (
          <span className="hidden sm:inline-block rounded bg-black/80 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-300 shadow-lg">
            {selectedSkill ? (
              "[ESC] Fermer le détail"
            ) : focusZone === "categories" ? (
              "[↑/↓] Choisir catégorie | [ENTRÉE] Aller aux compétences | [ESC] Menu"
            ) : (
              "[FLÈCHES] Parcourir compétences | [ENTRÉE] Sélectionner | [ESC] Retour aux filtres"
            )}
          </span>
        )}
      </div>

      {/* Colonne gauche : Catégories */}
      <aside className="w-full md:w-1/4 p-4 md:p-8 flex flex-col justify-center items-center">
        <h2 className="text-4xl sm:text-5xl font-drunkenhour my-4 md:my-6 text-center text-white drop-shadow">
          Catégories
        </h2>

        <ul className="flex flex-row md:flex-col overflow-x-auto w-full max-w-xs md:max-w-none gap-2 pb-2 md:pb-0">
          {onglets.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <li key={cat.id} className="shrink-0 w-auto md:w-full">
                <button
                  ref={idx === 0 ? firstCategoryRef : null}
                  datatype="categories"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  onFocus={() => setFocusZone("categories")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition font-sans text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-red-600 ${
                    isSelected
                      ? "bg-red-600 text-white font-bold shadow-lg shadow-red-600/30"
                      : "bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300"
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Colonne droite : Compétences */}
      <main className="flex-1 flex flex-col p-4 sm:p-8 items-center justify-center overflow-hidden">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-6xl font-drunkenhour mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Skills
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400">
            Sélectionnez une compétence pour voir les projets qui l&apos;utilisent
          </p>
        </header>

        <div className="w-full max-w-4xl h-[60vh] max-h-137.5 bg-black/60 border border-zinc-800 rounded-2xl p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {skillsAffiches.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {skillsAffiches.map((skill) => (
                <button
                  key={skill.id}
                  datatype="skill"
                  onClick={(e) => {
                    lastFocusedSkillRef.current = e.currentTarget;
                    setSelectedSkill(skill);
                  }}
                  onFocus={(e) => {
                    setFocusZone("skills");
                    lastFocusedSkillRef.current = e.currentTarget;
                  }}
                  className="group flex items-center justify-start gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 transition-all hover:bg-red-600 hover:border-red-500 hover:scale-[1.02] focus:outline-none focus:bg-red-600 focus:ring-2 focus:ring-red-400 overflow-hidden"
                  title={skill.name}
                >
                  <span
                    aria-hidden="true"
                    className="text-xl sm:text-2xl shrink-0"
                  >
                    {skill.category?.icon}
                  </span>
                  <span className="font-broken-home text-base text-zinc-100 group-hover:text-white truncate">
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 font-sans">
              Aucune compétence dans cette catégorie.
            </div>
          )}
        </div>
      </main>

      {selectedSkill && (
        <SkillUsagePanel
          skill={selectedSkill}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}