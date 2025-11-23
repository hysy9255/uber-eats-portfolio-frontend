import { useState } from "react";

import { OrderStatusComp } from "../components/OrdersComponentForDashboard";
import { mockOrderData } from "../constants/MockOrdersData";
import {
  StatusFilterOptions,
  TimeFilterOptions,
} from "../constants/OrderStatus";
import Dropdown from "../components/Dropdown";

const OwnerDashboardOrders2 = () => {
  const [statusFilterOption, setStatusFilterOption] =
    useState<StatusFilterOptions>(StatusFilterOptions.allStatus);

  const [timeFilterOption, setTimeFilterOption] = useState<TimeFilterOptions>(
    TimeFilterOptions.allTime
  );

  return (
    <div className="border border-gray-300 rounded-md">
      <h3 className="text-2xl font-semibold py-3">Orders</h3>
      <div className="flex gap-3 py-3">
        <Dropdown
          options={Object.values(StatusFilterOptions)}
          option={statusFilterOption}
          setOption={setStatusFilterOption}
        />
        <Dropdown
          options={Object.values(TimeFilterOptions)}
          option={timeFilterOption}
          setOption={setTimeFilterOption}
        />

        <button
          className="bg-blue-400 
                hover:bg-blue-500 active:bg-blue-600 
                hover:cursor-pointer  
                text-white font-semibold w-30 p-2 rounded-md"
        >
          Filter
        </button>
      </div>
      {/* <div className="bg-black h-[200px] w-full"></div> */}
      <section className="">
        <div className="bg-gray-100 font-semibold grid grid-cols-6 gap-5 p-3">
          <h4 className="border">Order ID</h4>
          <h4 className="border">Date</h4>
          <h4 className="border">Customer</h4>
          <h4 className="border">Total</h4>
          <h4 className="border">Status</h4>
          <h4 className="border">Driver</h4>
        </div>
        {mockOrderData.map((order) => (
          <div className="grid grid-cols-6 gap-5 p-3">
            <div className="border">{order.orderId}</div>
            <div className="border">{order.date}</div>
            <div className="border">{order.customer}</div>
            <div className="border">{order.totalPrice}</div>
            <div className="border">
              <OrderStatusComp status={order.status} />
            </div>
            <div className="border">{order.driver}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OwnerDashboardOrders2;
