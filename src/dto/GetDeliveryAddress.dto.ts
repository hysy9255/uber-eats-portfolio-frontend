import type { AddressAliasType } from "../constants/AddressAliasTypeEnums";

export type GetDeliveryAddressDTO = {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;
  isDefault: boolean;
};
