import type { CreateDishPayload } from "../components/AddMenuSidebar";
import type { EditDishPayload } from "../components/EditMenuSidebar";

export const getDishes = async (restaurantId: string, token: string) => {
  const res = await fetch(
    `http://localhost:3002/restaurants/${restaurantId}/dishes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": token,
      },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const createDish = async (token: string, payload: CreateDishPayload) => {
  const res = await fetch("http://localhost:3002/dishes/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const deleteDish = async (dishId: string, token: string) => {
  const res = await fetch(`http://localhost:3002/dishes/${dishId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
  });
  if (!res.ok) throw new Error(await res.text());
};

export const editDish = async (
  dishId: string,
  token: string,
  payload: EditDishPayload
) => {
  const res = await fetch(`http://localhost:3002/dishes/${dishId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};
