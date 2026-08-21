"use client";

import { resistances } from "@/data/resistances";
import { ResistsProps } from "@/types/props";
import { forwardRef } from "react";
import ResistanceCell, { ResistTabItem } from "./resist-cell";

const ResistTab = forwardRef<HTMLDivElement, ResistsProps>(
  ({ persona, open, setOpen }: ResistsProps, ref) => {

    const resists: ResistTabItem[] = resistances.map((element) => {
      if (persona.resistances.includes(element))
        return { element, type: "resist" };
      if (persona.weaknesses.includes(element))
        return { element, type: "weak" };
      return { element, type: "neutral" };
    });

    return (
      <div className="flex flex-col items-center justify-center bg-black/60 border border-red-500/40 p-4 rounded-xl w-full">
        {/* Grille principale des éléments */}
        <div
          ref={ref}
          className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 place-items-center w-full"
        >
          {resists.map((r) => (
            <ResistanceCell key={r.element} element={r.element} type={r.type} />
          ))}
        </div>

        {/* Bouton de la légende */}
        <button
          onClick={() => setOpen(!open)}
          id="toggle-info"
          className="mt-3 text-xs font-mono text-zinc-400 hover:text-red-400 transition underline tracking-wider uppercase cursor-pointer"
        >
          [ Afficher la légende ]
        </button>

        {/* Fenêtre modale de la Légende */}
        {open && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-xl p-6 rounded-2xl bg-zinc-950 border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.5)] flex flex-col gap-6 items-center text-white">
              
              <h3 className="font-drunkenhour text-2xl text-red-500 tracking-wide">
                LÉGENDE DES ÉLÉMENTS
              </h3>

              {/* Liste des éléments avec leurs icônes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                {resistances.map((element) => (
                  <div
                    key={element}
                    className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg"
                  >
                    <img
                      src={`/images/elements/${element}.png`}
                      alt={element}
                      className="w-7 h-7 object-contain"
                    />
                    <span className="capitalize text-sm font-medium text-zinc-200">
                      {element}
                    </span>
                  </div>
                ))}
              </div>

              {/* Explication des types de résistance */}
              <div className="flex flex-wrap items-center justify-around w-full border-t border-zinc-800 pt-4 gap-2 text-xs">
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                  <img src="/images/resists/neutral.png" alt="Neutre" className="w-5 h-5 object-contain" />
                  <span className="text-zinc-300">Neutre</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                  <img src="/images/resists/weak.png" alt="Faible" className="w-5 h-5 object-contain" />
                  <span className="text-red-400 font-semibold">Faible</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                  <img src="/images/resists/resist.png" alt="Résistance" className="w-5 h-5 object-contain" />
                  <span className="text-blue-400 font-semibold">Résistance</span>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-drunkenhour text-xl rounded-lg transition duration-200 shadow-lg cursor-pointer"
              >
                FERMER
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ResistTab.displayName = "ResistTab";
export default ResistTab;