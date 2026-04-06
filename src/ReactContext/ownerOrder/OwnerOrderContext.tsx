import { createContext } from "react";
import type { GetOrderForOwnerDTO } from "../../dto/GetOrderForOwner.dto";
import type {
  OrderStatus,
  StatusFilterOptions,
} from "../../constants/OrderStatus";

export type OwnerOrderContextValue = {
  selectedOrder?: GetOrderForOwnerDTO;
  closePopUp: () => void;
  numOfOrders?: number;
  statusFilterOption: StatusFilterOptions;
  setStatusFilterOption: React.Dispatch<
    React.SetStateAction<StatusFilterOptions>
  >;
  handleClickFilter: () => void;
  orders: Record<OrderStatus, GetOrderForOwnerDTO[]>;
  handleViewOrder: (orderId: string) => void;
  loadOrdersData: () => void;
};

export const OwnerOrderContext = createContext<OwnerOrderContextValue | null>(
  null
);
