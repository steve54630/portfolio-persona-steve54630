// app/page.tsx
"use client";


import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        buttonRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-[url('/images/menu-background.jpg')] bg-cover bg-center">

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg font-broken-home">
          The Arcana of the Code
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 animate-fadeIn delay-200 font-broken-home">
          Venez decouvrir qui est Steve Retournay
        </p>

        <Link href="/menu" passHref>
          <button
            ref={buttonRef}
            className="px-8 py-4 font-drunkenhour text-3xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none hover:bg-red-600"
          >
            Appuyez sur Entrée pour entrer...
          </button>
        </Link>

      </div>
    </div>
  );
}
