"use client";

import { Axes } from "@/types/axes";
import { IStats } from "@/types/stats";
import { IStatus } from "@/types/status";
import { useState, useEffect, useCallback, useRef } from "react";
import { Progress } from "./ui/progress";
import { ImCross } from "react-icons/im";
import useMouseActivity from "@/hooks/useMouse";

function SocialDiagram({
  status,
  isMobile,
  setOpen,
}: {
  status: IStatus;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}) {
  const [polygonPoints, setPolygonPoints] = useState<string>("");
  const [axes, setAxes] = useState<Axes[]>([]);
  const viewBoxSize = 800;
  
  const [statViewed, setStatViewed] = useState<IStats | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);
  
  const showHelp = useMouseActivity();

  // 1. Référence pour le conteneur ou le premier bouton
  const firstNavBtnRef = useRef<HTMLButtonElement | null>(null);

  // 2. Auto-focus au montage de la modale
  useEffect(() => {
    // Petit délai pour laisser le temps au DOM de se peindre
    const timer = setTimeout(() => {
      if (firstNavBtnRef.current) {
        firstNavBtnRef.current.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stats: IStats[] = status.stats;
    if (!stats || stats.length === 0) return;

    const maxRadius = (viewBoxSize / 2) * 0.65;
    const centerX = viewBoxSize / 2;
    const centerY = viewBoxSize / 2;

    const points = stats.map((stat, i) => {
      const angle = (i / stats.length) * 2 * Math.PI - Math.PI / 2;
      const r = (stat.value / 5) * maxRadius;
      return {
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
      };
    });
    setPolygonPoints(points.map((p) => `${p.x},${p.y}`).join(" "));

    setAxes(
      stats.map((stat, i) => {
        const angle = (i / stats.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (maxRadius + 45);
        const y = centerY + Math.sin(angle) * (maxRadius + 45);

        const textAnchor = Math.abs(Math.cos(angle)) < 0.1 
          ? "middle" 
          : Math.cos(angle) > 0 ? "start" : "end";

        return { x, y, stat, textAnchor, dominantBaseline: "middle" };
      })
    );
  }, [status]);

  const handleSelectStat = (stat: IStats) => {
    setStatViewed(stat);
    setShowInfoPanel(true);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("button[datatype=social-nav]")
      );
      if (buttons.length === 0) return;

      const activeEl = document.activeElement as HTMLButtonElement;
      const currentIndex = buttons.indexOf(activeEl);

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          const nextIdx = currentIndex < 0 ? 0 : (currentIndex + 1) % buttons.length;
          buttons[nextIdx].focus();
          handleSelectStat(status.stats[nextIdx]);
          break;

        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          const prevIdx = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
          buttons[prevIdx].focus();
          handleSelectStat(status.stats[prevIdx]);
          break;

        case "Escape":
          e.preventDefault();
          if (showInfoPanel) {
            setShowInfoPanel(false);
          } else {
            setOpen(false);
          }
          break;
      }
    },
    [status.stats, showInfoPanel, setOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
    >
      <button
        onClick={() => setOpen(false)}
        aria-label="Fermer le diagramme"
        className="fixed top-6 right-6 text-3xl text-red-500 hover:text-white transition transform hover:scale-110 focus:outline-none z-50"
      >
        <ImCross />
      </button>

      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        
        <div className="w-full max-w-162.5 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="w-full h-auto overflow-visible"
          >
            {[1, 2, 3, 4, 5].map((lvl) => (
              <circle
                key={lvl}
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={((viewBoxSize / 2) * 0.65 * lvl) / 5}
                fill="none"
                stroke="#3f3f46"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}

            {axes.map((axis, i) => (
              <line
                key={i}
                x1={viewBoxSize / 2}
                y1={viewBoxSize / 2}
                x2={axis.x}
                y2={axis.y}
                stroke="#52525b"
                strokeWidth="1.5"
              />
            ))}

            <polygon
              points={polygonPoints}
              className="fill-red-600/50 stroke-red-500"
              strokeWidth="3"
            />

            {axes.map((axis, i) => {
              const isSelected = showInfoPanel && statViewed?.name === axis.stat.name;
              return (
                <g 
                  key={i} 
                  onClick={() => handleSelectStat(axis.stat)}
                  className="cursor-pointer group"
                >
                  <text
                    x={axis.x}
                    y={axis.y}
                    textAnchor={axis.textAnchor}
                    dominantBaseline="middle"
                    className={`font-broken-home text-2xl sm:text-3xl transition-all duration-200 select-none ${
                      isSelected 
                        ? "fill-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
                        : "fill-zinc-300 hover:fill-white"
                    }`}
                  >
                    {axis.stat.name} ({axis.stat.value}/5)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 3. Navigation masquée toujours présente dans le DOM */}
        <div className="sr-only">
          {status.stats.map((s, idx) => (
            <button
              key={idx}
              ref={idx === 0 ? firstNavBtnRef : null} // On attache la ref au tout premier bouton
              datatype="social-nav"
              onClick={() => handleSelectStat(s)}
            >
              {s.name}
            </button>
          ))}
        </div>

        {showInfoPanel && statViewed && (
          <section className="absolute top-6 bottom-6 right-0 sm:right-4 w-full sm:w-105 max-h-[50vh] bg-zinc-950/95 backdrop-blur-md border-2 border-red-600/80 p-5 rounded-2xl shadow-[0_0_35px_rgba(0,0,0,0.9)] flex flex-col gap-4 overflow-y-auto z-40 transition-all duration-300">
            <header className="flex justify-between items-center border-b border-red-600/40 pb-2">
              <div className="flex items-baseline gap-3">
                <h2 className="font-drunkenhour text-2xl sm:text-3xl text-white tracking-wide">
                  {statViewed.name}
                </h2>
                <span className="font-broken-home text-xl text-red-500">
                  {statViewed.value}/5
                </span>
              </div>
              
              <button
                onClick={() => setShowInfoPanel(false)}
                aria-label="Fermer la fenêtre d'information"
                className="text-zinc-400 hover:text-red-500 transition p-1 focus:outline-none"
              >
                <ImCross className="text-base" />
              </button>
            </header>

            <div className="flex flex-col gap-1.5 bg-black/70 p-3 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>EXP SUIVANTE</span>
                <span>{statViewed.exp || 0} / 100</span>
              </div>
              <Progress
                color="bg-red-500/50"
                value={statViewed.exp || 0}
                className="h-2.5 bg-zinc-800"
              />
            </div>

            <div className="bg-black/60 p-4 rounded-xl border-l-4 border-red-600">
              <p className="text-zinc-200 font-sans text-sm sm:text-base leading-relaxed wrap-break-word whitespace-pre-line">
                {statViewed.description}
              </p>
            </div>
          </section>
        )}

      </div>

      {showHelp && !isMobile && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-red-500/50 bg-black/90 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:block"
        >
          [↑ / ↓ / ← / →] Sélectionner | [ESC] {showInfoPanel ? "Masquer détails" : "Quitter"}
        </div>
      )}
    </div>
  );
}

export default SocialDiagram;