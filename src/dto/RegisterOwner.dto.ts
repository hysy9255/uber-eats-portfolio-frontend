import type { CreateRestaurantDTO } from "./CreateRestaurant.dto";
import type { CreateUserDTO } from "./CreateUser.dto";

export type RegisterOwnerDTO = {
  user: CreateUserDTO;
  restaurant: CreateRestaurantDTO;
};
