import { createContext } from "react";
import type { GetDeliveryAddressDTO } from "../../dto/GetDeliveryAddress.dto";

type AddressContextValue = {
  addressList?: GetDeliveryAddressDTO[];
  address?: GetDeliveryAddressDTO;
  loadMyDeliveryAddresses: () => Promise<void>;
};

export const AddressContext = createContext<AddressContextValue | null>(null);
