import Link from "next/link";

export default function LegalFooter() {
  return (
    <footer className="pointer-events-none fixed bottom-2 right-3 z-40">
      <Link
        href="/mentions-legales"
        className="pointer-events-auto rounded bg-black/60 px-2 py-1 font-sans text-xs text-gray-400 transition-colors hover:text-white focus:text-white focus:outline-2 focus:outline-white"
      >
        Mentions légales
      </Link>
    </footer>
  );
}
