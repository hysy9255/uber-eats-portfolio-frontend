import type { UpdateOperatingHoursDTO } from "./UpdateOperatingHours.dto";
import type { UpdateRestaurantAddressDTO } from "./UpdateRestaurantAddress.dto";
import type { UpdateRestaurantGeneralInfoDTO } from "./UpdateRestaurantGeneralInfo.dto";

export class UpdateRestaurantDTO {
  generalInfo?: UpdateRestaurantGeneralInfoDTO;
  address?: UpdateRestaurantAddressDTO;
  operatingHours?: UpdateOperatingHoursDTO;

  constructor(init: {
    generalInfo?: UpdateRestaurantGeneralInfoDTO;
    address?: UpdateRestaurantAddressDTO;
    operatingHours?: UpdateOperatingHoursDTO;
  }) {
    this.generalInfo = init.generalInfo;
    this.address = init.address;
    this.operatingHours = init.operatingHours;
  }
}
