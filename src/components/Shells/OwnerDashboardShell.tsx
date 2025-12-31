import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../auth";
import type { Restaurant } from "../../pages/RestaurantPage";
import ProfileHeader from "../Headers/ProfileHeader";
import AlarmHeader from "../Headers/AlarmHeader";
import MainHeaderV2 from "../Headers/MainHeaderV2";
import { Outlet } from "react-router-dom";
import OwnerDashboardSidebar from "../OwnerDashboardSidebar";
import { getMyRestaurant } from "../../api/restaurantApi";
import GlobalLayout from "../GlobalLayout";

export type OwnerDashboardContext = {
  restaurant: Restaurant | null;
  loadRestaurantData: () => Promise<void>;
};

const OwnerDashboardShell = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  const loadRestaurantData = useCallback(async () => {
    const restaurantData = await getMyRestaurant(token);
    setRestaurant(restaurantData);
  }, [token]);

  useEffect(() => {
    loadRestaurantData();
    if (restaurant?.restaurantId) {
      localStorage.setItem("restaurantId", restaurant.restaurantId);
    }
  }, [loadRestaurantData, restaurant?.restaurantId]);

  return (
    <GlobalLayout>
      <MainHeaderV2
        profile={<ProfileHeader />}
        alarm={<AlarmHeader />}
        sticky={true}
      />
      <div className="grid grid-cols-[1fr_10fr]">
        <OwnerDashboardSidebar />
        <Outlet
          context={{ restaurant, loadRestaurantData } as OwnerDashboardContext}
        />
      </div>
    </GlobalLayout>
  );
};

export default OwnerDashboardShell;
