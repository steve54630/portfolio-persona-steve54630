"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MentionsLegalesPage() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;

      if (e.key === "Escape") {
        e.preventDefault();
        document.getElementById("back-button")?.focus();
        document.getElementById("back-button")?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="py-60 px-4 max-w-3xl mx-auto">
      <Link href="/menu">
        <button
          id="back-button"
          className="absolute top-4 left-4 px-8 py-4 font-drunkenhour text-3xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
      </Link>
      <h1 className="text-6xl font-bold mb-4 text-white font-drunkenhour">
        Mentions légales
      </h1>
      <p className="mb-4 text-white text-4xl font-sans">
        Ce site est édité par Steve Retournay. Vous pouvez me contacter à
        l'adresse email :{" "}
        <a href="mailto:retournay.steve@yahoo.com">retournay.steve@yahoo.com</a>
        .
      </p>
      <p className="mb-4 text-white text-4xl">
        Toute reproduction totale ou partielle du contenu est interdite sauf
        autorisation. Les informations publiées sont fournies à titre indicatif
        et peuvent évoluer.
      </p>
      <p className="text-gray-500 text-2xl">
        Dernière mise à jour : 30 septembre 2025
      </p>
    </div>
  );
}
