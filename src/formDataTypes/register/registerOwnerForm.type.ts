import type { CreateRestaurantDTO } from "../../dto/CreateRestaurant.dto";
import type { CreateUserDTO } from "../../dto/CreateUser.dto";

export type RegisterOwnerForm = {
  user: CreateUserDTO;
  restaurant: CreateRestaurantDTO;
};
