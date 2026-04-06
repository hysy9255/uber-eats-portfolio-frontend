import type { AddressAliasType } from "../../constants/AddressAliasTypeEnums";

export interface AddDeliveryAddressForm {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;
}
