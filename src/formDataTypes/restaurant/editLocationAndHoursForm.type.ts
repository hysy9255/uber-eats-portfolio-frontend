import type { OperatingHoursDTO } from "../../dtos/restaurant/OperatingHours.dto";
import type { RestaurantAddressDTO } from "../../dtos/restaurant/RestaurantAddress.dto";

export type EditLocationAndOperatingHoursForm = {
  address?: Partial<RestaurantAddressDTO>;
  operatingHours?: OperatingHoursDTO;
};
