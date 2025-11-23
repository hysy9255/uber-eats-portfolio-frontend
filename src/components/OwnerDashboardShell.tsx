import { useEffect, useState } from "react";
import { getToken } from "../auth";
import type { RestaurantV2 } from "../pages/RestaurantPage";
import ProfileHeader from "./ProfileHeader";
import AlarmHeader from "./AlarmHeader";
import MainHeaderV2 from "./MainHeaderV2";
import MenuRanking from "./MenuRanking";
import {
  bestSelling,
  highestRated,
  mockOrderData,
  mostReviewed,
} from "../constants/MockOrdersData";
import OrdersComponentForDashboard from "./OrdersComponentForDashboard";
import OperatingHoursForDashboard from "./OperatingHoursForDashboard";
import EmbedMapIframe from "./EmbedMapIframe";
import { Outlet } from "react-router-dom";

import OwnerDashboardSidebar from "./OwnerDashboardSidebar";

const OwnerDashboardShell = () => {
  const [restaurant, setRestaurant] = useState<RestaurantV2>();
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  useEffect(() => {
    const load = async () => {
      const restaurantResponse = await fetch(
        "http://localhost:3002/restaurants/my-restaurantV2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": token,
          },
        }
      );
      const restaurant = await restaurantResponse.json();
      setRestaurant(restaurant);
      localStorage.setItem("restaurantId", restaurant?.restaurantId);
    };
    load();
  }, [token]);
  const rail = "";
  return (
    <div className="px-3 select-none">
      <MainHeaderV2
        layoutWidth={rail}
        profile={<ProfileHeader />}
        alarm={<AlarmHeader />}
        sticky={true}
      />
      <div className="grid grid-cols-[1fr_6fr]">
        <OwnerDashboardSidebar />
        <main className="flex-1 justify-center  space-y-[10px] p-[10px] grid grid-cols-[2fr_1fr] gap-3">
          <section id="left-half" className=" space-y-3">
            <article className="flex justify-between items-center relative">
              <div className="">
                <h1 className="text-3xl font-semibold">{restaurant?.dba}</h1>
                <p className="text-lg">
                  {restaurant?.unit}, {restaurant?.streetAddress},{" "}
                  {restaurant?.city}, {restaurant?.zip}{" "}
                </p>
              </div>
            </article>
            <article>
              <Outlet />
            </article>

            <div className="grid grid-cols-3 gap-2">
              <MenuRanking label="Best-Selling Menus" topMenus={bestSelling} />
              <MenuRanking
                label="Highest-Rated Menus"
                topMenus={highestRated}
              />
              <MenuRanking
                label="Most-Reviewed Menus"
                topMenus={mostReviewed}
              />
            </div>
          </section>
          <section id="right-half" className="space-y-3">
            <OrdersComponentForDashboard orders={mockOrderData} />

            <OperatingHoursForDashboard
              operatingHours={restaurant?.operatingHours}
            />

            <article>
              <EmbedMapIframe />
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboardShell;
