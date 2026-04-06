import type { DishDTO } from "./Dish.dto";
import type { OperatingHoursDTO } from "./restaurant/OperatingHours.dto";
import type { RestaurantDTO } from "./restaurant/Restaurant.dto";
import type { RestaurantAddressDTO } from "./restaurant/RestaurantAddress.dto";

export type GetRestaurantPageViewDTO = {
  restaurantSummary: {
    generalInfo: RestaurantDTO;
    operatingHours: OperatingHoursDTO;
    address: RestaurantAddressDTO;
  };
  dishes: DishDTO[];
};
