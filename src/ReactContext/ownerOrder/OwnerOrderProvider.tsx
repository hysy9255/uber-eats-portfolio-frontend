import { useCallback, useEffect, useState, type ReactNode } from "react";
import { OwnerOrderContext } from "./OwnerOrderContext";
import { getToken } from "../../auth";
import {
  OrderStatus,
  StatusFilterOptions,
  statusOptionToStatus,
} from "../../constants/OrderStatus";
import type { GetOrderForOwnerDTO } from "../../dto/GetOrderForOwner.dto";
import { getOrdersForOwner } from "../../api/orderApi";
import { filterOrdersByStatus } from "../../utils/filterOrdersByStatus";
import { socket } from "../../socket";
import { useMyRestaurant } from "../myRestaurant/UseMyRestaurant";

const defaultOrdersState = {
  [OrderStatus.Pending]: [],
  [OrderStatus.Cooking]: [],
  [OrderStatus.Ready]: [],
  [OrderStatus.Delivering]: [],
  [OrderStatus.Delivered]: [],
};

interface OwnerOrderProviderProps {
  children: ReactNode;
}

export const OwnerOrderProvider: React.FC<OwnerOrderProviderProps> = ({
  children,
}) => {
  const { restaurant } = useMyRestaurant();
  const token = getToken();
  if (!token) throw new Error("No Token");

  const [orders, setOrders] =
    useState<Record<OrderStatus, GetOrderForOwnerDTO[]>>(defaultOrdersState);

  const [statusFilterOption, setStatusFilterOption] =
    useState<StatusFilterOptions>(StatusFilterOptions.allStatus);

  const [selectedOrder, setSelectedOrder] = useState<GetOrderForOwnerDTO>();
  const [numOfOrders, setNumOfOrders] = useState<number>();

  const loadOrdersData = useCallback(
    async (status?: OrderStatus) => {
      const ordersData = await getOrdersForOwner(token, status);
      setNumOfOrders(ordersData.length);
      setOrders(() => filterOrdersByStatus(ordersData));
    },
    [token]
  );

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrder(
      Object.values(orders)
        .flat()
        .find((order) => order.orderInfo.orderId === orderId)
    );
  };

  const closePopUp = () => {
    setSelectedOrder(undefined);
  };

  const handleClickFilter = async () => {
    loadOrdersData(statusOptionToStatus[statusFilterOption]);
  };

  useEffect(() => {
    const onNewOrderCreated = (payload: { restaurantId: string }) => {
      if (
        payload.restaurantId ===
        restaurant.restaurantSummary.generalInfo.restaurantId
      ) {
        loadOrdersData();
      }
    };
    socket.on("order.created", onNewOrderCreated);
    socket.emit("joinRestaurantRoom", {
      restaurantId: restaurant.restaurantSummary.generalInfo.restaurantId,
    });
    return () => {
      socket.off("order.statusChanged", onNewOrderCreated);
    };
  }, [restaurant, loadOrdersData]);

  return (
    <OwnerOrderContext.Provider
      value={{
        selectedOrder,
        closePopUp,
        numOfOrders,
        statusFilterOption,
        setStatusFilterOption,
        handleClickFilter,
        orders,
        handleViewOrder,
        loadOrdersData,
      }}
    >
      {children}
    </OwnerOrderContext.Provider>
  );
};
