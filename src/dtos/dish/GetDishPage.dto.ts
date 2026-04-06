import type { DishDTO } from "../Dish.dto";

export type GetDishPageDTO = {
  restaurantName: string;
  restaurantLogo?: string;
  dish: DishDTO;
  dishes: DishDTO[];
};
