import { useEffect, useState } from "react";
import RestaurantCard from "../components/Cards/RestaurantCard";
// import MainFooter from "../components/Footers/MainFooter";
import { getRestaurantsPageView } from "../api/restaurantApi";
import type { GetRestaurantsPageViewDTO } from "../dtos/GetRestaurantsPageView.dto";

const RestaurantsPage = () => {
  const [restaurantsPageView, setRestaurantsPageView] =
    useState<GetRestaurantsPageViewDTO>();

  useEffect(() => {
    const load = async () => {
      const restaurantsPageView = await getRestaurantsPageView();
      setRestaurantsPageView(restaurantsPageView);
    };
    load();
  }, []);

  return (
    <div
      id="restaurant-list"
      className="w-full grid 
        grid-cols-1
        min-[700px]:grid-cols-3 
        gap-2 p-2"
    >
      {restaurantsPageView?.restaurantSummaries?.map((row, index) => (
        <RestaurantCard
          key={index}
          restaurantId={row.generalInfo.restaurantId}
          name={row.generalInfo.dba}
          city={row.address.city}
          zip={row.address.zip}
          streetAddress={row.address.streetAddress}
          prepTime={row.generalInfo.prepTime}
          orderType={row.generalInfo.orderType}
          restaurantImgUrl={row.generalInfo.mainImgUrl}
          restaurantImgUrl2={row.generalInfo.sub1ImgUrl}
          restaurantImgUrl3={row.generalInfo.sub2ImgUrl}
        />
      ))}
    </div>
  );
};

export default RestaurantsPage;
