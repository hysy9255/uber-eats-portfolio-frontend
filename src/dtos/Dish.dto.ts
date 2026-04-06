export type DishDTO = {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl?: string;
  availability: boolean;
};
