import { createContext } from "react";
import type { RestaurantViewDTO } from "../../dtos/RestaurantView.dto";

type MyRestaurantContextValue = {
  restaurant: RestaurantViewDTO;
  loadRestaurantData: () => Promise<void>;
};

export const MyRestaurantContext =
  createContext<MyRestaurantContextValue | null>(null);
