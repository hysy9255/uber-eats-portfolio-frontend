import type { AddressAliasType } from "../constants/AddressAliasTypeEnums";

export type CreateDeliveryAddressDTO = {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  alias: AddressAliasType;
  customAlias?: string;
};
