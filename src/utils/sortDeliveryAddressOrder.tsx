import type { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import type { GetDeliveryAddressDTO } from "../dto/GetDeliveryAddress.dto";

export const sortDeliveryAddressOrder = (
  addressList?: GetDeliveryAddressDTO[]
) => {
  if (!addressList) return;

  const aliasPriority: Record<AddressAliasType, number> = {
    home: 0,
    work: 1,
    other: 2,
  };
  const sorted = [...addressList].sort((a, b) => {
    if (a.isDefault !== b.isDefault) {
      return Number(b.isDefault) - Number(a.isDefault);
    }
    return (aliasPriority[a.alias] ?? 999) - (aliasPriority[b.alias] ?? 999);
  });
  return sorted;
};
