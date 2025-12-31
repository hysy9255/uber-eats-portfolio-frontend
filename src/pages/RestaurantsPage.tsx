import { useEffect, useState } from "react";
import RestaurantCard from "../components/Cards/RestaurantCard";
import MainFooter from "../components/Footers/MainFooter";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import CategoryList from "../components/CategoryList";
import LoginButton from "../components/Buttons/LoginButton";
import ProfileHeader from "../components/Headers/ProfileHeader";
import CartHeader from "../components/Headers/CartHeader";
import AlarmHeader from "../components/Headers/AlarmHeader";
import GlobalLayout from "../components/GlobalLayout";
import { getRestaurants } from "../api/restaurantApi";
import type { Restaurant } from "./RestaurantPage";

const RestaurantsPage = () => {
  // const [restaurants, setRestaurants] = useState<Restaurant[] | []>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  // const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  // const toggleSideBar = () => {
  //   if (sideBarOpen) {
  //     setSideBarOpen(false);
  //   }
  //   if (!sideBarOpen) {
  //     setSideBarOpen(true);
  //   }
  // };

  useEffect(() => {
    const load = async () => {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
    };
    load();
  }, []);

  // if (!restaurants) return null;

  return (
    <GlobalLayout>
      <MainHeaderV2
        // hamburger={<HamburgerHeader />}
        signIn={<LoginButton />}
        // searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <main
        className="
          py-2 
          w-[100px] mx-auto
          min-[460px]:w-[410px]
          min-[700px]:w-[650px]
          min-[1000px]:w-[950px]
          min-[1300px]:w-[1250px]
          min-[1800px]:w-[1750px]
      "
      >
        <CategoryList />

        <div id="outer" className={``}>
          <div>
            {/* <BannerCarousel>
            <BannerTwo />
            <BannerOne />
          </BannerCarousel> */}

            <div className="text-3xl font-semibold py-3">Restaurants</div>

            <div
              id="restaurant-list"
              className="
              w-full grid 
              min-[460px]:grid-cols-1
              min-[700px]:grid-cols-2 
              min-[1800px]:grid-cols-3 
              gap-3"
            >
              {restaurants?.map((res) => (
                <RestaurantCard
                  key={res.restaurantId}
                  restaurantId={res.restaurantId}
                  name={res.dba}
                  city={res.city}
                  zip={res.zip}
                  streetAddress={res.streetAddress}
                  prepTime={res.prepTime}
                  orderType={res.orderType}
                  restaurantImgUrl={res.mainImgUrl}
                  restaurantImgUrl2={res.sub1ImgUrl}
                  restaurantImgUrl3={res.sub2ImgUrl}
                />
              ))}
            </div>
          </div>
        </div>
        <MainFooter />
      </main>
    </GlobalLayout>
  );
};

export default RestaurantsPage;
