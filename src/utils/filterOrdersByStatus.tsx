import { OrderStatus } from "../constants/OrderStatus";
import type { GetOrderForOwnerDTO } from "../dto/GetOrderForOwner.dto";

export const filterOrdersByStatus = (ordersData: GetOrderForOwnerDTO[]) => {
  return {
    [OrderStatus.Pending]: ordersData.filter(
      (o) => o.orderInfo.status === OrderStatus.Pending
    ),
    [OrderStatus.Cooking]: ordersData.filter(
      (o) => o.orderInfo.status === OrderStatus.Cooking
    ),
    [OrderStatus.Ready]: ordersData.filter(
      (o) => o.orderInfo.status === OrderStatus.Ready
    ),
    [OrderStatus.Delivering]: ordersData.filter(
      (o) => o.orderInfo.status === OrderStatus.Delivering
    ),
    [OrderStatus.Delivered]: ordersData.filter(
      (o) => o.orderInfo.status === OrderStatus.Delivered
    ),
  };
};
