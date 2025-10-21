import { ICategory } from "../types/category";
import categoriesData from "../data/category.json";

export class CategoryService {
  private categories: ICategory[];
  constructor() {
    this.categories = categoriesData;
  }

  getCategories(): ICategory[] {
    return this.categories;
  }

  findCategoryById(id: string): ICategory {
    return this.categories.find((category: ICategory) => category.id === id)!;
  }
}
