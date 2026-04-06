import type { GetDishPageDTO } from "../dtos/dish/GetDishPage.dto";
import type { DishDTO } from "../dtos/Dish.dto";
import type { UpdateDishDTO } from "../dtos/dish/UpdateDishRequest.dto";
import type { CreateDishDTO } from "../dtos/dish/CreateDish.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const getDishes = async (
  restaurantId: string,
  token: string
): Promise<DishDTO[]> => {
  const res = await fetch(
    `${API_BASE_URL}/restaurants/${restaurantId}/dishes`,
    {
      method: "GET",
      headers: {
        ...COMMON_HEADERS,
        "jwt-token": token,
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getDishPage = async (dishId: string): Promise<GetDishPageDTO> => {
  const res = await fetch(`${API_BASE_URL}/dishes/${dishId}/page`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });

  if (!res.ok) {
    const errorMsg = await res.json();
    throw new Error(errorMsg.message);
  }

  return res.json();
};

export const createDish = async (token: string, payload: CreateDishDTO) => {
  const res = await fetch(`${API_BASE_URL}/dishes`, {
    method: "POST",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const updateDish = async (
  dishId: string,
  token: string,
  payload: UpdateDishDTO
) => {
  const res = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
    method: "PATCH",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const deleteDish = async (dishId: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
    method: "DELETE",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
};
