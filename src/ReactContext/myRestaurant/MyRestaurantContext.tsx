import { createContext } from "react";
import type { GetMyRestaurantForOwnerDashboardDTO } from "../../dtos/GetMyRestaurantForOwnerDashboard.dto";

type MyRestaurantContextValue = {
  restaurant: GetMyRestaurantForOwnerDashboardDTO;
  loadRestaurantData: () => Promise<void>;
};

export const MyRestaurantContext =
  createContext<MyRestaurantContextValue | null>(null);
