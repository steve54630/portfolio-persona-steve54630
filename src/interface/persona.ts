import { IPersona } from "@/types/persona";
import { ButtonHTMLAttributes } from "react";

export interface PersonaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  persona: IPersona;
}