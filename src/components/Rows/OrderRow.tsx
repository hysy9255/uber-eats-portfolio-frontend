import type { OrderForRestaurantDashboard } from "../../pages/OwnerDashboardOrders2";
import { OrderStatusComp } from "../OrdersComponentForDashboard";

interface OrderRowProps {
  order: OrderForRestaurantDashboard;
  className?: string;
  onClickViewOrder: (orderId: string) => void;
  orderDetailOpen: boolean;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  className,
  onClickViewOrder,
  orderDetailOpen,
}) => {
  return (
    <div
      onClick={() => onClickViewOrder(order.orderId)}
      key={order.orderId}
      className={`
                  bg-stone-50 rounded-md
                  hover:cursor-pointer
                  py-3 px-5 grid 
                  ${
                    orderDetailOpen
                      ? "grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1.5fr_0.5fr]"
                      : "grid-cols-[1fr_1fr_1fr_1fr_2fr_1.5fr_1.5fr_0.5fr] "
                  }
                  gap-3
                   hover:bg-gray-100 border border-gray-100 
                relative group
                ${className}
                `}
    >
      <div
        className="
                      absolute left-0 top-0 bottom-0 
                      w-[3px] bg-blue-400 
                      opacity-0 group-hover:opacity-100 
                      rounded-l-md
                    "
      />
      <div className="flex flex-col justify-center">
        <div className="text-gray-900 font-semibold text-sm">
          {order.orderId.split("-")[0]}
        </div>
        {/* <div
          onClick={() => onClickViewOrder(order.orderId)}
          className="text-gray-500 text-xs hover:cursor-pointer"
        >
          View Order
        </div> */}
      </div>

      <div className="text-gray-600 flex items-center text-sm">
        {order.date}
      </div>
      <div className="text-gray-600 flex items-center text-sm">
        {order.time}
      </div>
      <div className="flex items-center">
        <OrderStatusComp status={order.status} />
      </div>
      {!orderDetailOpen && (
        <div className="text-gray-600 flex items-center text-sm">
          {order.requestToRestaurant}
        </div>
      )}

      <div className="flex flex-col justify-center">
        <div className="text-nowrap overflow-hidden text-ellipsis text-gray-900 font-semibold text-sm">
          {order.clientName}
        </div>
        <div className="text-gray-500 text-xs">387 New Estate Street, NY</div>
      </div>

      <div className="text-sm text-nowrap overflow-hidden text-ellipsis text-gray-800 flex items-center">
        {order.driverName ?? "Not Assigned"}
      </div>
      <div className="text-sm text-right font-medium flex items-center justify-end">
        {Number(order.totalPrice).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </div>
  );
};

export default OrderRow;
