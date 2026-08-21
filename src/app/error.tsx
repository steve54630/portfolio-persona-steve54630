"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-backdrop flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border-2 border-red-600 bg-black/85 p-8 shadow-2xl">
        <h1 className="font-drunkenhour text-5xl text-white sm:text-6xl">
          Un imprévu est survenu
        </h1>
        <p className="mt-4 font-sans text-base text-gray-200 sm:text-lg">
          Cette page n&apos;a pas pu s&apos;afficher. Vous pouvez réessayer ou
          revenir au menu.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-red-600 px-8 py-4 font-drunkenhour text-2xl text-white transition hover:scale-105 hover:bg-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-lg bg-gray-800 px-8 py-4 font-drunkenhour text-2xl text-white transition hover:scale-105 hover:bg-gray-700 focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Retour au menu
          </Link>
        </div>
      </div>
    </main>
  );
}
