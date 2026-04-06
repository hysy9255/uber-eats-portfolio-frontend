import { HomeIcon } from "../components/Icons/RegisterAddressIcons/HomeIcon";
import { OfficeIcon } from "../components/Icons/RegisterAddressIcons/OfficeIcon";
import { OtherIcon } from "../components/Icons/RegisterAddressIcons/OtherIcon";
import { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import type { GetDeliveryAddressDTO } from "../dto/GetDeliveryAddress.dto";

export const getAddressIcon = (
  address?: GetDeliveryAddressDTO,
  selected?: string
) => {
  switch (address?.alias) {
    case AddressAliasType.home:
      return (
        <HomeIcon
          size={22}
          className={`${
            address.deliveryAddressId === selected && "text-sky-500"
          } `}
          strokeWidth={address.deliveryAddressId === selected ? 2 : 1}
        />
      );
    case AddressAliasType.work:
      return (
        <OfficeIcon
          size={22}
          className={`${
            address.deliveryAddressId === selected && "text-sky-500"
          } `}
          strokeWidth={address.deliveryAddressId === selected ? 2 : 1}
        />
      );
    case AddressAliasType.other:
      return (
        <OtherIcon
          size={22}
          className={`${
            address.deliveryAddressId === selected && "text-sky-500"
          } `}
          strokeWidth={address.deliveryAddressId === selected ? 2 : 1}
        />
      );
    default:
      throw new Error(`Unknown type: ${address?.alias}`);
  }
};
