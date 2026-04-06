import { Fragment, useState } from "react";
import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import { getAddressIcon } from "../../utils/getAddressIcon";
import RightChevron from "../Icons/RightChevron";
import AddressPopUp from "../PopUps/AddressPopUp";
import { useAddress } from "../../ReactContext/address/UseAddress";

const AddressCard = () => {
  const [addressPopUpOpen, setAddressPopUpOpen] = useState<boolean>(false);
  const { address } = useAddress();

  return (
    <Fragment>
      {addressPopUpOpen && (
        <AddressPopUp closeAddressPopUp={() => setAddressPopUpOpen(false)} />
      )}
      <div className="bg-white grid grid-cols-[auto_6fr_1fr] text-sm font-medium relative rounded-md border-2 border-gray-200">
        <div className="flex flex-col items-center justify-center p-3">
          {address && getAddressIcon(address)}
          <div className="text-xs">
            {address?.alias === AddressAliasType.other
              ? address.customAlias
              : address?.alias}
          </div>
        </div>
        <div className="py-2 flex items-center justify-center">
          <p className="line-clamp-2">{`${address?.city} ${address?.state} ${address?.streetAddress} ${address?.apt} ${address?.zip}`}</p>
        </div>

        <div
          onClick={() => setAddressPopUpOpen(true)}
          className="flex items-center justify-center hover:cursor-pointer"
        >
          <RightChevron />
        </div>
      </div>
    </Fragment>
  );
};

export default AddressCard;
