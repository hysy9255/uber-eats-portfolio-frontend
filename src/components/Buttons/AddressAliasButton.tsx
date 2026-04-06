import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import type { IconProps } from "../Icons/RegisterAddressIcons/icon.props.type";

interface AddressAliasButtonProps {
  handleOnclick: () => void;
  aliasState?: AddressAliasType;
  type: AddressAliasType;
  icon: React.ComponentType<IconProps>;
}

const AddressAliasButton: React.FC<AddressAliasButtonProps> = ({
  handleOnclick,
  aliasState,
  type,
  icon: Icon,
}) => {
  return (
    <div
      onClick={handleOnclick}
      className={`
                ${
                  aliasState === type
                    ? "bg-sky-500/20 border-sky-500"
                    : "bg-white border-gray-300"
                }
                border  flex flex-col items-center justify-center px-10 py-1 rounded-md hover:cursor-pointer`}
    >
      <Icon
        size={20}
        className={aliasState === type ? "text-sky-500" : "text-gray-800"}
      />
      <div className={aliasState === type ? "text-sky-500" : "text-gray-800"}>
        {type}
      </div>
    </div>
  );
};

export default AddressAliasButton;
