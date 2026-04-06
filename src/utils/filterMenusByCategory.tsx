import { DishCategory } from "../constants/DishCategoryEnums";
import type { DishDTO } from "../dtos/Dish.dto";

export const filterMenussByCategory = (menusData: DishDTO[]) => {
  return {
    [DishCategory.Appetizers]: menusData.filter(
      (menu) => menu.category === DishCategory.Appetizers
    ),
    [DishCategory.Mains]: menusData.filter(
      (menu) => menu.category === DishCategory.Mains
    ),
    [DishCategory.Desserts]: menusData.filter(
      (menu) => menu.category === DishCategory.Desserts
    ),
    [DishCategory.Drinks]: menusData.filter(
      (menu) => menu.category === DishCategory.Drinks
    ),
  };
};
