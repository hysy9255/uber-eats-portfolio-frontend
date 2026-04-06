import { useContext } from "react";
import { MyRestaurantContext } from "./MyRestaurantContext";

export const useMyRestaurant = () => {
  const ctx = useContext(MyRestaurantContext);
  if (!ctx)
    throw new Error("useMyRestaurant must be used within MyRestaurantProvider");
  return ctx;
};
