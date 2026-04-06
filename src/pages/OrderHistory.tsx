import { useCallback, useEffect, useState } from "react";
import { getToken } from "../auth";
import ClientOrderSummaryCard from "../components/Cards/ClientOrderSummaryCard";
import type { GetOrderForClientDTO } from "../dto/GetOrderForClient.dto";
import { getOrderHistoryForClient } from "../api/orderApi";

const OrderHistory = () => {
  const token = getToken();
  const [orders, setOrders] = useState<GetOrderForClientDTO[]>();

  const loadOrdersData = useCallback(async () => {
    if (!token) return;
    const ordersData = await getOrderHistoryForClient(token);
    setOrders(ordersData);
  }, [token]);

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  const hasOrders = (orders?.length ?? 0) > 0;

  return (
    <main className="p-2">
      <div className="font-semibold text-lg pb-2">Order History</div>
      {!hasOrders ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 py-14 text-center px-10">
          <div className="text-gray-900 font-semibold">No order history</div>
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

export default OrderHistory;
