import { ISkill } from "./skill";

export type IExperience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: ISkill[];
};

export type ExperienceDto = Omit<IExperience, "skills"> & {
  skillIds: string[];
};
