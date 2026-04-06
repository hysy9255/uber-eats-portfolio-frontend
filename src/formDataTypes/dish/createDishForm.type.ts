export type CreateDishForm = {
  name: string;
  category: string;
  price: number | null;
  description: string;
  dishImgUrl?: string;
};
