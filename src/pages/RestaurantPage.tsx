import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import coverImg from "../images/restaurants/Al_Prato.webp";
import DishCard from "../components/DishCard";
// import SideBar from "../components/SideBar";
// import ClientMainHeader from "../components/MainHeader/ClientMainHeader";
import MainHeaderV2 from "../components/MainHeaderV2";
import AlarmHeader from "../components/AlarmHeader";
import CartHeader from "../components/CartHeader";
import ProfileHeader from "../components/ProfileHeader";
import SearchBar from "../components/SearchBar";
// import HamburgerHeader from "../components/hamburgerHeader";
import StarIcon from "../icons/star.png";
import Bill from "../components/Bill";
import restaurantLogo from "../logos/restaurantLogo.png";
// import DishCategoryList from "../components/DishCategoryList";
import { truncateChars } from "../utils/truncateChars";
import OperatingHoursComp from "../components/OperatingHours";
import LoginButton from "../components/LoginButton";

export type Restaurant = {
  restaurantId: string;
  name: string;
  address: string;
  restaurantImgUrl: string;
  restaurantImgUrl2: string;
  restaurantImgUrl3: string;
};

export type OperatingHours = {
  id: string;
  restaurantId: string;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  open24Hours: boolean;
  closed: boolean;
};

export type RestaurantV2 = {
  restaurantId: string;
  ownerId: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  instagram: string;
  website: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  streetAddress: string;
  unit: string;
  city: string;
  zip: string;
  deliveryRadius: number;
  prepTime: string;
  orderType: string;
  operatingHours: OperatingHours[];
};

type Dish = {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl: string;
};

// type Buckets = {
//   [category: string]: Dish[];
// };

// type Category = string;

const RestaurantPage = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) {
    throw new Error("Error");
  }

  // const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  // const toggleSideBar = () => {
  //   if (sideBarOpen) {
  //     setSideBarOpen(false);
  //   }
  //   if (!sideBarOpen) {
  //     setSideBarOpen(true);
  //   }
  // };

  const [restaurant, setRestaurant] = useState<RestaurantV2 | null>(null);
  // const [buckets, setBuckets] = useState<Buckets>({});
  // const [categories, setCategories] = useState<Category[] | []>([]);
  const [dishes, setDishes] = useState<Dish[] | []>([]);
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [openTime, setOpenTime] = useState<string | undefined>("");
  // const [closeTime, setCloseTime] = useState<string | undefined>("");

  useEffect(() => {
    const load = async () => {
      const restaurantResponse = await fetch(
        `http://localhost:3002/restaurants/v2/${restaurantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const restaurant = await restaurantResponse.json();

      setDishes(restaurant.dishes);

      setRestaurant(restaurant);

      const buckets: Record<string, Dish[]> = {};

      for (const d of restaurant.dishes) {
        const cat = d.category;
        (buckets[cat] ??= []).push(d);
      }

      // const categories = Object.keys(buckets);
      // setCategories(categories);
      // setBuckets(buckets);
    };

    load();
  }, [restaurantId]);

  // const rail = "mx-auto max-w-screen-xl px-6";
  const rail = "";
  return (
    <div className="px-3 select-none">
      <MainHeaderV2
        layoutWidth={rail}
        // hamburger={<HamburgerHeader />}
        searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        signIn={<LoginButton />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <main className={`bg-gray-50 ${rail}`}>
        <div
          id="banner"
          className="aspect-[16/4] sm:aspect-[20/4] bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${restaurant?.mainImgUrl})`,
          }}
        ></div>

        <div className="max-w-screen-lg mx-auto">
          <div
            id="restaurant"
            className="mx-auto sm:max-w-screen-sm lg:max-w-screen-lg relative flex flex-col items-center py-3 lg:items-start lg:pl-38 lg:py-3"
          >
            <img
              className="rounded-full object-cover absolute left-5 -top-6 w-12 h-12 sm:left-0 sm:-top-15 sm:w-30 sm:h-30"
              src={restaurantLogo}
            />

            <div className="text-nowrap font-bold text-2xl sm:text-4xl">
              {restaurant?.dba}
            </div>

            <div className="flex items-center gap-x-2 text-nowrap text-sm flex-col lg:text-lg lg:flex-row">
              <div className="flex items-center gap-1">
                <img
                  className="w-[10px] h-[10px] lg:w-[15px] lg:h-[15px]"
                  src={StarIcon}
                />
                4.9 (808) • {restaurant?.orderType} • {restaurant?.prepTime}
              </div>
              <div className="text-slate-700 text-nowrap">
                ({restaurant?.streetAddress}, {restaurant?.city},{" "}
                {restaurant?.zip})
              </div>
            </div>
            <OperatingHoursComp
              operatingHours={restaurant?.operatingHours}
              gridCols="grid-cols-[auto_10px_72px_30px]"
            />
          </div>
          <div className="mx-auto sm:max-w-screen-sm lg:max-w-screen-lg">
            {/* <div className="">
              <DishCategoryList />
            </div> */}

            <div
              id="dish-list"
              className="mt-2 grid grid-cols-8 justify-evenly gap-2"
            >
              <div className="col-span-8 sm:col-span-5 lg:col-span-6">
                <div className="grid gap-y-4 sm:col-span-4">
                  <div className="grid gap-2 grid-cols-1  md:grid-cols-1 lg:gap-3 lg:grid-cols-3">
                    {dishes.map((dish) => (
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
                </div>
              </div>
              {/* <div className="col-span-8 sm:col-span-5 lg:col-span-6">
                {categories.map((cat) => (
                  <>
                    <div className="grid gap-y-4 sm:col-span-4 border p-3 border-red-500">
                      <div className="text-sm sm:text-xl md:text-3xl font-medium text-gray-500 bg-white">
                        {cat}
                      </div>
                      <div className="grid gap-2 grid-cols-1  md:grid-cols-1 lg:gap-3 lg:grid-cols-3 border">
                        {buckets[cat].map((dish) => (
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
                    </div>
                  </>
                ))}
              </div> */}
              <div className="hidden sm:block sm:col-span-3 lg:col-span-2">
                <Bill />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="mx-2 space-y-2 px-3 py-2 block sm:hidden rounded-md sticky bottom-0 bg-white border border-gray-300">
        <div className="text-slate-700 flex justify-between px-2">
          <div>3 Items</div>
          <div>$35.00</div>
        </div>
        <div className="bg-black text-gray-200 py-2 rounded-md flex items-center justify-center text-sm">
          Checkout
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
