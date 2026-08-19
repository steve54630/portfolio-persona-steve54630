"use client";

import useMouseActivity from "@/hooks/useMouse";
import { ICategory } from "@/types/category";
import { ISkill } from "@/types/skill";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SkillUsagePanel from "./skill-usage-panel";
import { SkillsPageProps } from "@/interface/skill";

const TOUTES = "toutes";

export default function SkillsPage({ skills, categories }: SkillsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(TOUTES);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const showHelp = useMouseActivity();

  /* copie avant tri : sort() mute le tableau recu en props */
  const skillsAffiches = useMemo(
    () =>
      [...skills]
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(
          (skill) =>
            selectedCategory === TOUTES ||
            selectedCategory === skill.category?.id
        ),
    [skills, selectedCategory]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=categories]")
      ) as HTMLButtonElement[];
      if (allButtons.length === 0) return;

      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          const previousButton =
            allButtons[
              (currentIndex - 1 + allButtons.length) % allButtons.length
            ];
          previousButton.focus();
          previousButton.click();
          break;
        case "ArrowDown":
          e.preventDefault();
          const nextButton = allButtons[(currentIndex + 1) % allButtons.length];
          nextButton.focus();
          nextButton.click();
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

  const onglets: { id: string; name: string; icon: string }[] = [
    { id: TOUTES, name: "Toutes", icon: "✨" },
    ...categories,
  ];

  return (
    <div className="flex flex-col items-center md:flex-row min-h-screen text-white">
      <Link
        className="sm:absolute mb-5 sm:mb-0 top-5 left-5 flex flex-row items-center justify-center"
        href="/menu"
      >
        <button
          id="return-button"
          className="px-8 py-4 font-drunkenhour text-5xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
        {showHelp && (
          <div className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg w-75 hidden sm:flex sm:opacity-100">
            Utilisez les ↑ ↓ pour changer de catégories, Echap pour revenir en
            arrière
          </div>
        )}
      </Link>

      {/* --- Colonne gauche : catégories --- */}
      <aside className="md:w-1/4 w-screen p-4 justify-center items-center flex-col flex">
        <h2 className="flex text-4xl sm:text-6xl justify-center items-center w-fit p-4 font-drunkenhour m-10">
          Catégories
        </h2>
        <ul className="flex flex-row sm:flex-col overflow-x-auto w-3/4 gap-2 sm:overflow-visible">
          {onglets.map((cat) => (
            <li key={cat.id} className="flex-shrink-0">
              <button
                datatype="categories"
                aria-pressed={selectedCategory === cat.id}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* --- Colonne droite : compétences --- */}
      <main className="flex-1 flex flex-col p-6 justify-center items-center">
        <h2 className="flex text-4xl sm:text-6xl justify-center items-center w-fit p-4 font-drunkenhour mt-10 mb-2">
          Skills
        </h2>
        <p className="mb-8 font-sans text-sm text-gray-300 sm:text-base">
          Sélectionnez une compétence pour voir les projets qui l&apos;utilisent
        </p>
        <div className="grid bg-gray-800/50 rounded-xl p-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillsAffiches.map((skill) => (
            <button
              key={skill.id}
              datatype="skill"
              onClick={() => setSelectedSkill(skill)}
              className="p-4 rounded-xl shadow text-left font-broken-home text-lg sm:text-3xl transition hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:outline-2 focus:outline-white"
            >
              <span aria-hidden="true">{skill.category?.icon}</span>
              {skill.name}
            </button>
          ))}
        </div>
      </main>

      {selectedSkill && (
        <SkillUsagePanel
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
