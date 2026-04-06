import { useCallback, useEffect, useState } from "react";
import ClientOrderSummaryCard from "../components/Cards/ClientOrderSummaryCard";
import type { GetOrderForClientDTO } from "../dto/GetOrderForClient.dto";
import { getOnGoingOrdersForClient } from "../api/orderApi";
import { getToken } from "../auth";

const OnGoingOrders = () => {
  const token = getToken();
  const [orders, setOrders] = useState<GetOrderForClientDTO[]>();

  const loadOrdersData = useCallback(async () => {
    if (!token) return;
    const ordersData = await getOnGoingOrdersForClient(token);
    setOrders(ordersData);
  }, [token]);

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  const hasOrders = (orders?.length ?? 0) > 0;

  return (
    <main className="p-2">
      <div className="font-semibold text-lg pb-2">On Going Orders</div>
      {!hasOrders ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 py-14 text-center px-10">
          <div className="text-gray-900 font-semibold">No on going orders</div>
          <div className="text-sm text-gray-500 mt-2">
            When you place an order, it will show up here.
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders?.map((order, index) => (
            <ClientOrderSummaryCard key={index} order={order} />
          ))}
        </div>
      )}
    </main>
  );
};

export default OnGoingOrders;
