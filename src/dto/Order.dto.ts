import type { OrderStatus } from "../constants/OrderStatus";

export type OrderDTO = {
  orderId: string;
  createdAt: string;
  totalPrice: string;
  status: OrderStatus;
  requestToRestaurant?: string;
};
