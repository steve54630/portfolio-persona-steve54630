import { ArcanaService } from "@/service/arcana.service";
import { CategoryService } from "@/service/category.service";
import { LinksService } from "@/service/links.service";
import { PersonaService } from "@/service/persona.service";
import { SkillService } from "@/service/skill.service";
import { StatusService } from "@/service/status.service";

export const categoryService = new CategoryService();
export const skillService = new SkillService(categoryService);
export const arcanaService = new ArcanaService();
export const personaService = new PersonaService(skillService, arcanaService);
export const linksService = new LinksService();
export const statusService = new StatusService();

