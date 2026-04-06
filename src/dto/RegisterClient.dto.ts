import type { CreateDeliveryAddressDTO } from "./CreateDeliveryAddress.dto";
import type { CreateUserDTO } from "./CreateUser.dto";

export type RegisterClientDTO = {
  user: CreateUserDTO;
  deliveryInfo: CreateDeliveryAddressDTO;
};
