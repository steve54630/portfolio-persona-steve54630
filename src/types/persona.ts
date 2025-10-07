import { IArcana } from "./arcana";
import { ISkill } from "./skill";

export type IPersona = {
  id: string;
  title: string;
  description: string;
  image: string[];
  arcana: IArcana;
  skills: ISkill[];
  resistances: string[];
  weaknesses: string[];
  neutral: string[];
  link: string;
};

export type PersonaDto = Omit<IPersona, "arcana" | "skills"> & {
  arcana: string;
  skills: string[];
};
