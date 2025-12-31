import type {
  Day,
  DayHours,
} from "../pages/types/OwnerOnBoardingStep3Location.type";

export type UpdateRestaurantPayload = {
  lbn?: string;
  dba?: string;
  cuisineType?: string;
  storePhone?: string;
  businessEmail?: string;
  website?: string | null;
  instagram?: string | null;
  streetAddress?: string;
  unit?: string;
  city?: string;
  zip?: string;
  state?: string;
  hours?: Record<Day, DayHours>;
};

export const getRestaurants = async () => {
  const res = await fetch(`http://localhost:3002/restaurants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getMyRestaurant = async (token: string) => {
  const res = await fetch("http://localhost:3002/restaurants/my-restaurant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getRestaurantPageView = async (restaurantId: string) => {
  const res = await fetch(
    `http://localhost:3002/restaurants/${restaurantId}/view`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getRestaurantName = async (
  restaurantId: string
): Promise<string> => {
  const res = await fetch(
    `http://localhost:3002/restaurants/restaurantName/${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};

export const updateRestaurant = async (
  token: string,
  payload: UpdateRestaurantPayload
) => {
  const res = await fetch(`http://localhost:3002/restaurants`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};
