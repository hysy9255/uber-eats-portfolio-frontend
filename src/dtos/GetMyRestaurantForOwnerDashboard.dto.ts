import type { OperatingHoursDTO } from "./restaurant/OperatingHours.dto";
import type { RestaurantDTO } from "./restaurant/Restaurant.dto";
import type { RestaurantAddressDTO } from "./restaurant/RestaurantAddress.dto";

export type GetMyRestaurantForOwnerDashboardDTO = {
  restaurantSummary: {
    generalInfo: RestaurantDTO;
    operatingHours: OperatingHoursDTO;
    address: RestaurantAddressDTO;
  };
};
