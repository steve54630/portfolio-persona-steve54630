import { IPersona, PersonaDto } from "@/types/persona";
import personasData from "../data/persona.json";
import { SkillService } from "./skill.service";
import { ArcanaService } from "./arcana.service";

export class PersonaService {
  private personas: IPersona[];

  constructor(
    private skillService: SkillService,
    private arcanaService: ArcanaService
  ) {
    this.personas = personasData.map((persona: PersonaDto) => {
      return {
        ...persona,
        arcana: this.arcanaService.getArcanaById(persona.arcana),
        skills: persona.skills.map((skill: string) => {
          return this.skillService.findSkillById(skill);
        }),
      };
    });
  }

  getPersonas(): IPersona[] {
    return this.personas;
  }

  public filterPersonasByArcana(arcanaId: string): IPersona[] {
    return this.personas.filter((persona) => persona.arcana.id === arcanaId);
  }

  public findPersonaById(id: string): IPersona {
    const persona = this.personas.find((persona) => persona.id === id);
    if (!persona) throw new Error("Persona not found");
    return persona;
  }

  public filterPersonasBySkill(skillName: string): IPersona[] {
    return this.personas.filter((persona) =>
      persona.skills.some((skill) => skill.id === skillName)
    );
  }
}
