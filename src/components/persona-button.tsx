import { IPersona } from "@/types/persona";
import Link from "next/link";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface PersonaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  persona: IPersona;
}

const PersonaButton = forwardRef<HTMLButtonElement, PersonaButtonProps>(
  ({ persona, ...props }: { persona: IPersona }, ref) => {
    return (
      <Link href={`/persona/${persona.id}`} {...props}>
        <button className="group flex justify-center items-center flex-row mx-10 w-3/4 text-2xl sm:text-3xl">
          <p className="rounded-2xl py-2 px-5 font-broken-home bg-red-600/70 text-white group-focus:text-black group-focus:bg-blue-600 group-hover:text-black group-hover:bg-blue-600">
            {persona.arcana.name}
          </p>
          <p className="rounded-2xl py-2 px-5 w-full font-sans text-white group-hover:text-black group-hover:bg-white group-focus:text-black group-focus:bg-white">
            {persona.title}
          </p>
        </button>
      </Link>
    );
  }
);

PersonaButton.displayName = "PersonaButton";
export default PersonaButton;
