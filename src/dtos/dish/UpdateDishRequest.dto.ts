export class UpdateDishDTO {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  dishImgUrl?: string;

  constructor(init: {
    name?: string;
    price?: number;
    category?: string;
    description?: string;
    dishImgUrl?: string;
  }) {
    this.name = init.name;
    this.price = init.price;
    this.category = init.category;
    this.description = init.description;
    this.dishImgUrl = init.dishImgUrl;
  }
}
