export type ResistTabItem = {
  element: string;
  type: "resist" | "weak" | "neutral";
};

const ResistanceCell = ({ element, type }: ResistTabItem) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700/60 shadow-md min-w-9.5 sm:min-w-12">
      {/* Conteneur de l'icône d'élément avec contraste renforcé */}
      <div className="relative flex items-center justify-center p-1 rounded-md bg-zinc-800/80 w-8 h-8 sm:w-10 sm:h-10">
        <img
          src={`/images/elements/${element}.png`}
          alt={element}
          className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.6)] invert brightness-200"
        />
      </div>

      <hr className="w-full border-red-500/40" />

      {/* Icône du type de résistance (Weak / Resist / Neutral) */}
      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
        <img
          src={`/images/resists/${type}.png`}
          alt={type}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ResistanceCell;