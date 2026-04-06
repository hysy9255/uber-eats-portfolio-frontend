import type { CreateDishDTO } from "../dtos/dish/CreateDish.dto";
import type { CreateOperatingHoursDTO } from "./CreateOperatingHours.dto";
import type { CreateRestaurantAddressDTO } from "./CreateRestaurantAddress.dto";
import type { CreateRestaurantGeneralInfoDTO } from "./CreateRestaurantGeneralInfo.dto";

export type CreateRestaurantDTO = {
  restaurantSummary: {
    generalInfo: CreateRestaurantGeneralInfoDTO;
    address: CreateRestaurantAddressDTO;
    operatingHours: CreateOperatingHoursDTO;
  };
  dishes?: CreateDishDTO[];
};
