import { useEffect, useState } from "react";
import InputComp from "../components/InputComp";
import { getToken } from "../auth";
import type { OperatingHours, RestaurantV2 } from "./RestaurantPage";
import OperatingHoursEditor from "../components/OperatingHoursEditor";

const OwnerDashboardSetting = () => {
  const [restaurant, setRestaurant] = useState<RestaurantV2 | null>(null);
  const [operatingHoursArray, setOperatingHoursArray] = useState<
    OperatingHours[] | null
  >(null);

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
      setOperatingHoursArray(restaurant.operatingHours);
      localStorage.setItem("restaurantId", restaurant?.restaurantId);
    };
    load();
  }, [token]);

  const borderOn = "";
  if (!operatingHoursArray) {
    return null;
  }
  return (
    <>
      <div className="grid grid-rows-2 grid-cols-2 gap-5 ">
        <section
          className={`row-span-2 col-span-1 flex flex-col gap-3 ${borderOn}`}
        >
          <h1 className="font-medium text-2xl">Restaurant Information</h1>
          <article className="border border-gray-300 rounded-md px-3 py-3 grid grid-cols-3 gap-x-5 gap-y-5">
            <InputComp
              title="Legal business name"
              values={restaurant?.lbn}
              borderOn={borderOn}
            />
            <InputComp
              title="Doing business as (DBA)"
              values={restaurant?.dba}
              borderOn={borderOn}
            />
            <InputComp
              title="Cuisine types"
              values={restaurant?.cuisineType}
              borderOn={borderOn}
            />
            <InputComp
              title="Street address"
              values={restaurant?.streetAddress}
              borderOn={borderOn}
            />
            <InputComp
              title="Unit"
              values={restaurant?.unit}
              borderOn={borderOn}
            />
            <InputComp
              title="City"
              values={restaurant?.city}
              borderOn={borderOn}
            />
            <InputComp
              title="Zip"
              values={restaurant?.zip}
              borderOn={borderOn}
            />
          </article>
        </section>
        <section
          className={`row-span-1 col-span-1  flex flex-col gap-3 ${borderOn}`}
        >
          <h1 className="font-medium text-2xl">Advertisement</h1>
          <article className="border border-gray-300 rounded-md px-3 py-3 grid grid-cols-2 gap-x-5">
            <InputComp
              title="Instagram"
              values={restaurant?.instagram}
              borderOn={borderOn}
            />
            <InputComp
              title="Website (optional)"
              values={restaurant?.website}
              borderOn={borderOn}
            />
          </article>
        </section>
        <section
          className={`row-span-1 col-span-1  flex flex-col gap-3 ${borderOn}`}
        >
          <h1 className="font-medium text-2xl">Contact Information</h1>
          <article className="border border-gray-300 rounded-md px-3 py-3 grid grid-cols-2 gap-x-5">
            <InputComp
              title="Store phone"
              values={restaurant?.storePhone}
              borderOn={borderOn}
            />
            <InputComp
              title="Business email"
              values={restaurant?.businessEmail}
              borderOn={borderOn}
            />
          </article>
        </section>
      </div>

      <section>
        <OperatingHoursEditor operatingHoursArray={operatingHoursArray} />
      </section>
    </>
  );
};

export default OwnerDashboardSetting;
