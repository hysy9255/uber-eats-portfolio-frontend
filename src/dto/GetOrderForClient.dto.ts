import type { DeliveryAddressSnapshotDTO } from "./DeliveryAddressSnapshot.dto";
import type { OrderDTO } from "./Order.dto";
import type { OrderItemDTO } from "./OrderItem.dto";
import type { RestaurantInfoDTO } from "./RestaurantInfo.dto";

export type GetOrderForClientDTO = {
  orderInfo: OrderDTO;
  orderItems: OrderItemDTO[];
  restaurantInfo: RestaurantInfoDTO;
  deliveryAddressInfo?: DeliveryAddressSnapshotDTO;
};
