import { ExperienceDto, IExperience } from "@/types/experience";
import experiencesData from "../data/experiences.json";
import { SkillService } from "./skill.service";

export class ExperienceService {
  private experiences: IExperience[];

  constructor(private skillService: SkillService) {
    this.experiences = experiencesData.map(
      ({ skillIds, ...experience }: ExperienceDto) => {
        return {
          ...experience,
          skills: skillIds.map((skillId: string) =>
            this.skillService.findSkillById(skillId)
          ),
        };
      }
    );
  }

  /**
   * Récupérer le parcours, de l'expérience la plus récente à la plus ancienne
   * @returns la liste des expériences
   */
  public getExperiences(): IExperience[] {
    return this.experiences;
  }

  /**
   * Filtrer les expériences faisant appel à une compétence
   * @param skillId ID de la compétence recherchée
   * @returns les expériences concernées
   */
  public filterExperiencesBySkill(skillId: string): IExperience[] {
    return this.experiences.filter((experience) =>
      experience.skills.some((skill) => skill.id === skillId)
    );
  }

  /**
   * Trouver une expérience par son id
   * @param id ID de l'expérience à trouver
   * @returns expérience demandée
   */
  public findExperienceById(id: string): IExperience {
    const experience = this.experiences.find(
      (experience) => experience.id === id
    );
    if (!experience) throw new Error("Experience not found");
    return experience;
  }
}
