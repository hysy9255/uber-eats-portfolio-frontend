import { useState } from "react";
import EditAddress from "./EditAddress";
import AddressList from "./AddressList";
import type { GetDeliveryAddressDTO } from "../../dto/GetDeliveryAddress.dto";
import AddAddress from "./AddAddress";
import { AddressPanelType } from "../../constants/AddressPanelTypeEnums";

interface AddressPopUpProps {
  closeAddressPopUp: () => void;
}

const AddressPopUp: React.FC<AddressPopUpProps> = ({ closeAddressPopUp }) => {
  const [addressToEdit, setAddressToEdit] = useState<GetDeliveryAddressDTO>();
  const [panel, setPanel] = useState<
    AddressPanelType.List | AddressPanelType.Add | AddressPanelType.Edit
  >(AddressPanelType.List);

  const addressListOpen = panel === AddressPanelType.List;
  const addAddressOpen = panel === AddressPanelType.Add;
  const editAddressOpen = panel === AddressPanelType.Edit;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/50" />
      {addressListOpen && (
        <AddressList
          handleClickEditAddress={(targetAddress: GetDeliveryAddressDTO) => {
            setAddressToEdit(targetAddress);
            setPanel(AddressPanelType.Edit);
          }}
          closeAddressPopUp={closeAddressPopUp}
          handleClickAdd={() => setPanel(AddressPanelType.Add)}
        />
      )}
      {addAddressOpen && (
        <AddAddress
          closeAddAddress={() => {
            setPanel(AddressPanelType.List);
          }}
        />
      )}
      {editAddressOpen && (
        <EditAddress
          closePopUp={closeAddressPopUp}
          targetAddress={addressToEdit}
        />
      )}
    </div>
  );
};

export default AddressPopUp;
