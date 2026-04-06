import { useForm } from "react-hook-form";
import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import { customInputCss } from "../../constants/CustomInputCss";
import AddressAliasButton from "../Buttons/AddressAliasButton";
import EmbedMapIframe from "../EmbedMapIframe";
import { HomeIcon } from "../Icons/RegisterAddressIcons/HomeIcon";
import { OfficeIcon } from "../Icons/RegisterAddressIcons/OfficeIcon";
import { OtherIcon } from "../Icons/RegisterAddressIcons/OtherIcon";
import { useEffect, useState } from "react";
import type { EditDeliveryAddressForm } from "../../formDataTypes/deliveryAddress/editDeliveryAddressForm.type";
import type { GetDeliveryAddressDTO } from "../../dto/GetDeliveryAddress.dto";
import type { UpdateDeliveryAddressDTO } from "../../dto/UpdateDeliveryAddress.dto";
import { getToken } from "../../auth";
import { updateDeliveryAddress } from "../../api/clientApi";
import { useAddress } from "../../ReactContext/address/UseAddress";

interface EditAddressPopUpProps {
  closePopUp: () => void;
  targetAddress?: GetDeliveryAddressDTO;
}

const AddressAliasButtonConfigs = [
  {
    type: AddressAliasType.home,
    icon: HomeIcon,
  },
  {
    type: AddressAliasType.work,
    icon: OfficeIcon,
  },
  {
    type: AddressAliasType.other,
    icon: OtherIcon,
  },
];

const EditAddress: React.FC<EditAddressPopUpProps> = ({
  closePopUp,
  targetAddress,
}) => {
  const [alias, setAlias] = useState<AddressAliasType>();
  const { loadMyDeliveryAddresses: refreshAddressData } = useAddress();
  const { register, setValue, reset, handleSubmit, formState } =
    useForm<EditDeliveryAddressForm>({
      mode: "onSubmit",
    });

  const token = getToken();
  if (!token) throw new Error("Token not found");

  useEffect(() => {
    reset({ ...targetAddress });
    setAlias(targetAddress?.alias);
  }, [targetAddress, reset]);

  const editDeliveryAddressSubmit = async (data: EditDeliveryAddressForm) => {
    if (!targetAddress) return;
    const payload: UpdateDeliveryAddressDTO = {
      deliveryAddressId: targetAddress?.deliveryAddressId,
      ...data,
    };
    await updateDeliveryAddress(token, payload);
    refreshAddressData();
    closePopUp();
  };

  return (
    <div className="fixed inset-0 z-400 bg-black/50 flex items-center justify-center">
      <div className="z-500 max-w-4xl rounded-2xl bg-white p-10 ring-1 ring-black/10 ">
        <h2 className="text-lg font-semibold pb-3">Edit Address</h2>
        <div className="grid grid-cols-1 min-[920px]:grid-cols-2 gap-5">
          {targetAddress && (
            <div className="border border-gray-300 rounded-md">
              <EmbedMapIframe
                address={`${targetAddress?.streetAddress}, ${targetAddress?.apt}, ${targetAddress?.city}, ${targetAddress?.state}, ${targetAddress?.zip}`}
              />
            </div>
          )}
          <form>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
              <label className="col-span-4">
                <span className="text-sm font-medium">Street address</span>
                <input
                  {...register("streetAddress", {
                    required: "Street address is required",
                  })}
                  className={customInputCss}
                  placeholder="123 Main St"
                />
              </label>
              <label className="col-span-2">
                <span className="text-sm font-medium">Apt / Unit</span>
                <input
                  {...register("apt", {
                    required: "Apt or unit is required",
                  })}
                  className={customInputCss}
                  placeholder="Apt 5B"
                />
              </label>
              <label className="col-span-2">
                <span className="text-sm font-medium">City</span>
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  className={customInputCss}
                  placeholder="San Francisco"
                />
              </label>
              <label className="col-span-2">
                <span className="text-sm font-medium">State</span>
                <input
                  {...register("state", {
                    required: "State is required",
                  })}
                  className={customInputCss}
                  placeholder="CA"
                />
              </label>
              <label className="col-span-2">
                <span className="text-sm font-medium">ZIP</span>
                <input
                  {...register("zip", {
                    required: "Zip code is required",
                  })}
                  className={customInputCss}
                  placeholder="94103"
                />
              </label>
              <div className="flex text-sm text-gray-600 justify-start gap-3 col-span-4 mt-2">
                {AddressAliasButtonConfigs.map((config) => (
                  <AddressAliasButton
                    handleOnclick={() => {
                      setValue("alias", config.type);
                      setAlias(config.type);
                    }}
                    aliasState={alias}
                    type={config.type}
                    icon={config.icon}
                  />
                ))}
              </div>

              {alias === AddressAliasType.other && (
                <div className="flex items-center col-span-4">
                  <label className="w-full">
                    <span className="text-sm font-medium text-black">
                      Alias
                    </span>
                    <input
                      {...register("customAlias", {
                        required:
                          alias === AddressAliasType.other
                            ? "Alias is required"
                            : false,
                      })}
                      className={`${customInputCss} text-black`}
                    />
                  </label>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:items-center">
          {Object.keys(formState.errors).length > 0 && (
            <div className="text-xs text-rose-600 mr-3">
              * All fields are required
            </div>
          )}
          <button
            type="button"
            onClick={closePopUp}
            className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(editDeliveryAddressSubmit)}
            type="button"
            className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-sky-600 ring-1 ring-sky-200 hover:bg-sky-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
