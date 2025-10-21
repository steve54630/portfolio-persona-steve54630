"use client";

import { IStatus } from "@/types/status";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "../ui/hover-card";
import Link from "next/link";
import SocialDiagram from "../social";
import MenuButton from "../menu-button";
import useMouseActivity from "@/hooks/useMouse";

function StatusViewer({ stats }: { stats: IStatus }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [statOpen, setStatOpen] = useState<boolean>(false);
  const showHelp = useMouseActivity();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.matchMedia("(pointers: coarse)").matches || statOpen) return;

      if (e.key in ["ArrowUp", "ArrowDown", "Enter"]) {
        e.preventDefault();
      }

      const allButtons = Array.from(
        document.querySelectorAll("button[datatype=menu-button]")
      ) as HTMLButtonElement[];
      const currentIndex = allButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          const button =
            allButtons[
              (currentIndex - 1 + allButtons.length) % allButtons.length
            ];
          button.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          allButtons[(currentIndex + 1) % allButtons.length].focus();
          break;
        case "Escape":
          e.preventDefault();
          document.getElementById("back-button")?.focus();
          document.getElementById("back-button")?.click();
          break;
        case "Enter":
          e.preventDefault();
          (document.activeElement as HTMLButtonElement)?.click();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [statOpen]);

  return (
    <article className="relative min-h-screen max-w-screen flex flex-col sm:gap-20 sm:flex-row justify-center items-center">
      <Link className="sm:absolute mb-5 sm:mb-0 top-5 left-5" href="/menu">
        <button
          id="back-button"
          className="px-8 py-4 font-drunkenhour text-5xl text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:bg-red-600 hover:bg-red-600"
        >
          Retour
        </button>
      </Link>
      <img
        src="/images/avatar.png"
        className="mb-5 sm:mb-0 p-5 sm:p-0 sm:w-2/5"
        alt="Retournay Steve"
      />
      <section className="p-3 flex flex-col items-center sm:justify-center sm:gap-18"></section>
      {showHelp && <div className="absolute bottom-5 right-5 bg-black text-white px-3 py-2 rounded shadow-lg w-75 hidden sm:flex sm:opacity-100">
        Echap pour revenir en arrière, Utilisez les ↑ ↓ pour naviguer et Entree
        pour choisir
      </div>}
      <section className="flex flex-col justify-center items-center w-fit sm:mt-10">
        <header className="flex flex-col justify-center items-center sm:text-4xl w-3/4 bg-white/60 text-3xl ml-10 p-10 clip-dynamic">
          <h1 className="font-broken-home text-black text-4xl ">
            Retournay Steve
          </h1>
          <h1 className="font-serif clip-path text-3xl text-black p-7">
            <HoverCard>
              <HoverCardTrigger>
                Lv. <span className="font-broken-home">{stats.level} </span>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="font-sans text-xl text-center bg-white/50">
                  Mon age
                </p>
              </HoverCardContent>
            </HoverCard>
          </h1>
        </header>
        <dl className="flex flex-row gap-10 text-3xl m-5 sm:ml-10 p-5 bg-white">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex flex-col">
                <Progress
                  color="bg-green-500/50"
                  value={stats.hp}
                  max={stats.maxHp}
                />
                <h3>
                  <dt> HP : </dt>
                  <dd>
                    {stats.hp}/{stats.maxHp}
                  </dd>
                </h3>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="font-sans text-xl text-center bg-white/50">
                Le carburant vital avant le prochain bug critique : Encore
                debout, après 10 <i>npm run dev</i>
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex flex-col">
                <Progress
                  color="bg-blue-500/50"
                  value={stats.sp}
                  max={stats.maxSp}
                />
                <h3>
                  <dt> SP : </dt>
                  <dd>
                    {stats.sp}/{stats.maxSp}
                  </dd>
                </h3>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="font-sans text-xl text-center bg-white/50">
                Utilisé pour trouver mes idées de génie (ou pas): Toujours prêt
                à shipper une feature brillante !!
              </p>
            </HoverCardContent>
          </HoverCard>
        </dl>
        <nav className="flex flex-col my-10">
          <MenuButton
            title={"Weapon"}
            explanation={"Mon CV en ligne"}
            color={"hover:bg-blue-600 focus:bg-blue-600"}
            onClickEffect={() => window.open("https://tinyurl.com/cvofsteve")}
            type={"button"}
          />
          <MenuButton
            title={"Armor"}
            explanation={"Mon CV papier"}
            color={"hover:bg-red-600 focus:bg-red-600"}
            onClickEffect={() =>
              window.open(
                "https://drive.google.com/file/d/1TWww4slygpys7KzfSWN2dghks2mkQbGr/view?usp=drive_link"
              )
            }
            type={"button"}
          />
          <MenuButton
            title={"Socials"}
            explanation={"Comment je pense?"}
            color={"hover:bg-green-600 focus:bg-green-600"}
            onClickEffect={() => setStatOpen(!statOpen)}
            type={"button"}
          />
        </nav>
        {statOpen && (
          <SocialDiagram
            setOpen={setStatOpen}
            status={stats}
            isMobile={isMobile}
          />
        )}
      </section>
    </article>
  );
}

export default StatusViewer;
