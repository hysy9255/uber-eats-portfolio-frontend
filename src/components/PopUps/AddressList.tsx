import { Fragment } from "react/jsx-runtime";
import { getAddressIcon } from "../../utils/getAddressIcon";
import { sortDeliveryAddressOrder } from "../../utils/sortDeliveryAddressOrder";
import { PencilIcon } from "../Buttons/IconBased/PencilButton/PencilIcon";
import { setDefaultAddress } from "../../api/clientApi";
import { getToken } from "../../auth";
import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import { useEffect, useState } from "react";
import type { GetDeliveryAddressDTO } from "../../dto/GetDeliveryAddress.dto";
import type { SetDefaultDeliveryAddressDTO } from "../../dto/SetDefaultDeliveryAddress.dto";
import { useAddress } from "../../ReactContext/address/UseAddress";

interface AddressListProps {
  handleClickEditAddress: (targetAddress: GetDeliveryAddressDTO) => void;
  closeAddressPopUp: () => void;
  // refreshAddressData: () => void;
  // addressList?: GetDeliveryAddressDTO[];
  handleClickAdd: () => void;
}

const AddressList: React.FC<AddressListProps> = ({
  handleClickEditAddress,
  closeAddressPopUp,
  // refreshAddressData,
  // addressList,
  handleClickAdd,
}) => {
  const [selected, setSelected] = useState<GetDeliveryAddressDTO>();
  const { loadMyDeliveryAddresses: refreshAddressData, addressList } =
    useAddress();

  const token = getToken();
  if (!token) throw new Error("Token Not Found");

  useEffect(() => {
    setSelected(addressList?.find((address) => address.isDefault === true));
  }, [addressList]);

  const handleSave = async () => {
    if (!selected) return;
    const payload: SetDefaultDeliveryAddressDTO = {
      deliveryAddressId: selected.deliveryAddressId,
    };
    await setDefaultAddress(token, payload);
    refreshAddressData();
    closeAddressPopUp();
  };

  return (
    <Fragment>
      <div className="relative mx-4 w-full max-w-4xl rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/10 h-[500px]">
        <h2 className="text-lg font-semibold pb-3">Manage Delivery Address</h2>
        <div className="hover:cursor-pointer max-h-80 overflow-y-auto">
          {sortDeliveryAddressOrder(addressList)?.map((address, index) => (
            <div
              key={index}
              className={`h-20 grid grid-cols-[5fr_auto] ${
                selected?.deliveryAddressId === address.deliveryAddressId &&
                "bg-sky-400/20"
              } items-center`}
              onClick={() => {
                setSelected(address);
              }}
            >
              <div className="grid grid-cols-[50px_4fr]">
                <div className="flex items-center justify-center">
                  {getAddressIcon(address, selected?.deliveryAddressId)}
                </div>

                <div className="flex flex-col">
                  <div className="text-black font-semibold">
                    {address.alias === AddressAliasType.other
                      ? address.customAlias
                      : address.alias}
                  </div>
                  <div className="text-gray-600">{`${address.city} ${address.state} ${address.streetAddress} ${address.apt} ${address.zip}`}</div>
                </div>
              </div>

              <div
                className="flex items-center justify-center px-4"
                onClick={() => handleClickEditAddress(address)}
              >
                <PencilIcon strokeWidth={1} className={"w-5 h-5"} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleClickAdd}
            className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
          >
            + Add Address
          </button>
          <div className="flex gap-2 ">
            <button
              type="button"
              onClick={closeAddressPopUp}
              className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-sky-600 ring-1 ring-sky-200 hover:bg-sky-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddressList;
