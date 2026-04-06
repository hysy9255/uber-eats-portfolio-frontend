import type { GetRestaurantNameAndLogoDTO } from "../dtos/GetRestaurantName.dto";
import type { GetRestaurantPageViewDTO } from "../dtos/GetRestaurantPageView.dto";
import type { GetRestaurantsPageViewDTO } from "../dtos/GetRestaurantsPageView.dto";
import type { GetMyRestaurantForOwnerDashboardDTO } from "../dtos/GetMyRestaurantForOwnerDashboard.dto";
import type { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const getRestaurantsPageView =
  async (): Promise<GetRestaurantsPageViewDTO> => {
    const res = await fetch(`${API_BASE_URL}/restaurants`, {
      method: "GET",
      headers: COMMON_HEADERS,
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

export const getRestaurantPageView = async (
  restaurantId: string
): Promise<GetRestaurantPageViewDTO> => {
  const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/view`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getMyRestaurantForOwnerDashboard = async (
  token: string
): Promise<GetMyRestaurantForOwnerDashboardDTO> => {
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
  console.log("payload", payload);
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
