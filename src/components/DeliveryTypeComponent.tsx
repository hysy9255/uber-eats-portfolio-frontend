import { DeliveryType } from "../constants/DeliveryTypeEnums";
import RoundCheckBox from "./CheckBoxes/RoundCheckBox";

interface DeliveryTypeComponentProps {
  onClick: () => void;
  deliveryTypeState: DeliveryType;
  assignedDeliveryType: DeliveryType;
  cost: string;
  eta: string;
  title: string;
}

const DeliveryTypeComponent: React.FC<DeliveryTypeComponentProps> = ({
  onClick,
  deliveryTypeState,
  assignedDeliveryType,
  cost,
  eta,
  title,
}) => {
  return (
    <div
      className={`
        bg-white 
        hover:cursor-pointer border-2  
        grid grid-cols-[auto_1fr_auto]
        gap-x-3
        items-center
        rounded-md px-3 py-2 ${
          deliveryTypeState === assignedDeliveryType
            ? "border-sky-400"
            : "border-gray-200"
        }`}
      onClick={onClick}
    >
      <RoundCheckBox isChecked={deliveryTypeState === assignedDeliveryType} />
      <div>
        <div className="text-black">{title}</div>
        <div className="font-normal">{eta}</div>
      </div>
      <div>{cost}</div>
    </div>
  );
};

export default DeliveryTypeComponent;
