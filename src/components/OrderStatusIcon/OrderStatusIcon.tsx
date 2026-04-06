import type { OrderStatus } from "../../constants/OrderStatus";

type StatusConfig = Record<
  OrderStatus,
  { bgColor: string; textColor: string; borderColor: string }
>;

const statusStyleConfig: StatusConfig = {
  Pending: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  Cooking: {
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    borderColor: "border-orange-300",
  },
  Ready: {
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-300",
  },
  Delivering: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
  },
  Delivered: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    borderColor: "border-gray-300",
  },
};

interface OrderStatusIconProps {
  status: OrderStatus;
}

export const OrderStatusIcon: React.FC<OrderStatusIconProps> = ({ status }) => {
  const bgColor = statusStyleConfig[status].bgColor;
  const textColor = statusStyleConfig[status].textColor;
  const borderColor = statusStyleConfig[status].borderColor;
  return (
    <div
      className={`${bgColor} ${textColor} ${borderColor}
      text-center border
      font-semibold text-[12px] rounded-sm px-1 py-1 w-20`}
    >
      {status}
    </div>
  );
};
