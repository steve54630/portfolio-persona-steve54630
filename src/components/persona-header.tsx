import { PersonaProps } from "@/types/props";
import Link from "next/link";
import React from "react";

export default function PersonaHeader({ persona, ...props }: PersonaProps) {
  return (
    <header
      className="flex flex-col justify-between max-w-screen sm:text-4xl -rotate-2 sm:m-0 mb-6 items-center py-5 px-5 gap-3 text-white"
      {...props}
    >
      <Link className="flex flex-row" href="/persona">
        <button
          id="back-button"
          className="px-8 py-4 font-drunkenhour text-3xl rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
        <div className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg w-75 hidden sm:flex sm:opacity-100">
          Utilisez les ← et → pour changer les images, Echap pour revenir en
          arrière, Espace pour toggle la légende
        </div>
      </Link>

      <section className="w-fit h-fit">
        <div className="flex flex-col sm:flex-row  gap-2">
          <p className="font-extrabold text-2xl text-yellow-700 italic inline-flex items-center">
            <img
              src={persona.arcana.image}
              alt={persona.title}
              className="sm:w-[20%] w-[20%] px-5 h-fit"
            />
            {persona.arcana.name.toLocaleUpperCase()}
          </p>
          <p className="mt-10 text-[30px] inline-flex items-center">
            {persona.title}
          </p>
        </div>
      </section>
    </header>
  );
}
