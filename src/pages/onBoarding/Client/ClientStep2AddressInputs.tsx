import { Fragment } from "react/jsx-runtime";
import OnBoardInput from "../../../components/Inputs/OnBoardInput";
import AddressAliasButton from "../../../components/Buttons/AddressAliasButton";
import { AddressAliasType } from "../../../constants/AddressAliasTypeEnums";
import { HomeIcon } from "../../../components/Icons/RegisterAddressIcons/HomeIcon";
import { OfficeIcon } from "../../../components/Icons/RegisterAddressIcons/OfficeIcon";
import { OtherIcon } from "../../../components/Icons/RegisterAddressIcons/OtherIcon";
import { useFormContext } from "react-hook-form";
import type { ClientOnBoardingForm } from "../../../components/Layout/ClientOnBoardLayout";
import { customInputCss } from "../../../constants/CustomInputCss";

interface ClientStep2AddressInputsProps {
  alias: AddressAliasType;
  setAlias: (value: AddressAliasType) => void;
}

const ClientStep2AddressInputs: React.FC<ClientStep2AddressInputsProps> = ({
  alias,
  setAlias,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ClientOnBoardingForm>();
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OnBoardInput
          css="col-span-2"
          title="Street address"
          field="step2.streetAddress"
          placeholder="123 Main St"
        />
        <OnBoardInput
          css="col-span-2"
          title="Apt / Unit"
          field="step2.apt"
          placeholder="Apt 5B"
        />
        <OnBoardInput
          css="col-span-2"
          title="City"
          field="step2.city"
          placeholder="San Francisco"
        />
        <OnBoardInput
          css="col-span-2"
          title="State"
          field="step2.state"
          placeholder="CA"
        />
        <OnBoardInput
          css="col-span-2"
          title="ZIP"
          field="step2.zip"
          placeholder="94103"
        />
      </div>

      <div className="flex text-sm text-gray-600 gap-3">
        <AddressAliasButton
          handleOnclick={() => {
            setValue("step2.alias", AddressAliasType.home);
            setAlias(AddressAliasType.home);
          }}
          aliasState={alias}
          type={AddressAliasType.home}
          icon={HomeIcon}
        />
        <AddressAliasButton
          handleOnclick={() => {
            setValue("step2.alias", AddressAliasType.work);
            setAlias(AddressAliasType.work);
          }}
          aliasState={alias}
          type={AddressAliasType.work}
          icon={OfficeIcon}
        />
        <AddressAliasButton
          handleOnclick={() => {
            setValue("step2.alias", AddressAliasType.other);
            setAlias(AddressAliasType.other);
          }}
          aliasState={alias}
          type={AddressAliasType.other}
          icon={OtherIcon}
        />
        {alias === AddressAliasType.other && (
          <div className="flex items-center w-full">
            <label className="w-full">
              <span className="text-sm font-medium text-black">Alias</span>
              <input
                {...register("step2.customAlias", {
                  required:
                    alias === AddressAliasType.other
                      ? "Alias is required"
                      : false,
                })}
                className={`${customInputCss} text-black`}
              />
              {errors.step2?.customAlias?.message && (
                <span className="font-medium text-red-500 text-sm">
                  {errors.step2?.customAlias?.message}
                </span>
              )}
            </label>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ClientStep2AddressInputs;
