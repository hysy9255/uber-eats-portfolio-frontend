import type { GetOrderForOwnerDTO } from "../../dto/GetOrderForOwner.dto";
import { OrderStatusIcon } from "../OrderStatusIcon/OrderStatusIcon";

interface OverviewRecentOrderDetailCardProps {
  order: GetOrderForOwnerDTO;
}

const OverviewRecentOrderDetailCard: React.FC<
  OverviewRecentOrderDetailCardProps
> = ({ order }) => {
  return (
    <div className="grid grid-cols-[5fr_1fr] rounded-md border border-gray-300 hover:bg-gray-100 hover:cursor-pointer p-2">
      <div
        className="
      grid grid-cols-[auto_240px] gap-x-3"
      >
        <div className="font-medium text-xs flex items-center ">
          #{order.orderInfo.orderId.split("-")[0]}
        </div>
        <div className="text-sm flex items-center ">
          <span>
            {order.orderItems[0].name} {""}
          </span>
          <span>and {order.orderItems.length - 1} more</span>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <OrderStatusIcon status={order.orderInfo.status} />
      </div>
    </div>
  );
};

export default OverviewRecentOrderDetailCard;
