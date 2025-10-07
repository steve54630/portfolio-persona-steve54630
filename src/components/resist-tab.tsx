"use client";

import { resistances } from "@/data/resistances";
import {  ResistsProps } from "@/types/props";
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
      <div className="flex flex-col gap-5 items-center justify-center">
        <section
          className="grid grid-cols-10 gap-5 py-5 ml-10 -rotate-3 divide-gray-400 ext-center place-items-center w-fit sm:w-fit"
          ref={ref}
        >
          {resists.map((r) => (
            <ResistanceCell key={r.element} {...r} />
          ))}
        </section>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          id="toggle-info"
          className="ml-10 text-5xl sm:text-5xl font-drunkenhour"
        >
          Légende
        </button>
        {open && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/40 min-h-screen max-w-screen flex items-center justify-center z-50">
            <div className="fixed backdrop-blur-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-1/2 h-fit p-8 rounded-3xl bg-white/60 flex flex-col gap-8 items-center justify-center z-50">
              <div className="grid grid-cols-2 gap-6 w-full place-items-center">
                {resistances.map((element) => (
                  <div key={element} className="flex flex-col items-center">
                    <img
                      src={`/images/elements/${element}.png`}
                      alt={element}
                      className="w-10"
                    />
                    <p className="text-2xl capitalize">{element}</p>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <img
                    src={`/images/resists/neutral.png`}
                    alt="neutral"
                    className="w-10"
                  />
                  <p className="text-2xl capitalize">Neutre</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={`/images/resists/weak.png`}
                    alt="weak"
                    className="w-10"
                  />
                  <p className="text-2xl capitalize">Faible</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={`/images/resists/resist.png`}
                    alt="resist"
                    className="w-10"
                  />
                  <p className="text-2xl capitalize">Résistance</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                id="toggle-info"
                className="text-3xl sm:text-5xl font-drunkenhour hover:scale-105 transition"
              >
                Fermer
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
