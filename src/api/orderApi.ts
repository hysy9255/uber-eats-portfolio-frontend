import type { OrderStatus } from "../constants/OrderStatus";
import type { CreateOrderDTO } from "../dto/CreateOrder.dto";
import type { GetOrderForClientDTO } from "../dto/GetOrderForClient.dto";
import type { GetOrderForOwnerDTO } from "../dto/GetOrderForOwner.dto";
import type { GetOwnerDashBoardPageDTO } from "../dto/GetOwnerDashboardPage.dto";
import type { MenuRankingDTO } from "../dto/MenuRanking.dto";
import type { UpdateOrderStatusDTO } from "../dto/UpdateOrderStatus.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const getOwnerDashboardPage = async (
  token: string,
  range: string
): Promise<GetOwnerDashBoardPageDTO> => {
  const res = await fetch(`${API_BASE_URL}/kpi/orders/summary?range=${range}`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getMenuRankings = async (
  token: string
): Promise<MenuRankingDTO> => {
  const res = await fetch(`${API_BASE_URL}/kpi/orders/ranking?limit=${5}`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getOrdersForOwner = async (
  token: string,
  status?: OrderStatus
): Promise<GetOrderForOwnerDTO[]> => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  const res = await fetch(
    `${API_BASE_URL}/owner/orders${
      params.toString() ? `?${params.toString()}` : ""
    }`,
    {
      method: "GET",
      headers: {
        ...COMMON_HEADERS,
        "jwt-token": token,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("API Error:", errorData.message);
    throw new Error(errorData.message);
  }
  return await res.json();
};

export const updateOrderStatus = async (
  token: string,
  orderId: string,
  payload: UpdateOrderStatusDTO
) => {
  const res = await fetch(`${API_BASE_URL}/owner/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const createOrder = async (
  token: string,
  payload: CreateOrderDTO
): Promise<{ orderId: string }> => {
  const res = await fetch(`${API_BASE_URL}/client/orders`, {
    method: "POST",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getOrderForClient = async (
  token: string,
  orderId: string
): Promise<GetOrderForClientDTO> => {
  const res = await fetch(`${API_BASE_URL}/client/orders/detail/${orderId}`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getOnGoingOrdersForClient = async (
  token: string
): Promise<GetOrderForClientDTO[]> => {
  const res = await fetch(`${API_BASE_URL}/client/orders/ongoing`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getOrderHistoryForClient = async (
  token: string
): Promise<GetOrderForClientDTO[]> => {
  const res = await fetch(`${API_BASE_URL}/client/orders/history`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
