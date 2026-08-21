import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-backdrop flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border-2 border-red-600 bg-black/85 p-8 shadow-2xl">
        <h1 className="font-drunkenhour text-5xl text-white sm:text-6xl">
          Page introuvable
        </h1>
        <p className="mt-4 font-sans text-base text-gray-200 sm:text-lg">
          Cette page n&apos;existe pas ou plus. Revenez au menu pour continuer
          la visite.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-lg bg-red-600 px-8 py-4 font-drunkenhour text-2xl text-white transition hover:scale-105 hover:bg-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Retour au menu
        </Link>
      </div>
    </main>
  );
}
