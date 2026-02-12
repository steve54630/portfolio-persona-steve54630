import { ISkill, SkillDto } from "@/types/skill";
import skillsData from "../data/skills.json";
import { CategoryService } from "./category.service";

export class SkillService {
  private skills: ISkill[];

  constructor(private categoryService: CategoryService) {
    this.skills = skillsData.map((skill: SkillDto) => {
      return {
        ...skill,
        category: this.categoryService.findCategoryById(skill.categoryId),
      };
    });
  }

  public getSkills(): ISkill[] {
    return this.skills;
  }

  /**
   * Trouver un skill par son id
   * @param id ID du skill à trouver
   * @returns skill demandé
   */
  public findSkillById(id: string): ISkill {
    const skill = this.skills.find((skill) => skill.id === id);
    if (!skill) {
      console.log("🚀 ~ SkillService ~ findSkillById ~ id:", id);
      throw new Error("Skill not found");
    }
    return skill;
  }
}
