import { useForm } from "react-hook-form";
import type { AddDeliveryAddressForm } from "../../formDataTypes/deliveryAddress/addDeliveryAddressForm.type";
import { customInputCss } from "../../constants/CustomInputCss";
import AddressAliasButton from "../Buttons/AddressAliasButton";
import { useState } from "react";
import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import { HomeIcon } from "../Icons/RegisterAddressIcons/HomeIcon";
import { OfficeIcon } from "../Icons/RegisterAddressIcons/OfficeIcon";
import { OtherIcon } from "../Icons/RegisterAddressIcons/OtherIcon";
import { addDeliveryAddress } from "../../api/clientApi";
import { getToken } from "../../auth";
import type { CreateDeliveryAddressDTO } from "../../dto/CreateDeliveryAddress.dto";
import { useAddress } from "../../ReactContext/address/UseAddress";

interface AddAddressProps {
  closeAddAddress: () => void;
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

const AddAddress: React.FC<AddAddressProps> = ({ closeAddAddress }) => {
  const [alias, setAlias] = useState<AddressAliasType>();

  const { loadMyDeliveryAddresses: refreshAddressData } = useAddress();

  const { register, setValue, handleSubmit, formState } =
    useForm<AddDeliveryAddressForm>({
      mode: "onSubmit",
    });

  const token = getToken();
  if (!token) throw new Error("No Token");

  const handleAddDeliveryAddressSubmit = async (
    data: AddDeliveryAddressForm
  ) => {
    const payload: CreateDeliveryAddressDTO = { ...data, isDefault: false };
    try {
      await addDeliveryAddress(token, payload);
    } catch (error) {
      console.error(error);
    }

    refreshAddressData();
    closeAddAddress();
  };

  return (
    <div className="fixed inset-0 z-400 bg-black/50 flex items-center justify-center">
      <div className="z-500 max-w-4xl rounded-2xl bg-white ring-1 ring-black/10 p-10">
        <h2 className="text-lg font-semibold pb-3">Add Address</h2>

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
            <div className="text-sm text-gray-600 col-span-2 mt-2">
              <input
                type="hidden"
                {...register("alias", { required: "Alias is required" })}
              />
              <div className="flex text-sm text-gray-600 justify-start gap-3 mt-2">
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
            </div>
            {alias === AddressAliasType.other && (
              <div className="flex items-center col-span-2">
                <label className="w-full">
                  <span className="text-sm font-medium text-black">Alias</span>
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

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:items-center">
          {Object.keys(formState.errors).length > 0 && (
            <div className="text-xs text-rose-600 mr-3">
              * All fields are required
            </div>
          )}
          <button
            type="button"
            onClick={closeAddAddress}
            className="hover:cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleAddDeliveryAddressSubmit)}
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

export default AddAddress;
