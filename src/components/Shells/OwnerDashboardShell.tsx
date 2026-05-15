import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../auth";
import { Outlet } from "react-router-dom";
import { getMyRestaurantForOwnerDashboard } from "../../api/restaurantApi";
import type { RestaurantViewDTO } from "../../dtos/RestaurantView.dto";

export type OwnerDashboardContext = {
  restaurant: RestaurantViewDTO;
  loadRestaurantData: () => Promise<void>;
};

const OwnerDashboardShell = () => {
  const [restaurant, setRestaurant] = useState<RestaurantViewDTO>();
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  const loadRestaurantData = useCallback(async () => {
    const restaurantData = await getMyRestaurantForOwnerDashboard(token);
    setRestaurant(restaurantData);
    localStorage.setItem(
      "restaurantId",
      restaurantData.generalInfo.restaurantId
    );
  }, [token]);

  useEffect(() => {
    loadRestaurantData();
  }, [loadRestaurantData]);

  if (!restaurant) {
    return <div className="p-6">Loading...</div>;
  }

  return <Outlet context={{ restaurant, loadRestaurantData }} />;
};

export default OwnerDashboardShell;
