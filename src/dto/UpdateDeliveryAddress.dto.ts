import type { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import type { EditDeliveryAddressForm } from "../formDataTypes/deliveryAddress/editDeliveryAddressForm.type";

export class UpdateDeliveryAddressDTO {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;

  constructor(deliveryAddressId: string, data: EditDeliveryAddressForm) {
    this.deliveryAddressId = deliveryAddressId;
    this.streetAddress = data.streetAddress;
    this.apt = data.apt;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.alias = data.alias;
    this.customAlias = data.customAlias;
  }
}
