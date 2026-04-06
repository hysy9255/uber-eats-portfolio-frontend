import type { ClientInfoDTO } from "./ClientInfo.dto";
import type { DeliveryAddressSnapshotDTO } from "./DeliveryAddressSnapshot.dto";
import type { DriverInfoDTO } from "./DriverInfo.dto";
import type { OrderDTO } from "./Order.dto";
import type { OrderItemDTO } from "./OrderItem.dto";

export type GetOrderForOwnerDTO = {
  orderInfo: OrderDTO;
  orderItems: OrderItemDTO[];
  deliveryAddressInfo: DeliveryAddressSnapshotDTO;
  clientInfo: ClientInfoDTO;
  driverInfo?: DriverInfoDTO;
};
