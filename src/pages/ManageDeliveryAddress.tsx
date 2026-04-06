import { useEffect, useState } from "react";
import type { GetDeliveryAddressDTO } from "../dto/GetDeliveryAddress.dto";
import { deleteDeliveryAddress } from "../api/clientApi";
import { getToken } from "../auth";
import { sortDeliveryAddressOrder } from "../utils/sortDeliveryAddressOrder";
import { PencilIcon } from "../components/Buttons/IconBased/PencilButton/PencilIcon";
import { getAddressIcon } from "../utils/getAddressIcon";
import { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import InfoPageIntroSection from "../components/InfoPageIntroSection";
import { profileDescription1 } from "../constants/Description";
import AddAddress from "../components/PopUps/AddAddress";
import EditAddress from "../components/PopUps/EditAddress";
import DeleteThisAddressPopup from "../components/PopUps/DeleteThisAddressPopup";
import type { DeleteDeliveryAddressDTO } from "../dto/DeleteDeliveryAddress.dto";
import AddressErrorPopUp from "../components/PopUps/AddressErrorPopUp";
import TrashCanIcon from "../components/Icons/TrashCanIcon/TrashCanIcon";
import { useAddress } from "../ReactContext/address/UseAddress";

type ModalType = "add" | "edit" | "delete" | "error" | null;

const ManageDeliveryAddress = () => {
  const [modal, setModal] = useState<ModalType>(null);

  const [addressToEdit, setAddressToEdit] = useState<GetDeliveryAddressDTO>();
  const [addressToDelete, setAddressToDelete] =
    useState<GetDeliveryAddressDTO>();
  const [addressError, setAddressError] = useState<unknown>();

  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }

  const {
    loadMyDeliveryAddresses,
    addressList,
    address: defaultAddress,
  } = useAddress();

  useEffect(() => {
    loadMyDeliveryAddresses();
  }, [loadMyDeliveryAddresses]);

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    const payload: DeleteDeliveryAddressDTO = {
      deliveryAddressId: addressToDelete.deliveryAddressId,
    };
    try {
      await deleteDeliveryAddress(token, payload);
      loadMyDeliveryAddresses();
      setModal(null);
    } catch (error) {
      setAddressError(error);
      setModal("error");
    }
  };

  return (
    <main className="p-2">
      {modal && (
        <>
          {modal === "add" && (
            <AddAddress closeAddAddress={() => setModal(null)} />
          )}

          {modal === "edit" && (
            <EditAddress
              closePopUp={() => setModal(null)}
              targetAddress={addressToEdit}
            />
          )}

          {modal === "delete" && (
            <DeleteThisAddressPopup
              closePopUp={() => setModal(null)}
              handleDeleteAddress={handleDeleteAddress}
            />
          )}

          {modal === "error" && (
            <AddressErrorPopUp
              errorMessage={addressError}
              closePopUp={() => setModal(null)}
            />
          )}
        </>
      )}
      <InfoPageIntroSection
        mainHeader="Manage Delivery Address"
        mainDesc="Add, edit, and delete your delivery addresses"
        secondHeader="Your address info in Uber Eats services"
        secondDesc={profileDescription1}
      />
      <div className="my-3">
        <button
          type="button"
          onClick={() => {
            setModal("add");
          }}
          className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
        >
          + Add Address
        </button>
      </div>

      <div className="border-2 border-black/10 rounded-md py-6 px-10">
        {sortDeliveryAddressOrder(addressList)?.map((address, index) => (
          <div
            key={index}
            className={`py-4 grid grid-cols-[5fr_auto] items-center ${
              defaultAddress?.deliveryAddressId === address.deliveryAddressId &&
              "bg-sky-400/20"
            }`}
          >
            <div className="grid grid-cols-[50px_4fr]">
              <div className="flex items-center justify-center">
                {getAddressIcon(address)}
              </div>

              <div className="flex flex-col">
                <div className="text-black font-semibold">
                  {address.alias === AddressAliasType.other
                    ? address.customAlias
                    : address.alias}
                </div>
                <div className="text-gray-600 line-clamp-2">{`${address.city} ${address.state} ${address.streetAddress} ${address.apt} ${address.zip}`}</div>
              </div>
            </div>

            <div className="gap-x-5 flex px-3">
              <div
                className="hover:cursor-pointer"
                onClick={() => {
                  setAddressToEdit(address);
                  setModal("edit");
                }}
              >
                <PencilIcon strokeWidth={1} className={"w-5 h-5"} />
              </div>
              <div>
                <TrashCanIcon
                  onClick={() => {
                    setAddressToDelete(address);
                    setModal("delete");
                  }}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ManageDeliveryAddress;
