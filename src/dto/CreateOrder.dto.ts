import type { DeliveryType } from "../constants/DeliveryTypeEnums";

type OrderItem = {
  dishId: string;
  quantity: number;
};

export type CreateOrderDTO = {
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  requestToRestaurant?: string;
  requestToDriver?: string;
  deliveryAddressId: string;
};
