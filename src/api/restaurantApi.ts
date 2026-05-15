import type { GetRestaurantNameAndLogoDTO } from "../dtos/GetRestaurantName.dto";
import type { RestaurantViewDTO } from "../dtos/RestaurantView.dto";
import type { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const getRestaurantsPageView = async (): Promise<
  RestaurantViewDTO[]
> => {
  const res = await fetch(`${API_BASE_URL}/restaurants`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getRestaurantPageView = async (
  restaurantId: string
): Promise<RestaurantViewDTO> => {
  const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/view`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getMyRestaurantForOwnerDashboard = async (
  token: string
): Promise<RestaurantViewDTO> => {
  const res = await fetch(`${API_BASE_URL}/restaurants/my-restaurant`, {
    method: "GET",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getRestaurantNameAndLogo = async (
  restaurantId: string
): Promise<GetRestaurantNameAndLogoDTO> => {
  const res = await fetch(
    `${API_BASE_URL}/restaurants/restaurantName/${restaurantId}`,
    {
      method: "GET",
      headers: COMMON_HEADERS,
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const updateRestaurant = async (
  token: string,
  payload: UpdateRestaurantDTO
) => {
  const res = await fetch(`${API_BASE_URL}/restaurants`, {
    method: "PATCH",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};
