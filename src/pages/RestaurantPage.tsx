import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DishCard from "../components/Cards/DishCard";
import OperatingHoursComp from "../components/OperatingHours";
import { getRestaurantPageView } from "../api/restaurantApi";
import CategoryButton from "../components/Buttons/CategoryButton";
import DefaultRestaurantLogoImg from "../components/Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";
import StarIcon from "../components/Icons/StarIcon/StarIcon";
import type { GetRestaurantPageViewDTO } from "../dtos/GetRestaurantPageView.dto";
import { extractUniqueCategories } from "../utils/extractUniqueCategories";
import { useGeneralSideBar } from "../ReactContext/GeneralSideBar/UseGeneralSideBar";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { sideBarOpen } = useGeneralSideBar();

  if (!restaurantId) {
    throw new Error("Error");
  }

  const [RestaurantPageView, setRestaurant] =
    useState<GetRestaurantPageViewDTO>();

  const [categories, setCategories] = useState<string[]>([]);

  const loadRestaurantViewData = useCallback(async () => {
    const restaurantViewData = await getRestaurantPageView(restaurantId);
    setRestaurant(restaurantViewData);

    const uniqueCategories = extractUniqueCategories(
      restaurantViewData.dishes.map((dish) => dish.category)
    );

    setCategories(uniqueCategories);
  }, [restaurantId]);

  useEffect(() => {
    loadRestaurantViewData();
  }, [loadRestaurantViewData]);

  return (
    <main className="p-2">
      <div
        id="banner"
        className="aspect-[7/1] bg-cover bg-center rounded-2xl mx-auto"
        style={{
          backgroundImage: `url(${RestaurantPageView?.restaurantSummary.generalInfo.bannerImgUrl})`,
        }}
      ></div>

      <div>
        <div
          id="restaurant"
          className="             
            py-3 flex space-x-4"
        >
          {RestaurantPageView?.restaurantSummary.generalInfo.logo ? (
            <img
              className="rounded-full object-cover w-20 h-20 border-1 border-gray-300"
              src={RestaurantPageView.restaurantSummary.generalInfo.logo}
            />
          ) : (
            <DefaultRestaurantLogoImg className="rounded-full object-cover w-20 h-20 border-1 border-gray-300" />
          )}
          <div className="flex flex-col items-start justify-center">
            <div className="text-nowrap font-bold text-lg">
              {RestaurantPageView?.restaurantSummary.generalInfo.dba}
            </div>

            <div className="flex gap-x-2 text-sm flex-col min-[1000px]:flex-row">
              <div className="flex items-center gap-1">
                <StarIcon className="w-[15px] h-[15px]" />

                <div className="">
                  4.9 (808) •{" "}
                  {RestaurantPageView?.restaurantSummary.generalInfo.orderType}{" "}
                  • {RestaurantPageView?.restaurantSummary.generalInfo.prepTime}{" "}
                  min
                </div>
              </div>
              <div className="text-slate-700">
                ({RestaurantPageView?.restaurantSummary.address.streetAddress},{" "}
                {RestaurantPageView?.restaurantSummary.address.city},{" "}
                {RestaurantPageView?.restaurantSummary.address.zip})
              </div>
            </div>
            <OperatingHoursComp
              operatingHours={
                RestaurantPageView?.restaurantSummary.operatingHours
              }
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          {categories.map((category, index) => (
            <CategoryButton key={index} category={category} />
          ))}
        </div>

        <div id="dish-list" className="">
          {categories.map((category, index) => (
            <Fragment key={index}>
              <div className="text-lg font-bold text-gray-800 p-[20px_5px_5px_5px]">
                {category}
              </div>
              <div
                className={`grid gap-2 justify-center  ${
                  sideBarOpen
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                } `}
              >
                {RestaurantPageView?.dishes
                  .filter((dish) => dish.category === category)
                  .map((dish) => (
                    <DishCard
                      key={dish.dishId}
                      restaurantId={restaurantId}
                      dishId={dish.dishId}
                      name={dish.name}
                      price={dish.price}
                      descriptions={dish.description}
                      dishImgUrl={dish?.dishImgUrl}
                    />
                  ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RestaurantPage;
