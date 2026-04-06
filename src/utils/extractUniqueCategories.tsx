// import type { DishCategory } from "../constants/DishCategoryEnums";

export const extractUniqueCategories = (allCategories: string[]): string[] => {
  return [...new Set(allCategories)];
};
