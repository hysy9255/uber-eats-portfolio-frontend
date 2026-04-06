import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../auth";
import { Outlet } from "react-router-dom";
import { getMyRestaurantForOwnerDashboard } from "../../api/restaurantApi";
import type { GetMyRestaurantForOwnerDashboardDTO } from "../../dtos/GetMyRestaurantForOwnerDashboard.dto";

export type OwnerDashboardContext = {
  restaurant: GetMyRestaurantForOwnerDashboardDTO;
  loadRestaurantData: () => Promise<void>;
};

const OwnerDashboardShell = () => {
  const [restaurant, setRestaurant] =
    useState<GetMyRestaurantForOwnerDashboardDTO>();
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  const loadRestaurantData = useCallback(async () => {
    const restaurantData = await getMyRestaurantForOwnerDashboard(token);
    setRestaurant(restaurantData);
    localStorage.setItem(
      "restaurantId",
      restaurantData.restaurantSummary.generalInfo.restaurantId
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
