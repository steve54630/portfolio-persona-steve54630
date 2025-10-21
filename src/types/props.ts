import { CarouselApi } from "@/components/ui/carousel";
import { IPersona } from "./persona";

export interface MenuButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  explanation: string;
  url?: string;
  color: string;
  type : "button" | "link"
  onClickEffect?: () => void
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

