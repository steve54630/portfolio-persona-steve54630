import { CarouselApi } from "@/components/ui/carousel";
import { ICategory } from "./category";
import { IExperience } from "./experience";
import { ILink } from "./link";
import { IPersona } from "./persona";
import { ISkill } from "./skill";
import { ButtonHTMLAttributes } from "react";

export interface MenuButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  explanation: string;
  url?: string;
  color: string;
  type : "button" | "link"
  onClickEffect?: () => void
  /** Remplace la taille par defaut du libelle (classes Tailwind text-*) */
  titleSizeClassName?: string
}

export interface PersonaProps extends React.HTMLAttributes<HTMLDivElement> {
  persona: IPersona;
}

export type CarouselProps = PersonaProps & {
  setApi?: (api: CarouselApi) => void
}

export type ResistsProps = PersonaProps & {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface PersonaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  persona: IPersona;
}

export interface ConfidantBookProps {
  confidants: ILink[];
}

export interface HistoryClientProps {
  experiences: IExperience[];
}

export interface SkillsPageProps {
  skills: ISkill[];
  categories: ICategory[];
}

export interface SkillUsagePanelProps {
  skill: ISkill;
  onClose: () => void;
}

