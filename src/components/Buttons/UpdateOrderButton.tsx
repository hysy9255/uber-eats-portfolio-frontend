import { OrderStatus } from "../../constants/OrderStatus";

const buttonConfig: Record<
  | OrderStatus.Cooking
  | OrderStatus.Ready
  | OrderStatus.Delivering
  | OrderStatus.Delivered,
  { text: string; bgColor: string }
> = {
  [OrderStatus.Cooking]: {
    text: "Accept order",
    bgColor: "bg-orange-400 hover:bg-orange-500 active:bg-orange-600",
  },
  [OrderStatus.Ready]: {
    text: "Mark as ready",
    bgColor: "bg-green-400 hover:bg-green-500 active:bg-green-600",
  },
  [OrderStatus.Delivering]: {
    text: "Start Deliverying",
    bgColor: "bg-blue-400 hover:bg-blue-500 active:bg-blue-600",
  },
  [OrderStatus.Delivered]: {
    text: "Complete Delivery",
    bgColor: "bg-gray-400 hover:bg-gray-500 active:bg-gray-600",
  },
};

interface UpdateOrderStatusButtonProps {
  handleOnClick: () => void;
  nextStatus?:
    | OrderStatus.Cooking
    | OrderStatus.Ready
    | OrderStatus.Delivering
    | OrderStatus.Delivered;
}

const UpdateOrderStatusButton: React.FC<UpdateOrderStatusButtonProps> = ({
  handleOnClick,
  nextStatus,
}) => {
  if (!nextStatus) return null;
  return (
    <button
      onClick={handleOnClick}
      className={`
        ${buttonConfig[nextStatus].bgColor}
        hover:cursor-pointer
        text-white rounded-lg py-3 px-6 font-semibold text-nowrap`}
    >
      {buttonConfig[nextStatus].text}
    </button>
  );
};

export default UpdateOrderStatusButton;
