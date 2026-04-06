import type { UpdateOperatingHoursDTO } from "./UpdateOperatingHours.dto";
import type { UpdateRestaurantAddressDTO } from "./UpdateRestaurantAddress.dto";
import type { UpdateRestaurantGeneralInfoDTO } from "./UpdateRestaurantGeneralInfo.dto";

export type UpdateRestaurantDTO = {
  generalInfo?: UpdateRestaurantGeneralInfoDTO;
  address?: UpdateRestaurantAddressDTO;
  operatingHours?: UpdateOperatingHoursDTO;
};
