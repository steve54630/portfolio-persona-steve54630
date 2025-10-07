import { PersonaProps } from "@/types/props";
import React, { forwardRef } from "react";

const SkillsTab = forwardRef<HTMLDivElement, PersonaProps>(
  ({ persona }: PersonaProps, ref) => {
    return (
      <section
        ref={ref}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4"
      >
        {persona.skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg py-6 sw:min-w-[250px] h-fit text-center text-white shadow-lg"
          >
            <p className="text-1xl font-medium">
              <span className="text-3xl block mb-2">
                {skill.category?.icon}
              </span>
              {skill.name}
            </p>
          </div>
        ))}
      </section>
    );
  }
);

export default SkillsTab;
