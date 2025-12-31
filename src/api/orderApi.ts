import type { DeliveryType } from "../constants/DeliveryTypeEnums";

type OrderItem = {
  dishId: string;
  quantity: number;
};

export type CreateOrderPayload = {
  restaurantId: string;
  orderItems: OrderItem[];
  deliveryType: DeliveryType;
  requestToRestaurant: string | null;
  requestToDriver: string | null;
  deliveryAddress?: string;
};

export const createOrder = async (
  token: string,
  payload: CreateOrderPayload
) => {
  const res = await fetch("http://localhost:3002/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const getOrdersView = async (token: string) => {
  const res = await fetch("http://localhost:3002/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getOrderDetailView = async (token: string, orderId: string) => {
  const res = await fetch(`http://localhost:3002/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
