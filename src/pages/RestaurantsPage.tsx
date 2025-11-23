import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import type { RestaurantV2 } from "./RestaurantPage";
// import MainHeader from "../components/MainHeader/ClientMainHeader";
// import SideBar from "../components/SideBar";

import BannerTwo from "../promotion-banners/BannerTwo";
import BannerCarousel from "../components/BannerCarousel";
// import sampleImg1 from "../images/restaurants/chinese_tuxedo.jpeg";
// import sampleImg2 from "../images/restaurants/La_Vita_Vino.webp";
// import sampleImg3 from "../images/restaurants/samsen.jpg";
// import NewHeader from "../components/MainHeader/NewHeader";
// import uberEatsLogo from "../logos/logo.svg";
// import hamburgerIcon from "../icons/hamburgerIcon.png";

// import notificationIcon from "../icons/notification.png";
// import shoppingCartIcon from "../icons/shopping-cart.png";
// import { Link } from "react-router-dom";

// import MainHeaderLoggedIn from "../components/MainHeader/MainHeaderLoggedIn";
// import SecondaryHeaderUI from "../components/MainHeader/SecondaryHeaderUi";
// import SecondaryHeaderLoggedOut from "../components/MainHeader/SecondaryHeaderLoggedOut";
// import { MainHeaderLoggedOut } from "../components/MainHeader/MainHeaderLoggedOut";
import MainFooter from "../components/MainFooter";
import BannerOne from "../promotion-banners/BannerOne";
import MainHeaderV2 from "../components/MainHeaderV2";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import LoginButton from "../components/LoginButton";
// import ClientMainHeader from "../components/MainHeader/ClientMainHeader";
import ProfileHeader from "../components/ProfileHeader";
import CartHeader from "../components/CartHeader";
import AlarmHeader from "../components/AlarmHeader";
// import HamburgerHeader from "../components/hamburgerHeader";

// const globalXPadding = "px-[20px]";
// const globalXPadding = "px-[20px]";

const RestaurantsPage = () => {
  // const [restaurants, setRestaurants] = useState<Restaurant[] | []>([]);
  const [restaurants, setRestaurants] = useState<RestaurantV2[] | []>([]);
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
      const restaurantsResponse = await fetch(
        "http://localhost:3002/restaurants",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const restaurants = await restaurantsResponse.json();
      console.log(restaurants);
      setRestaurants(restaurants);
    };
    load();
  }, []);

  const rail = "";
  return (
    <div className="px-3 select-none">
      <MainHeaderV2
        layoutWidth={rail}
        // hamburger={<HamburgerHeader />}
        signIn={<LoginButton />}
        searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <CategoryList />
      <div
        id="outer"
        className={`relative h-min-screen flex flex-col my-[22px] bg-gray-50`}
      >
        <div>
          <BannerCarousel>
            <BannerTwo />
            <BannerOne />
          </BannerCarousel>

          <div className="text-3xl font-semibold py-3">Restaurants</div>

          <div
            id="restaurant-list"
            className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {restaurants.map((res) => (
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
    </div>
  );
};

export default RestaurantsPage;
