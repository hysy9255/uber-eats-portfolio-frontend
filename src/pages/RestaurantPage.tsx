import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DishCard from "../components/Cards/DishCard";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import AlarmHeader from "../components/Headers/AlarmHeader";
import CartHeader from "../components/Headers/CartHeader";
import ProfileHeader from "../components/Headers/ProfileHeader";
import StarIcon from "../icons/star.png";
import Bill from "../components/Bill";
import { truncateChars } from "../utils/truncateChars";
import LoginButton from "../components/Buttons/LoginButton";
import type { Day } from "./types/OwnerOnBoardingStep3Location.type";
import GlobalLayout from "../components/GlobalLayout";
import OperatingHoursComp2 from "../components/OperatingHours2";
import { useCart } from "../ReactContext/cart/UseCart";
// import CategoryButton from "../components/Buttons/CategoryButton";
import { getRestaurantPageView } from "../api/restaurantApi";

// import defaultLogo from "../images/defaultRestaurantLogo.jpg";
import { categoryOrder, DishCategory } from "../constants/DishCategoryEnums";
import type {
  OrderTypeOptions,
  PrepTimeOptions,
} from "./types/constant.enums.type";
import CategoryButton from "../components/Buttons/CategoryButton";
import DefaultRestaurantLogoImg from "../components/Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";

export type OperatingHours = {
  id: string;
  restaurantId: string;
  dayOfWeek: Day;
  openTime: string;
  closeTime: string;
  open24Hours: boolean;
  closed: boolean;
};

export type Restaurant = {
  restaurantId: string;
  ownerId: string;
  logo: string | null;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  instagram: string | null;
  website: string | null;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  streetAddress: string;
  unit: string;
  state: string;
  city: string;
  zip: string;
  deliveryRadius: number;
  prepTime: PrepTimeOptions;
  orderType: OrderTypeOptions;
  operatingHours: OperatingHours[];
  dishes: DishesByCategory;
};

type Dish = {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: DishCategory;
  dishImgUrl: string;
};

type DishesByCategory = Record<DishCategory, Dish[]>;

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { cart, calculatTotalCost } = useCart();

  if (!restaurantId) {
    throw new Error("Error");
  }

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const [categories, setCategories] = useState<DishCategory[]>([]);

  const loadRestaurantViewData = useCallback(async () => {
    const restaurantViewData = await getRestaurantPageView(restaurantId);
    setRestaurant(restaurantViewData);

    const categories = Object.keys(
      restaurantViewData?.dishes
    ) as DishCategory[];
    const orderedCategories = categories.sort(
      (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    );
    setCategories(orderedCategories);
  }, [restaurantId]);

  useEffect(() => {
    loadRestaurantViewData();
  }, [loadRestaurantViewData]);

  return (
    <GlobalLayout isRelative={true}>
      <MainHeaderV2
        profile={<ProfileHeader />}
        signIn={<LoginButton />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
        sticky={true}
      />
      <main
        className={`
          py-2 
          mx-auto
          min-[460px]:w-[410px]
          min-[700px]:w-[650px]
          min-[1000px]:w-[950px]
         `}
      >
        <div
          id="banner"
          className="aspect-[5/1] bg-cover bg-center rounded-2xl mx-auto"
          style={{
            backgroundImage: `url(${restaurant?.bannerImgUrl})`,
          }}
        ></div>

        <div className="">
          <div
            id="restaurant"
            className="             
            py-3 flex space-x-4"
          >
            {restaurant?.logo ? (
              <img
                className="rounded-full object-cover w-20 h-20 border-1 border-gray-300"
                src={restaurant.logo}
              />
            ) : (
              <DefaultRestaurantLogoImg className="rounded-full object-cover w-20 h-20 border-1 border-gray-300" />
            )}
            {/* <img
              className="rounded-full object-cover w-20 h-20 border-1 border-gray-300"
              src={restaurant?.logo || defaultLogo}
            /> */}
            <div className="flex flex-col items-start justify-center">
              <div className="text-nowrap font-bold text-lg">
                {restaurant?.dba}
              </div>

              <div className="flex gap-x-2 text-nowrap text-sm flex-col min-[1000px]:flex-row">
                <div className="flex items-center gap-1">
                  <img className="w-[15px] h-[15px]" src={StarIcon} />
                  <div className="">
                    4.9 (808) • {restaurant?.orderType} • {restaurant?.prepTime}
                  </div>
                </div>
                <div className="text-slate-700 text-nowrap">
                  ({restaurant?.streetAddress}, {restaurant?.city},{" "}
                  {restaurant?.zip})
                </div>
              </div>
              <OperatingHoursComp2
                operatingHours={restaurant?.operatingHours}
              />
            </div>
          </div>

          <div className="flex gap-x-3 justify-center">
            {categories.map((category, index) => (
              <CategoryButton key={index} category={category} />
            ))}
          </div>

          <div
            id="dish-list"
            className="grid grid-cols-8 justify-evenly gap-2 relative"
          >
            <div className="col-span-8 min-[700px]:col-span-5 min-[1000px]:col-span-8">
              {categories.map((category, index) => (
                <Fragment key={index}>
                  <div className="text-lg font-bold text-gray-500">
                    {category}
                  </div>
                  <div className="grid gap-2 grid-cols-1 min-[1000px]:grid-cols-4">
                    {restaurant?.dishes[category].map((dish) => (
                      <DishCard
                        key={dish.dishId}
                        restaurantId={restaurantId}
                        dishId={dish.dishId}
                        name={dish.name}
                        price={dish.price}
                        descriptions={truncateChars(dish.description, 50)}
                        dishImgUrl={dish.dishImgUrl}
                      />
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>

            {cart.restaurantId && (
              <div className=" hidden min-[1472px]:block absolute top-[27px] -right-62 h-full">
                <div className="w-60 sticky top-[90px]">
                  <Bill />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {cart.restaurantId && (
        <div className="w-[430px] mx-auto px-5 py-5 block min-[700px]:hidden rounded-md sticky bottom-0 bg-white border border-gray-300">
          <h1 className="text-xl font-semibold ">Your Cart</h1>
          <div className="text-slate-700 flex justify-between ">
            <div>{cart.cartItems.length} Items</div>
            <div>${calculatTotalCost()}</div>
          </div>
          <Link to={"/cart"}>
            <div className="mt-2 bg-black text-gray-200 py-2 rounded-md flex items-center justify-center text-sm">
              View Cart
            </div>
          </Link>
        </div>
      )}
    </GlobalLayout>
  );
};

export default RestaurantPage;
