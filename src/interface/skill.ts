import { ICategory } from "@/types/category";
import { ISkill } from "@/types/skill";

export interface SkillsPageProps {
  skills: ISkill[];
  categories: ICategory[];
}


export interface SkillUsagePanelProps {
  skill: ISkill;
  onClose: () => void;
}