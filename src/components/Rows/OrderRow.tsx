import type { GetOrderForOwnerDTO } from "../../dto/GetOrderForOwner.dto";
import { formatDateParts } from "../../utils/formatDateParts";
import { OrderStatusIcon } from "../OrderStatusIcon/OrderStatusIcon";

interface OrderRowProps {
  order: GetOrderForOwnerDTO;
  className?: string;
  onClickViewOrder: (orderId: string) => void;
  tableColumnCss: string;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  className,
  onClickViewOrder,
  tableColumnCss,
}) => {
  const { date, time } = formatDateParts(order.orderInfo.createdAt);

  return (
    <div
      onClick={() => onClickViewOrder(order.orderInfo.orderId)}
      key={order.orderInfo.orderId}
      className={`
                bg-stone-50 rounded-md
                hover:cursor-pointer
                py-3 px-5 grid 
                ${tableColumnCss}
                gap-3 hover:bg-gray-100 border border-gray-100 
                relative group
                ${className}`}
    >
      <div
        className="
                  absolute left-0 top-0 bottom-0 
                  w-[3px] bg-blue-400 
                  opacity-0 group-hover:opacity-100 
                  rounded-l-md"
      />
      <div className="flex flex-col justify-center">
        <div className="text-gray-900 font-semibold text-sm">
          {order.orderInfo.orderId.split("-")[0]}
        </div>
      </div>

      <div className="text-gray-600 flex items-center text-sm">{date}</div>
      <div className="text-gray-600 flex items-center text-sm">{time}</div>
      <div className="flex items-center">
        <OrderStatusIcon status={order.orderInfo.status} />
      </div>

      <div className="text-gray-600 flex items-center text-sm">
        {order.orderInfo.requestToRestaurant}
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-nowrap overflow-hidden text-ellipsis text-gray-900 font-semibold text-sm">
          {order.clientInfo.name}
        </div>
        <div className="text-gray-500 text-xs">{`${order.deliveryAddressInfo.streetAddress} ${order.deliveryAddressInfo.apt} ${order.deliveryAddressInfo.city} ${order.deliveryAddressInfo.state} ${order.deliveryAddressInfo.zip} `}</div>
      </div>

      <div className="text-sm text-nowrap overflow-hidden text-ellipsis text-gray-800 flex items-center">
        {order.driverInfo?.name ?? "Not Assigned"}
      </div>
      <div className="text-sm text-right font-medium flex items-center justify-end">
        {Number(order.orderInfo.totalPrice).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </div>
  );
};

export default OrderRow;
