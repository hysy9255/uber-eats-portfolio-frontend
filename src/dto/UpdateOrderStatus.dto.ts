import type { OrderStatus } from "../constants/OrderStatus";

export type UpdateOrderStatusDTO = {
  status: OrderStatus;
};
