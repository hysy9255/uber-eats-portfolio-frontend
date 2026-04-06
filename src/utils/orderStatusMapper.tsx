import { OrderStatus } from "../constants/OrderStatus";

export const orderStatusMapper = (status?: OrderStatus): number => {
  switch (status) {
    case OrderStatus.Pending:
      return 1;
    case OrderStatus.Cooking:
      return 2;
    case OrderStatus.Ready:
      return 3;
    case OrderStatus.Delivering:
      return 4;
    case OrderStatus.Delivered:
      return 5;
    default:
      return 0;
  }
};
