import { ICategory } from "./category";

export type ISkill = {
  id: string;
  name: string;
  category: ICategory;
};

export type SkillDto = Omit<ISkill, "category"> & { categoryId: string };
