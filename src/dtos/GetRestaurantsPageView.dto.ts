import type { OperatingHoursDTO } from "./restaurant/OperatingHours.dto";
import type { RestaurantDTO } from "./restaurant/Restaurant.dto";
import type { RestaurantAddressDTO } from "./restaurant/RestaurantAddress.dto";

export type GetRestaurantsPageViewDTO = {
  restaurantSummaries: {
    generalInfo: RestaurantDTO;
    address: RestaurantAddressDTO;
    operatingHours: OperatingHoursDTO;
  }[];
};
