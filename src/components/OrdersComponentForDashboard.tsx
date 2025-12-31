import { OrderStatus } from "../constants/OrderStatus";

import houseIcon from "../icons/house.png";
import carIcon from "../icons/car.png";
import type { MenuList } from "../constants/MockOrdersData";

type Order = {
  orderId: string;
  menus: MenuList[];
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

export const OrderStatusComp: React.FC<OrderStatusCompProps> = ({ status }) => {
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

const OrdersComponentForDashboard: React.FC<
  OrdersComponentForDashboardProps
> = ({ orders }) => {
  return (
    <article className="bg-white border border-gray-300 rounded-md flex flex-col py-4">
      <h2 className="text-sm font-medium  rounded-t-md">
        <div className="px-3 pb-3 leading-none font-semibold text-sm">
          Recent Orders
        </div>
      </h2>
      <div
        className="h-[212px]
          overflow-y-auto border border-gray-300 rounded-md mx-3"
      >
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[5fr_1fr] border-b border-gray-300 hover:bg-gray-100 hover:cursor-pointer p-2"
            >
              <div
                className="
                  grid grid-cols-[auto_240px] gap-x-3"
              >
                <div className="font-medium text-xs flex items-center justify-start leading-none">
                  #{order.orderId}
                </div>
                <div className="truncate flex items-center">
                  {order.menus.map((menu, index) => {
                    return (
                      <span key={index} className="font-medium text-xs ">
                        {menu.name}
                        {index < order.menus.length - 1 && ",\u00A0"}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center  col-span-2">
                  <img className="w-5 h-5 mr-1" src={carIcon} />
                  <span className="text-xs  max-w-[120px] text-nowrap overflow-hidden text-ellipsis italic">
                    {order.driver}{" "}
                  </span>
                  <span className="text-semibold text-xs text-gray-500 mx-2 ">
                    {"\u2014"}
                  </span>{" "}
                  <img className="w-4 h-4 mr-1 " src={houseIcon} />
                  <span className="text-xs  max-w-[120px] text-nowrap overflow-hidden text-ellipsis italic">
                    {order.customer}
                  </span>
                </div>
              </div>
              <div className=" flex items-center justify-center">
                <OrderStatusComp status={order.status} />
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default OrdersComponentForDashboard;
