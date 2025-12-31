import { useCallback, useEffect, useState } from "react";
import {
  OrderStatus,
  StatusFilterOptions,
  TimeFilterOptions,
} from "../constants/OrderStatus";
import Dropdown from "../components/Dropdowns/Dropdown";
import { getOrdersView } from "../api/orderApi";
import { getToken } from "../auth";
import OrderRow from "../components/Rows/OrderRow";
import OrderDetailCard from "../components/Cards/OrderDetailCard";
// import type { DeliveryType } from "../constants/DeliveryTypeEnums";
// import { formatOrderDate } from "../utils/formatOrderDate";

export type OrderForRestaurantDashboard = {
  orderId: string;
  date: string;
  time: string;
  status: OrderStatus;
  totalPrice: string;
  requestToRestaurant: string | null;
  clientName: string;
  driverName: string | null;
  // deliveryAddress: string;
  // deliveryType: DeliveryType;
  // requestToDriver: string | null;
  // requestToRestaurant: string | null;
};

const OwnerDashboardOrders2 = () => {
  const [targetOrderId, setTargetOrderId] = useState<string | null>(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState<boolean>(false);
  const token = getToken();
  if (!token) throw new Error("No Token");

  const [statusFilterOption, setStatusFilterOption] =
    useState<StatusFilterOptions>(StatusFilterOptions.allStatus);

  const [timeFilterOption, setTimeFilterOption] = useState<TimeFilterOptions>(
    TimeFilterOptions.allTime
  );

  const [orders, setOrders] = useState<OrderForRestaurantDashboard[]>([]);

  const loadOrdersData = useCallback(async () => {
    const ordersData = await getOrdersView(token);
    // console.log("ordersData:", ordersData);

    setOrders(ordersData);
  }, [token]);

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  const pendingOrders = orders.filter(
    (order) => order.status === OrderStatus.Pending
  );
  const cookingOrders = orders.filter(
    (order) => order.status === OrderStatus.Cooking
  );
  const readyOrders = orders.filter(
    (order) => order.status === OrderStatus.Ready
  );
  const deliveringOrders = orders.filter(
    (order) => order.status === OrderStatus.Delivering
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === OrderStatus.Delivered
  );

  const handleViewOrder = (orderId: string) => {
    setOrderDetailOpen(!orderDetailOpen);
    setTargetOrderId(orderId);
  };

  const handleClickClose = () => {
    setOrderDetailOpen(false);
    setTargetOrderId(null);
  };

  return (
    <div className="p-[10px] flex flex-col gap-3">
      <h3 className="flex gap-4 justify-between items-center">
        <div className="text-lg font-semibold flex gap-2">
          <div>Orders</div>
          <div className="text-slate-600">({orders.length})</div>
        </div>
        <div className="flex gap-3 ">
          <Dropdown
            options={Object.values(StatusFilterOptions)}
            option={statusFilterOption}
            setOption={setStatusFilterOption}
            widthCss="w-40"
          />
          <Dropdown
            options={Object.values(TimeFilterOptions)}
            option={timeFilterOption}
            setOption={setTimeFilterOption}
            widthCss="w-40"
          />

          <button
            className="bg-blue-400 
                hover:bg-blue-500 active:bg-blue-600 
                hover:cursor-pointer  
                text-white font-semibold w-30 px-2 py-1 rounded-md
                text-sm
                "
          >
            Filter
          </button>
        </div>
      </h3>

      <section className={``}>
        <div
          className={`
            order-2
            fixed top-[112px] right-0 w-[550px] 
            bg-white shadow-xl z-50 rounded-2xl
            transition-all duration-300 ease-out
            ${orderDetailOpen ? "translate-x-0" : "translate-x-full"} 
            `}
        >
          <OrderDetailCard
            onClickClose={handleClickClose}
            targetOrderId={targetOrderId}
          />
        </div>

        <article
          className={`
            ${orderDetailOpen ? "w-[800px]" : "w-full"}
            transition-all duration-300 ease-out
        order-1 border border-gray-300 rounded-2xl bg-neutral-200 p-3
        `}
        >
          <h3
            className={`bg-stone-50 rounded-md text-sm 
          font-semibold py-3 px-5 
          grid 
          ${
            orderDetailOpen
              ? "grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1.5fr_0.5fr]"
              : "grid-cols-[1fr_1fr_1fr_1fr_2fr_1.5fr_1.5fr_0.5fr]"
          }
           gap-3`}
          >
            <div>Order ID</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
            {!orderDetailOpen && <div>Customer's Note</div>}
            <div>Ordered By</div>
            <div>Driver</div>
            <div className="text-right">Total</div>
          </h3>
          <div className="h-[440px] overflow-y-auto">
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              New Orders ({pendingOrders.length})
            </div>
            {pendingOrders.map((order, index) => (
              <OrderRow
                orderDetailOpen={orderDetailOpen}
                onClickViewOrder={handleViewOrder}
                order={order}
                className={`${
                  pendingOrders.length > index + 1 ? "mb-1" : "mb-0"
                }`}
              />
            ))}
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              Preparing ({cookingOrders.length})
            </div>
            {cookingOrders.map((order, index) => (
              <OrderRow
                orderDetailOpen={orderDetailOpen}
                onClickViewOrder={handleViewOrder}
                order={order}
                className={`${
                  cookingOrders.length > index + 1 ? "mb-1" : "mb-0"
                }`}
              />
            ))}
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              Ready For Delivery ({readyOrders.length})
            </div>
            {readyOrders.map((order, index) => (
              <OrderRow
                orderDetailOpen={orderDetailOpen}
                onClickViewOrder={handleViewOrder}
                order={order}
                className={`${
                  readyOrders.length > index + 1 ? "mb-1" : "mb-0"
                }`}
              />
            ))}
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              On the way to customer ({deliveringOrders.length})
            </div>
            {deliveringOrders.map((order, index) => (
              <OrderRow
                orderDetailOpen={orderDetailOpen}
                onClickViewOrder={handleViewOrder}
                order={order}
                className={`${
                  deliveringOrders.length > index + 1 ? "mb-1" : "mb-0"
                }`}
              />
            ))}
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              Delivered ({deliveredOrders.length})
            </div>
            {deliveredOrders.map((order, index) => (
              <OrderRow
                orderDetailOpen={orderDetailOpen}
                onClickViewOrder={handleViewOrder}
                order={order}
                className={`${
                  deliveredOrders.length > index + 1 ? "mb-1" : "mb-0"
                }`}
              />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default OwnerDashboardOrders2;
