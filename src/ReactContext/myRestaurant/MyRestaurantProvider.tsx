import { useCallback, useEffect, useState, type ReactNode } from "react";

import { MyRestaurantContext } from "./MyRestaurantContext";
import { getToken } from "../../auth";
import { getMyRestaurantForOwnerDashboard } from "../../api/restaurantApi";
import type { GetMyRestaurantForOwnerDashboardDTO } from "../../dtos/GetMyRestaurantForOwnerDashboard.dto";

interface MyRestaurantProviderProps {
  children: ReactNode;
}

export const MyRestaurantProvider: React.FC<MyRestaurantProviderProps> = ({
  children,
}) => {
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

  return (
    <MyRestaurantContext.Provider
      value={{
        restaurant,
        loadRestaurantData,
      }}
    >
      {children}
    </MyRestaurantContext.Provider>
  );
};
