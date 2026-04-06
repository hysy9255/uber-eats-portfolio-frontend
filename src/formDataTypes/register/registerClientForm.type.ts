import type { CreateDeliveryAddressDTO } from "../../dto/CreateDeliveryAddress.dto";
import type { CreateUserDTO } from "../../dto/CreateUser.dto";

export type RegisterClientForm = {
  user: CreateUserDTO;
  deliveryInfo: CreateDeliveryAddressDTO;
};
