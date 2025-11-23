import { OrderStatus } from "../constants/OrderStatus";
import type { Menu } from "../pages/CreateDish";
import houseIcon from "../icons/house.png";
import carIcon from "../icons/car.png";

type Order = {
  orderId: string;
  menus: Menu[];
  status: OrderStatus;
  totalPrice: string;
  customer: string;
  driver?: string;
};

interface OrdersComponentForDashboardProps {
  orders: Order[];
}

interface OrderStatusCompProps {
  status: OrderStatus;
}

type StatusConfig = Record<OrderStatus, { bgColor: string; textColor: string }>;

const statusStyleConfig: StatusConfig = {
  Pending: { bgColor: "bg-green-400", textColor: "text-white" },
  Cooking: { bgColor: "bg-amber-400", textColor: "text-white" },
  Delivering: { bgColor: "bg-blue-400", textColor: "text-white" },
  Delivered: { bgColor: "bg-gray-400", textColor: "text-white" },
};

export const OrderStatusComp: React.FC<OrderStatusCompProps> = ({ status }) => {
  const bgColor = statusStyleConfig[status].bgColor;
  const textColor = statusStyleConfig[status].textColor;
  return (
    <div
      className={`${bgColor} ${textColor} 
      flex items-center justify-center 
      font-semibold text-xs rounded-sm px-1 w-20`}
    >
      {status}
    </div>
  );
};

const OrdersComponentForDashboard: React.FC<
  OrdersComponentForDashboardProps
> = ({ orders }) => {
  return (
    <article className="bg-white border border-gray-300 rounded-md flex flex-col">
      <h2 className="text-lg font-medium bg-gray-100 border-b border-gray-300 rounded-t-md">
        <div className="py-1 px-3">Recent Orders</div>
      </h2>
      <div
        className="h-[207px]
          overflow-y-auto"
      >
        {orders.map((order) => {
          return (
            <div
              className="border-b border-gray-300
          grid grid-cols-[auto_240px_auto] gap-x-3 p-2
          hover:bg-gray-100 hover:cursor-pointer
          "
            >
              <div className="font-medium ">#{order.orderId}</div>
              <div className="truncate ">
                {order.menus.map((menu, index) => {
                  return (
                    <span className="font-medium">
                      {menu.name}
                      {index < order.menus.length - 1 && ",\u00A0"}
                    </span>
                  );
                })}
              </div>

              <OrderStatusComp status={order.status} />

              <div></div>
              <div className="flex items-center  col-span-2">
                <img className="w-5 h-5 mr-1 " src={carIcon} />
                <span className="text-xs  max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                  {order.driver}{" "}
                </span>
                <span className="text-semibold text-xl text-gray-500 mx-2 ">
                  {"\u2014"}
                </span>{" "}
                <img className="w-4 h-4 mr-1 " src={houseIcon} />
                <span className="text-xs  max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                  {order.customer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default OrdersComponentForDashboard;
