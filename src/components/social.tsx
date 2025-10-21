"use client";

import { Axes } from "@/types/axes";
import { IStats } from "@/types/stats";
import { IStatus } from "@/types/status";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { ImCross } from "react-icons/im";

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
  const size = 700;
  const [statViewed, setStatViewed] = useState<IStats | null>(status.stats[0]);

  useEffect(() => {
    const stats: IStats[] = status.stats;
    const maxRadius = (size / 2) * 0.9;
    const centerX = size / 2;
    const centerY = size / 2;

    // Coordonnées du polygone
    const points = stats.map((stat, i) => {
      const angle = (i / stats.length) * 2 * Math.PI - Math.PI / 2;
      const r = (stat.value / 5) * maxRadius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      return { x: x + 20, y };
    });
    setPolygonPoints(points.map((p) => `${p.x},${p.y}`).join(" "));

    // Axes
    setAxes(
      stats.map((stat, i) => {
        const angle = (i / stats.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        const textAnchor = Math.cos(angle) > 0 ? "start" : "end";
        const dominantBaseline = Math.sin(angle) > 0 ? "hanging" : "middle";
        return { x: x + 20, y, stat, textAnchor, dominantBaseline };
      })
    );
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.matchMedia("(pointers: coarse)").matches) return;

      if (e.key in ["ArrowUp", "ArrowDown", "Enter", "Escape"]) {
        e.preventDefault();
      }

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=social]")
      ) as HTMLButtonElement[];
      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

      switch (e.key) {
        case "ArrowUp":
          const button =
            allButtons[
              (currentIndex - 1 + allButtons.length) % allButtons.length
            ];
          button.focus();
          break;
        case "ArrowDown":
          allButtons[(currentIndex + 1) % allButtons.length].focus();
          break;
        case "Escape":
          setOpen(false);
        case "Enter":
          (document.activeElement as HTMLButtonElement)?.click();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpen]);

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 min-h-screen overflow-y-hidden max-w-screen flex flex-col sm:flex-row items-center justify-center z-50">
      <svg
        viewBox={`0 0 ${size + 50} ${size}`}
        width={isMobile ? "100%" : "50%"}
        className="block"
      >
        {/* Polygone de stats */}
        <polygon
          points={polygonPoints}
          fill="rgba(255,0,0,0.5)"
          stroke="red"
          strokeWidth="2"
        />

        {/* Axes */}
        {axes.map((axis, i) => (
          <g key={i}>
            <line
              x1={size / 2}
              y1={size / 2}
              x2={axis.x}
              y2={axis.y}
              stroke="white"
              strokeWidth={1}
            />
            <foreignObject x={axis.x} y={axis.y} width="150" height="150">
              <button
                datatype="social"
                className="font-broken-home text-2xl p-1 text-white bg-black focus:bg-white focus:text-black hover:bg-white hover:text-black"
                onClick={() => setStatViewed(axis.stat)}
              >
                {axis.stat.name}
              </button>
            </foreignObject>
          </g>
        ))}
      </svg>
      <div className="absolute font-serif top-0 left-0 bg-black text-white px-3 py-2 rounded shadow-lg w-75 hidden sm:flex sm:opacity-100">
        Echap pour revenir en arrière, Utilisez les ↑ ↓ pour naviguer et Entree
        pour choisir
      </div>
      <section className="flex flex-col bg-white sm:ml-50 sm:w-100">
        <h5 className="font-drunkenhour sm:text-5xl text-3xl p-5 text-black w-fit">
          {statViewed?.name}{" "}
          <span className="font-broken-home text-2xl">
            {statViewed?.value}/5
          </span>
        </h5>
        <div className="flex flex-col py-3 px-5">
          <Progress color="bg-red-500/50" value={statViewed?.exp} max={100} />
          <h3>
            <dt> Exp vers le niveau suivant : </dt>
            <dd>{statViewed?.exp}/100</dd>
          </h3>
        </div>
        <p className="text-3xs p-5 font-sans h-fit">
          {statViewed?.description}
        </p>
        <button
          className="absolute top-5 right-5 text-5xl text-red-600"
          onClick={() => setOpen(false)}
        >
          <ImCross />
        </button>
      </section>
    </div>
  );
}

export default SocialDiagram;
